import Cable from "actioncable";
import React, { Component } from "react";
import SearchPanel from "./SearchPanel.jsx";
import EventList from "./EventList.jsx";
import Message from "./Message.jsx";
import UserRegistration from "./UserRegistration.jsx";
import UserLogin from "./UserLogin.jsx";
import { read_cookie, delete_cookie } from "sfcookies";
import MyList from "./MyList.jsx";
import Scroll from "./Scroll.jsx";
import ReactDOM from "react-dom";
import * as ReactBootstrap from "react-bootstrap";
import NavBar from "./NavBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderby: "date",
      categories: [],
      eventId: "0",
      events: [],
      eventsTmp: [],
      allEvents: [],
      listItems: [],
      listItemSelected: false,
      messages: [],
      currentChatMessage: "",
      cookie: [],
      user: {
        status: false,
        username: null,
        userID: 0
      }
    };
  }

  ///////// life cycle /////////
  componentWillMount() {
    this.state.user = read_cookie("userCookie");
    this.createSocket();
    this.getAllEventInDB();

    // retrieve user_event data for mylist
    if (this.state.user.status) {
      this.getUserEventListInDB(this.state.user.userID);
    }

    //retrieve initial events before first render(default events)
    fetch(
      `https://www.eventbriteapi.com/v3/events/search/?q=&sort_by=date&location.address=toronto&expand=organizer,venue&token=${
      process.env.TOKEN
      }`
    )
      .then(res => res.json())
      .then(events => {
        let data = events.events.filter(event => {
          if (event.description.text) return true;
        });
        this.setState({ events: data });
        this.setState({ eventsTmp: data });
      });

    // Query the API for category list
    fetch(
      `https://www.eventbriteapi.com/v3/categories/?token=${process.env.TOKEN}`
    )
      .then(res => res.json())
      .then(data => { this.setState({ categories: data.categories }) });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  //////////////////////////


  resetState = () => {
    delete_cookie("userCookie");
    this.closeChat();
    $(".myList").hide();
    this.setState({
      events: this.state.eventsTmp,
      listItems: [],
      listItemSelected: false,
      currentChatMessage: "",
      eventId: "0",
      user: {
        status: false,
        username: null,
        userID: null
      }
    });
  }

  // get all event for like count
  getAllEventInDB = () => {
    fetch(`http://localhost:8080/events`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.setState({
            allEvents: data
          });
        }
      });
  };

  // get messages that belong to an event requested
  getMessagesOfAnEventInDB = (event_id) => {
    fetch(`http://localhost:8080/events/${event_id}/messages`)
      .then(res => res.json())
      .then(data => data ? this.setState({ messages: data }) : null);

  }

  // get my-list info
  getUserEventListInDB = (user_id) => {
    fetch(`http://localhost:8080/users/${user_id}/events`)
      .then(res => res.json())
      .then(data => data ? this.setState({ listItems: data }) : null);
  }

  scrollToBottom = () => {
    let messageList = document.getElementById("messageList");
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop =
      maxScrollTop > 0 ? maxScrollTop : 0;
  };

  searchEvent = (keyword, category, location, localWithin, startDate) => {
    this.setState({ listItemSelected: false });
    this.closeChat();
    let trueStartDate = "";
    let trueDndDate = "";
    if (startDate) {
      trueStartDate = startDate + "T00%3A00%3A00";
    }

    fetch(`https://www.eventbriteapi.com/v3/events/search/?q=${keyword}&expand=organizer,venue&sort_by=${
      this.state.orderby
      }&categories=${category}&location.address=${location}&location.within=${localWithin}&start_date.range_start=${trueStartDate}&token=${
      process.env.TOKEN
      }`)
      .then(res => res.json())
      .then(events => {
        let data = events.events.filter(event => {
          if (event.description.text) return true;
        });
        this.setState({ events: data });
        this.setState({ eventsTmp: data });
      });
  }

  // socket
  createSocket() {
    let cable = Cable.createConsumer("ws://localhost:8080/cable");
    this.chats = cable.subscriptions.create(
      {
        channel: "ChatChannel"
      },
      {
        connected: () => { },
        received: data => {

          this.getMessagesOfAnEventInDB(this.state.eventId);

          // // ============= if you don't use back-end ==============
          // //concat to message list
          // this.setState({ messages: [...this.state.messages, data ] });
          // //=======================================================

        },
        create: function (chatContent, user_id, event_id, event_name, img_url) {
          this.perform("create", {
            content: chatContent,
            user_id: user_id,
            event_id: event_id,
            event_name: event_name,
            img_url: img_url
          });
        }
      }
    );
  }

  updateCurrentChatMessage(event) {
    this.setState({
      currentChatMessage: event.target.value
    });
  }

  // function handleSendEvent to handle the onClick event and do the message sending
  handleSendEvent(event) {
    event.preventDefault();
    this.chats.create(
      this.state.currentChatMessage,
      this.state.user.userID,
      this.state.eventId,
      this.state.event_name,
      this.state.img_url
    );
    this.setState({
      currentChatMessage: ""
    });
  }

  newMessageFn(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.chats.create(
        this.state.currentChatMessage,
        this.state.user.userID,
        this.state.eventId,
        this.state.event_name,
        this.state.img_url
      );
      this.setState({
        currentChatMessage: ""
      });
    }
  }

  handleIconClick = (event) => {
    let selectedIcon = event.target.getAttribute("data-name");
    let tmp = selectedIcon;
    if (selectedIcon === "bookmark") {
      tmp = "add list";
    }
    let selectedEventId = event.target.getAttribute("data-id");

    // user was not logged_in
    if (!this.state.user.userID) {
      // request log-in
      $(`.${selectedEventId}`).text(
        `You need log-in or register to use ${tmp} function`
      );
      setTimeout(function () {
        $(`.${selectedEventId}`).text("");
      }, 3000);

      return;
    }

    let eventName = event.target.getAttribute("data-event-name");
    let imgUrl = event.target.getAttribute("data-img-url");

    let liked = false;
    let bookmarked = false;
    selectedIcon === "like" ? (liked = true) : (bookmarked = true);

    // handle create, edit, destroy of user_event in back-end
    fetch(
      `http://localhost:8080/users/${
      this.state.user.userID
      }/user_events/${selectedEventId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({
          event_id: selectedEventId,
          liked: liked,
          bookmarked: bookmarked,
          event_name: eventName,
          img_url: imgUrl,
          selected: selectedIcon
        })
      }
    )
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(data => {
        if (data) {
          this.setState({ listItems: data });
          this.getAllEventInDB();
        }
      });
  }

  handleListItemClick = (event) => {
    let selectedEventId = event.target.getAttribute("data-id");

    // move current search result in tmp
    if (this.state.listItemSelected === false) {
      this.setState({ eventsTmp: this.state.events });
    }
    this.setState({ listItemSelected: true });
    this.setState({ eventId: selectedEventId });

    // retrieve user_event data
    this.getUserEventListInDB(this.state.user.userID);

    // retrieve one event from api
    fetch(
      `https://www.eventbriteapi.com/v3/events/${selectedEventId}/?token=${
      process.env.TOKEN
      }&expand=organizer,venue`
    )
      .then(res => res.json())
      .then(data =>
        this.setState({ events: [data] }));

    // retrieve messages that belong to an event requested
    fetch(`http://localhost:8080/events/${selectedEventId}/messages`)
      .then(res => res.json())
      .then(data => { data ? this.setState({ messages: data }) : null });

    this.scrollToBottom();
    this.openChatFromList();
  }

  openChatFromList = () => {
    //open chat space
    $(".chatSpace").show();
    $(".chatButton").css("background-color", "#ff9933");
    $(".chatButton").text("Close");
  };

  // Open Chat space from search
  openChat = (event) => {
    let eventId = event.target.name;
    let eventName = event.target.getAttribute("data-event-name");
    let imgUrl = event.target.getAttribute("data-img-url");

    if (!this.state.user.userID) {
      // request log-in
      $(`.${eventId}`).text("You need log-in or register to use chat function");
      setTimeout(function () {
        $(".iconSideError").text("");
      }, 3500);

      return;
    }

    $(".chatSpace").animate({
      width: "toggle"
    });

    // hide other event cards
    var target = $(
      event.target.parentElement.parentElement.parentElement.parentElement
    );
    target.siblings().toggle();

    // When a chat space was not open
    var check = target.next();
    if (!$(check).is(":visible")) {
      $(event.target).css("background-color", "#ff9933");
      $(event.target).text("Close");

      // retrieve messages that belong to an event requested
      this.getMessagesOfAnEventInDB(event.target.name);

      this.setState({
        eventId: eventId,
        event_name: eventName,
        img_url: imgUrl,
      });

      return;
    }

    // When a chat space was already open
    $(event.target).css("background-color", "#dc3545");
    $(event.target).text("Chat");
  }

  //close chat space
  closeChat = () => {

    if ($(".chatSpace").is(":visible")) {
      $(".chatSpace").animate({
        width: "toggle"
      });
      $(".chatButton").css("background-color", "#dc3545");
      $(".chatButton").text("Chat");
      $(".card").show();
    }
    this.setState({ listItemSelected: false });
    this.setState({ events: this.state.eventsTmp });
  }

  // when x Icon on an event from myList was clicked
  handleXIconOnEventClick = (event) => {
    this.closeChat();
    this.setState({ listItemSelected: false });
    this.setState({ events: this.state.eventsTmp });
  }

  render() {
    let messages = this.state.messages.map((message, i) => {
      return (
        <Message key={i} message={message} user_id={this.state.user.userID} />
      );
    });

    return (
      <div>
        <NavBar
          user={this.state.user}
          categories={this.state.categories}
          closeChat={this.closeChat}
          resetState={this.resetState}
          searchEvent={this.searchEvent}
        />

        <main>
          <div className="registration-wrapper">
            <UserRegistration
              setUser={user => this.setState({ user })}
              userState={this.state.user}
            />
          </div>

          <div className="login-wrapper">
            <UserLogin
              setUser={user => this.setState({ user })}
              setList={listItems => this.setState(listItems)}
              userState={this.state.user} // render it in the nav
            />
          </div>

          <div className="mainContent">
            <Scroll width="100%" height="110%">
              <EventList
                events={this.state.events}
                searchEvent={this.searchEvent}
                openChat={this.openChat}
                handleIconClick={this.handleIconClick}
                listItems={this.state.listItems}
                listItemSelected={this.state.listItemSelected}
                handleXIconOnEventClick={this.handleXIconOnEventClick}
                allEvents={this.state.allEvents}
              />
            </Scroll>

            <div className="chatSpace">
              <div className="stage">
                <Scroll width="100%" height="500px" idName="messageList">
                  <div className="chatHeaderContainer">
                    <div className="chatSpaceHeader">
                    </div>
                  </div>
                  <div className="chat-logs">{messages}</div>
                </Scroll>

                <div className="inputContainer">
                  <input
                    value={this.state.currentChatMessage}
                    onChange={e => this.updateCurrentChatMessage(e)}
                    onKeyPress={e => this.newMessageFn(e)}
                    type="text"
                    placeholder="Type a message"
                    className="input"
                  />
                  <button
                    onClick={e => this.handleSendEvent(e)}
                    className="send"
                  >
                    Send
                    <img
                      src="./images/send-message.png"
                      className="send-logo"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <MyList
            listItems={this.state.listItems}
            handleListItemClick={this.handleListItemClick}
          />
        </main>
      </div>
    );
  }
}

export default App;

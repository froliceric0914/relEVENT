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
      events: [],
      eventsTmp: [],
      messages: [],
      cookie: [],
      categories: [],
      currentChatMessage: "",
      eventId: "0",
      listItems: [],
      listItemSelected: false,
      allEvents: [],
      user: {
        status: false,
        username: null,
        userID: 0
      }
    };
  }

  componentWillMount() {
    this.state.user = read_cookie("userCookie");
    this.createSocket();
    this.getAllEventInDB();
    //retrieve initial events before first render(default events)
    this.state.user = read_cookie("userCookie");

    if (this.state.user.status) {
      console.log("retrieve user list");
      // retrieve user_event data
      fetch(`http://localhost:8080/users/${this.state.user.userID}/events`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data) {
            this.setState({ listItems: data });
          }
        });
    }

    fetch(
      `https://www.eventbriteapi.com/v3/events/search/?q=&sort_by=date&location.address=toronto&expand=organizer,venue&token=${
      process.env.TOKEN
      }`
    )
      .then(res => {
        return res.json();
      })
      .then(events => {
        let data = events.events.filter(event => {
          if (event.description.text) return true;
        });
        this.setState({ events: data.slice(0) });
        this.setState({ eventsTmp: data.slice(0) });
      });

    // Query the API for category list
    fetch(
      `https://www.eventbriteapi.com/v3/categories/?token=${process.env.TOKEN}`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        const option = data.categories;
        this.setState({ categories: option });
      });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  resetState = () => {
    delete_cookie("userCookie");
    this.closeChat();
    $(".myList").hide();
    this.setState({
      events: this.state.eventsTmp,
      user: {
        status: false,
        username: null,
        userID: null
      },
      listItems: [],
      listItemSelected: false,
      currentChatMessage: "",
      eventId: "0"
    });
  }

  getAllEventInDB = () => {
    fetch(`http://localhost:8080/events`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data) {
          this.setState({
            allEvents: data
          });
        }
      });
  };

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

    const getURL = `https://www.eventbriteapi.com/v3/events/search/?q=${keyword}&expand=organizer,venue&sort_by=${
      this.state.orderby
      }&categories=${category}&location.address=${location}&location.within=${localWithin}&start_date.range_start=${trueStartDate}&token=${
      process.env.TOKEN
      }`;
    // console.log("url", getURL);
    const url = fetch(getURL)
      .then(res => {
        return res.json();
      })
      .then(data => {
        // console.log("queryEvents", data.events);
        const results = data.events;
        //filter events with valid decription
        this.setState({ events: results.slice(0) });
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
          // if you don't connect with back-end =========
          // // this.setState({ messages: [...this.state.messages, data ] });
          // console.log(this.state.messages);
          // // concat to message list
          //===============================================

          // retrieve updated message list from db TODO: it's repeated. need refactor
          fetch(`http://localhost:8080/events/${this.state.eventId}/messages`)
            .then(res => {
              return res.json();
            })
            .then(data => {
              if (data) {
                this.setState({ messages: data });
              }
            });
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

    console.log("retrieve user list");
    // retrieve user_event data
    fetch(`http://localhost:8080/users/${this.state.user.userID}/events`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data) {
          this.setState({ listItems: data });
        }
      });

    fetch(
      `https://www.eventbriteapi.com/v3/events/${selectedEventId}/?token=${
      process.env.TOKEN
      }&expand=organizer,venue`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ events: [data] });
      });

    // retrieve messages that belong to an event requested
    fetch(`http://localhost:8080/events/${selectedEventId}/messages`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data) {
          console.log("message!", data);
          //  this.listUpdater(data);
          this.setState({ messages: data });
        }
      });

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

    if (!this.state.user.userID) {
      // request log-in
      $(`.${eventId}`).text("You need log-in or register to use chat function");
      setTimeout(function () {
        $(".iconSideError").text("");
      }, 3500);

      return;
    }

    let eventName = event.target.getAttribute("data-event-name");
    let imgUrl = event.target.getAttribute("data-img-url");

    $(".chatSpace").animate({
      width: "toggle"
    });

    var target = $(
      event.target.parentElement.parentElement.parentElement.parentElement
    );

    target.siblings().toggle();

    var check = target.next();

    // When a chat space was not open
    if (!$(check).is(":visible")) {
      $(event.target).css("background-color", "#ff9933");
      $(event.target).text("Close");

      // retrieve messages that belong to an event requested
      fetch(`http://localhost:8080/events/${event.target.name}/messages`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data) {
            this.setState({
              eventId: eventId,
              event_name: eventName,
              img_url: imgUrl,
              messages: data
            });
          }
        });
      return;
    }

    // When a chat space was already open
    $(event.target).css("background-color", "#dc3545");
    $(event.target).text("Chat");
  }

  //close chat space
  closeChat = () => {
    console.log("close");
    //close chat space
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
        {/* <nav className="navbar">
          <div className="navbar-content flexR">
            <a className="title">relEVENT</a>

            {this.state.user.status ? inside : outside}
          </div>
          <SearchPanel
            searchEvent={this.searchEvent}
            categories={this.state.categories}
          />
        </nav> */}

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
                    {" "}
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

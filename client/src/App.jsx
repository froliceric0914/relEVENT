import Cable from "actioncable";
import React, { Component } from "react";
import SearchPanel from "./SearchPanel.jsx";
import EventList from "./EventList.jsx";
import Message from "./Message.jsx";
// import MessageList from "./MessageList.jsx";
import UserRegistration from "./UserRegistration.jsx";
import UserLogin from "./UserLogin.jsx";
import { read_cookie, delete_cookie } from "sfcookies";
import MyList from "./MyList.jsx";
import Scroll from "./Scroll.jsx";
import ReactDOM from "react-dom";
import * as ReactBootstrap from "react-bootstrap";

// import { Button, Icon } from "react-materialize";

//TODO: styling
//TODO: need sanitize for user input
class App extends Component {
  constructor(props) {
    super(props);
    //add an option of oderby distance
    this.state = {
      orderby: "date",
      events: [],
      eventsTmp: [],
      conditions: [], //maybe no need
      messages: [], //will be array of object
      cookie: [],
      categories: [],
      currentChatMessage: "",
      eventId: "0",
      user: {
        status: false,
        username: null,
        userID: 0
      },
      listItems: [],
      listItemSelected: false,
      allEvents: []
    };
    this.searchEvent = this.searchEvent.bind(this);
    this.openChat = this.openChat.bind(this);
    this.closeChat = this.closeChat.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
    this.openMyList = this.openMyList.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.handleXIconOnEventClick = this.handleXIconOnEventClick.bind(this);
  }

  generateUserColor = user_id => {
    let hue = (user_id * 70) % 360;
    return `hsl(${hue}, 90%, 50%)`;
  };

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
    const url = fetch(
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
    const categoriesResponse = fetch(
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

  componentDidMount() {}

  componentDidUpdate() {
    this.scrollToBottom();
  }

  searchEvent(keyword, category, location, localWithin, startDate) {
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
    console.log("url", getURL);
    const url = fetch(getURL)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("queryEvents", data.events);
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
        connected: () => {},
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
        create: function(chatContent, user_id, event_id, event_name, img_url) {
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

  handleIconClick(event) {
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
      setTimeout(function() {
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

  handleListItemClick(event) {
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

  // when x Icon on an event from myList was clicked
  handleXIconOnEventClick(event) {
    this.closeChat();
    this.setState({ listItemSelected: false });
    this.setState({ events: this.state.eventsTmp });
  }

  // Open user's MyList
  openMyList(event) {
    $(".myList").is(":visible")
      ? // close list
        $(".myList").slideUp() &&
        $(".btn-mylist").removeClass("mylist-on") &&
        $(".btn-mylist").text("MyList")
      : // open list
        $(".myList").slideDown() &&
        $(".btn-mylist").addClass("mylist-on") &&
        $(".btn-mylist").text("Close");
  }

  openChatFromList = () => {
    //open chat space
    $(".chatSpace").show();
    $(".chatButton").css("background-color", "#ff9933");
    $(".chatButton").text("Close");
  };

  // Open Chat space from search
  openChat(event) {
    let eventId = event.target.name;

    if (!this.state.user.userID) {
      // request log-in
      $(`.${eventId}`).text("You need log-in or register to use chat function");
      setTimeout(function() {
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
  closeChat(e) {
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

  render() {
    let messages = this.state.messages.map((message, i) => {
      return (
        <Message key={i} message={message} user_id={this.state.user.userID} />
      );
    });

    ///////////// nav bar before log-in ///////////////
    let outside = (
      <div className="nav-right flexR enter">
        <div
          onClick={e => {
            document.querySelector(".registration-wrapper").style.display =
              "flex";
            $("body").addClass("stop-scrolling");
            console.log("click me");
          }}
        >
          register
        </div>
        &nbsp;/&nbsp;
        <div
          onClick={e => {
            // console.log("click login", $(".login-wrapper"));
            // $(".login-wrapper").style.display = "none";
            document.querySelector(".login-wrapper").style.display = "flex";
            $("body").addClass("stop-scrolling");
          }}
        >
          log-in
        </div>
      </div>
    );

    ///////////// nav bar before log-in ///////////////
    let inside = (
      <div className="nav-right flexR">
        <div
          className="user_icon_nav"
          style={{
            backgroundColor: this.generateUserColor(this.state.user.userID)
          }}
          onClick={this.openLogOut}
        />

        <div className="userName" onClick={this.openLogOut}>
          {this.state.user.username}
        </div>

        <div
          className="log-out"
          onClick={e => {
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
          }}
        >
          log-out
        </div>

        {/* <div className="logOutPopUp">
        log-out
      </div> */}

        <button
          className="btn-mylist"
          style={{ visibility: this.state.user.status ? "block" : "hidden" }}
          onClick={this.openMyList}
        >
          Mylist
        </button>
      </div>
    );

    ////////////////////////////////////

    //     // cache the element you intend to target
    // const navBar = document.querySelector('.navbar');

    // // cache styles of sidebarElement inside cssStyles
    // const cssStyles = getComputedStyle(navBar);

    // // retrieve the value of the --left-pos CSS variable
    // const cssVal = String(cssStyles.getPropertyValue('height')).trim();

    ///////////// return ///////////////
    return (
      <div>
        <nav className="navbar">
          <div className="navbar-content flexR">
            <a className="title">relEVENT</a>
            {/* {cssVal} */}

            {this.state.user.status ? inside : outside}
          </div>
          <SearchPanel
            searchEvent={this.searchEvent}
            categories={this.state.categories}
          />
        </nav>

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
            <Scroll width="100%" height="700px">
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
                  {/* <div id="messageList"> */}
                  <div className="chatHeaderContainer">
                    <div className="chatSpaceHeader">
                      {/* <h1>Event Chat</h1> */}
                    </div>
                  </div>
                  {/* <i id="closeX" className="fas fa-times fa-2x" onClick={this.closeChat}></i> */}
                  <div className="chat-logs">{messages}</div>
                  {/* </div> */}
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

                {/* <div className="closeX" onClick={this.closeChat}>
                  close chat
                </div> */}
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

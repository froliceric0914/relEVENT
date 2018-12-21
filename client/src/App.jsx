import Cable from 'actioncable';
import React, { Component } from "react";
import SearchPanel from "./SearchPanel.jsx";
import EventList from "./EventList.jsx";
import Message from "./Message.jsx";
// import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";
import UserRegistration from "./UserRegistration.jsx";

//TODO: toggle search panel (jQuery?)
//TODO: styling
//TODO: set websocket
//TODO: need sanitize for user input
class App extends Component {
  constructor(props) {
    super(props);
    //add an option of oderby distance
    this.state = {
      orderby: "date",
      events: [],
      targetEvents: [],
      conditions: [], //maybe no need
      messages: [], //will be array of object
      categories: [],

      currentChatMessage: '',
      eventId: '',

      user: {
        status: false,
        username: null,
        userID: null
      }

    };
    this.searchEvent = this.searchEvent.bind(this);
    this.addEventToMyList = this.addEventToMyList.bind(this);
    this.openChat = this.openChat.bind(this);

  }

  componentWillMount() {
    this.createSocket();
    //retrieve initial events before first render(default events)
    const url = fetch(
      `https://www.eventbriteapi.com/v3/events/search/?q=&sort_by=date&location.address=toronto&start_date.keyword=today&expand=organizer,venue&token=25ZVHBJBUGPPTEWGEP5W`
    )
      .then(res => {
        return res.json();
      })
      .then(events => {
        console.log("APIdata", events.events);
        let data = events.events.filter(event => {
          if (event.description.text) return true;
        });
        this.setState({ events: data.slice(0) });
      });


    // Query the API
    const categoriesResponse = fetch(
      `https://www.eventbriteapi.com/v3/categories/?token=25ZVHBJBUGPPTEWGEP5W`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        const option = data.categories;
        this.setState({ categories: option });
      });
  }

  componentDidMount() {
    //socket will come here
  }

  searchEvent(keyword, category, location, localWithin) {
    const getURL = `https://www.eventbriteapi.com/v3/events/search/?q=${keyword}&expand=organizer,venue&sort_by=${
      this.state.orderby
    }&categories=${category}&location.address=${location}&location.within=${localWithin}&token=25ZVHBJBUGPPTEWGEP5W`;
    console.log("url", getURL);

    const url = fetch(getURL)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("queryEvents", data.events);
        const results = data.events;
        this.setState({ events: results.slice(0) });

        //filter events with valid decription
      });
  }

  // extract each form values and assign to fetch query
  //search the search based on input form the SeardchPa
  // ↓need to add place holder to use passed param. empty value will be ignored

  addEventToMyList(id) {
    alert("do get request with id to express");
    //update state
  }

  createSocket() {
    let cable = Cable.createConsumer('ws://localhost:3001/cable');
    this.chats = cable.subscriptions.create({
      channel: 'ChatChannel'
    }, {
      connected: () => {},
      received: (data) => {
        console.log(data);
        this.setState({ messages: [...this.state.messages, data ] });
        console.log(this.state.messages);
        // concat to message list
      },
      create: function(chatContent) {
        this.perform('create', {
          content: chatContent
        });
      }
    });
  }

  updateCurrentChatMessage(event) {
    this.setState({
      currentChatMessage: event.target.value
    });
  }


  // function handleSendEvent to handle the onClick event and do the message sending
  handleSendEvent(event) {
    event.preventDefault();
    this.chats.create(this.state.currentChatMessage);
    this.setState({
      currentChatMessage: ''
    });
  }

  openChat(event) {
    console.log("aaa");
      $(".chatSpace").animate({
        width: "toggle"
    });

   console.log("target",event.target.name);
   this.setState({
     eventId: event.target.name
   });
   // console.log("pare",(event.target).parent);
  //   $(".chatSpace").siblings.animate({
  //     width: "toggle"
  // });

      // if ($(".chatSpace").is(':visible')) {
      //   $(".chatSpace").slideRight("slow");
      // } else {
      //   $(".chatSpace").slideLeft("slow");
      //   // $(".chatSpace textarea").focus();
      // }

  }


  render() {
    // maybe no need
    const { events, conditions } = this.state;
    // const searchResult = events.filter(event => {
    //   return event;
    // })
    let messages = this.state.messages.map((message, i)=>{
    return <Message key = {i} message = {message}/>
});


    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            eventoooo
          </a>
          <button>search</button>&nbsp;
          <button>list</button>
        </nav>

        <div className="userRegistration">
          <UserRegistration
            setUser={user => this.setState({ user })}
            loginUser={this.state.user}
          />
        </div>

        <main>
          <div className="searchPanel">
            <SearchPanel
              searchEvent={this.searchEvent}
              categories={this.state.categories}
            />
          </div>

          <div className="mainContent">
            <EventList
              events={this.state.events}
              searchEvent={this.searchEvent}
              openChat={this.openChat}
            />

            <div className="chatSpace">
              <div className='stage'>
                <h1>Chat</h1>
                <div className='chat-logs'>
                {messages}
                </div>
                  <input
                    value={ this.state.currentChatMessage }
                    onChange={ (e) => this.updateCurrentChatMessage(e) }
                    type='text'
                    placeholder='Enter your message...'
                    className='chat-input'/>
                    <button
                      onClick={ (e) => this.handleSendEvent(e) }
                      className='send'>
                      Send
                  </button>
              </div>

            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;

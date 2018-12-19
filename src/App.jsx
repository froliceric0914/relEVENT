import React, { Component } from "react";
import SearchPanel from "./SearchPanel.jsx";
import EventList from "./EventList.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

// add another two class ui. and eventbrite
// const eventbrite = new EventBrite();
// const ui = new UI();

//TODO: toggle search panel (jQuery?)
//TODO: styling
//TODO: set websocket
//TODO: need sanitize for user input
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderby: "date",
      events: [],
      conditions: [], //maybe no need
      messages: [], //will be array of object
      categories: []
    };
    this.searchEvent = this.searchEvent.bind(this);
    this.addEventToMyList = this.addEventToMyList.bind(this);
    this.openChat = this.openChat.bind(this);
  }

  componentWillMount() {
    //retrieve initial events before first render(default events)
    const url = fetch(
      `https://www.eventbriteapi.com/v3/events/search/?q=&sort_by=date&location.address=toronto&start_date.keyword=today&token=${
        process.env.TOKEN
      }`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        const temp = data.events;
        console.log("FETCHED DATE", temp);
        this.setState({ events: temp.slice(0) });
      });

    // Query the API
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

  componentDidMount() {
    //socket will come here
  }

  searchEvent(eventName, category, location, localWithin) {
    const getURL = `https://www.eventbriteapi.com/v3/events/search/?q=${eventName}&expand=organizer,venue&sort_by=${
      this.state.orderby
    }&location.address=${location}&categories=${category}&location.within=${localWithin}&token=${
      process.env.TOKEN
    }`;
    const eventsResponse = fetch(getURL)
      .then(res => {
        return res.json();
      })
      .then(data => {
        const result = data.events;
        // console.log("events of query", data);
        this.setState({ events: result.slice(0) });
      });
    console.log("getURL", getURL);
    // Wait for response and return as json
    // const this.setState.events = eventsResponse.json();
    // console.log("events of query", events);
    // return {
    //   events
    // };
  }
  // extract each form values and assign to fetch query
  //search the search based on input form the SeardchPa
  // ↓need to add place holder to use passed param. empty value will be ignored

  addEventToMyList(id) {
    alert("do get request with id to express");
    //update state
  }

  openChat(id) {
    alert("show chat space and get request with id to express");
    //update state
  }

  render() {
    // maybe no need
    // const { events, conditions } = this.state;
    // const searchResult = events.filter(event =>{
    //   return event;
    // })

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            eventoooo
          </a>
          <button>search</button>&nbsp;
          <button>list</button>
        </nav>

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
            />

            <div className="chatSpace">
              <MessageList />
              <ChatBar />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;

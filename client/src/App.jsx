import React, { Component } from "react";
import SearchPanel from "./SearchPanel.jsx";
import EventList from "./EventList.jsx";
import MessageList from "./MessageList.jsx";
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
      user: null
    };
    this.searchEvent = this.searchEvent.bind(this);
    this.addEventToMyList = this.addEventToMyList.bind(this);
    this.openChat = this.openChat.bind(this);
  }

  componentWillMount() {
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

  openChat(id) {
    alert("show chat space and get request with id to express");
    //update state
  }

  render() {
    // maybe no need
    const { events, conditions } = this.state;
    // const searchResult = events.filter(event => {
    //   return event;
    // });

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
          <UserRegistration setUser={user => this.setState({ user })} />
        </div>

        <main>
          <div className="searchPanel">
            <SearchPanel
              searchEvent={this.searchEvent}
              categories={this.state.categories}
            />
          </div>

          <div className="mainContent">
            <EventList events={this.state.events} />

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

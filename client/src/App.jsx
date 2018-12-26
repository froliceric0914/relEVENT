import Cable from 'actioncable';
import React, { Component } from "react";
import SearchPanel from "./SearchPanel.jsx";
import EventList from "./EventList.jsx";
import Message from "./Message.jsx";
// import MessageList from "./MessageList.jsx";
import UserRegistration from "./UserRegistration.jsx";
import MyList from "./MyList.jsx";

//TODO: styling
//TODO: need sanitize for user input
class App extends Component {
  constructor(props) {
    super(props);
    //add an option of oderby distance
    this.state = {
      orderby: "date",
      events: [],
      conditions: [], //maybe no need
      messages: [], //will be array of object
      categories: [],
      currentChatMessage: '',
      eventId: '0',
      user: {
        status: false,
        username: null,
        userID: 0,
      },
      listItems: []
    };
    this.searchEvent = this.searchEvent.bind(this);
    this.openChat = this.openChat.bind(this);
    this.closeChat = this.closeChat.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
    this.openMyList = this.openMyList.bind(this);
    this.assignMyListData = this.assignMyListData.bind(this);
  }

  componentWillMount() {
    this.createSocket();
    //retrieve initial events before first render(default events)
    const url = fetch(
      `https://www.eventbriteapi.com/v3/events/search/?q=&sort_by=date&location.address=toronto&start_date.keyword=today&expand=organizer,venue&token=${process.env.TOKEN}`
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
     
  }



  
  searchEvent(keyword, category, location, localWithin) {

    this.closeChat();

    const getURL = `https://www.eventbriteapi.com/v3/events/search/?q=${keyword}&expand=organizer,venue&sort_by=${
      this.state.orderby
    }&categories=${category}&location.address=${location}&location.within=${localWithin}&token=${process.env.TOKEN}`;
    console.log("url", getURL);

    const url = fetch(getURL)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("queryEvents", data.events);
        const results = data.events;
        this.setState({ events: results.slice(0) });

        //filter events with valid description
      });
  }


  // socket
  createSocket() {
    let cable = Cable.createConsumer('ws://localhost:8080/cable');
    this.chats = cable.subscriptions.create({
      channel: 'ChatChannel'
    }, {
      connected: () => {},
      received: (data) => {
        // console.log(data);
        // // this.setState({ messages: [...this.state.messages, data ] });
        // console.log(this.state.messages);
        // // concat to message list

    // retrieve updated message list from db TODO: it's repeated. need refactor
    fetch(
      `http://localhost:8080/events/${this.state.eventId}/messages`)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        if(data){
        console.log(data);
        this.setState({ messages: data });
        }
      });

      },
      create: function(chatContent, user_id ,event_id, event_name, img_url) {
        this.perform('create', {
          content: chatContent,
          user_id: user_id,
          event_id: event_id,
          event_name: event_name,
          img_url: img_url
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
    this.chats.create(this.state.currentChatMessage, this.state.user.userID, this.state.eventId, this.state.eventName, this.state.imgUrl
    );

    this.setState({
      currentChatMessage: ''
    });
  }

  handleIconClick(event) {
   
  
  
    let selectedIcon =  event.target.getAttribute("data-name");
    
    let otherIcon = $(event.target).siblings()[0];

    if(!this.state.user.userID){

      // request log-in
      $(".iconSideError").text(`You need log-in or register to use ${selectedIcon} function`);
      setTimeout(function(){ 
        $(".iconSideError").text("");
      }, 3000);

      return;
    }

    let currentIconStatus = event.target.getAttribute("data-on");
    let otherIconStatus = otherIcon.getAttribute("data-on");
    
    let selectedEventId = event.target.getAttribute("data-id");
    let eventName = event.target.getAttribute("data-event-name");
    let imgUrl = event.target.getAttribute("data-img-url");
   

    let liked = false;
    let bookmarked = false;
 
    // if current icon was on 
    if(currentIconStatus === "true"){
      $(event.target).removeClass('fas');
      $(event.target).addClass('far');
      event.target.setAttribute("data-on", "false");

      // if both icons became off :destroy
      if(otherIconStatus==="false"){
           console.log("destroy");
        
           fetch(`http://localhost:8080/users/${this.state.user.userID}/user_events/${selectedEventId}`, {
             headers: {
               Accept: "application/json",
               "Content-Type": "application/json"
             },
             method: "DELETE",
           })

           this.assignMyListData();

        return;
      
      }
      
    // if current icon was off  
    }else{
      $(event.target).removeClass('far');
      $(event.target).addClass('fas');
      event.target.setAttribute("data-on", "true");

      // other one was off :create
      if(otherIconStatus==="false"){
        console.log("create");

       //create users_events
       (selectedIcon === "like")? liked = true : bookmarked = true;

        fetch(`http://localhost:8080/users/${this.state.user.userID}/user_events`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ event_id: selectedEventId ,liked: liked , bookmarked: bookmarked , event_name: eventName, img_url: imgUrl})
        })

        this.assignMyListData();

       return;
      }   
    }
    
    // other one was on :put
    console.log("update");

    if(selectedIcon === "like"){
      //  liked = !currentIconStatus  if could set boolean. need refactor
       liked = currentIconStatus === "true" ? "false" : "true";
       bookmarked = otherIconStatus;
       
    }else{
      //  bookmarked = !currentIconStatus  if could set boolean. need refactor
       bookmarked = currentIconStatus === "true" ? "false" : "true";
       liked = otherIconStatus;
    }
 
    fetch(`http://localhost:8080/users/${this.state.user.userID}/user_events/${selectedEventId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify({ event_id: selectedEventId ,liked: liked , bookmarked: bookmarked })
    })

    this.assignMyListData();
   
  }

  openMyList(event) {
      $(".myList").animate({
        width: "toggle"
    });
  }

  // Open Chat space
  openChat(event) {

    if(!this.state.user.userID){

      // request log-in
      $(".iconSideError").text("You need log-in or register to use chat function");
      setTimeout(function(){ 
        $(".iconSideError").text("");
      }, 3500);

      return;
    }
    
    let eventName = event.target.getAttribute("data-event-name");
    let imgUrl = event.target.getAttribute("data-img-url");

    $(".chatSpace").animate({
        width: "toggle"
    });

    var target = $( event.target.parentElement.parentElement.parentElement);
  
      target.siblings().toggle();

      var check = target.next();

      // When a chat space was not open
      if (!$(check).is(':visible')) {

        $(event.target).css("background-color", "#ff9933");
        $(event.target).text("Close Chat");

        this.setState({
          eventId: event.target.name,
          event_name: eventName,
          img_url: imgUrl
        });
     
         // retrieve messages that belong to an event requested
         fetch(
           `http://localhost:8080/events/${event.target.name}/messages`)
           .then(res => {
             console.log(res);
             return res.json();
           })
           .then(data => {
             if(data){
             console.log(data);
             this.setState({ messages: data });
             }
           });
       return;
      }

      // When a chat space was already open
      $(event.target).css("background-color", "#dc3545");
      $(event.target).text("Chat");
  }

  //close chat space
  closeChat(e){

    //close chat space
    // if ($(".chatSpace").is(':visible')) {

    //   $(".card-text").find("button").css("background-color", "#dc3545");
    //   $(".card-text").find("button").text("Chat");

    //   $(".chatSpace").animate({
    //     width: "toggle"
    //   });
    // }

  }

  assignMyListData(){
    if(this.state.user.userID){
      console.log("fired1");
       //go to events function of user_event route and get myList data
      fetch(
        `http://localhost:8080/users/${this.state.user.userID}/events`)
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then(data => {
          this.setState({ listItems: data });
        });
    }
    console.log("fired2");
  }
  

  
  render() {

    let messages = this.state.messages.map((message, i)=>{
    return <Message key = {i} message = {message} />
});

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            eventoooo
          </a>
          {this.state.user.username}
          {this.state.listItems.length}
          <button>search</button>&nbsp;
          <button style={{display: this.state.user.userID ? "block" : "none"}} onClick={this.openMyList}>Mylist</button>
        </nav>

        <div className="userRegistration">
          <UserRegistration
            setUser={user => this.setState({ user })}
            loginUser={this.state.user}
            // setMyList={listItems => this.setState( listItems )}
          />
        </div>

        <main>
          <div className="column" >
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
                handleIconClick={this.handleIconClick}
              />

              <div className="chatSpace">
                <div className='stage'>
                  <h1>Chat</h1>
                  <div id="closeX" onClick={this.closeChat}>X</div>
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
          </div>
          <MyList listItems={this.state.listItems}/>
        </main>
      </div>
    );
  }
}

export default App;

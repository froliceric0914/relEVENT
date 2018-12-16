import React, {Component} from 'react';
import SearchPanel from './SearchPanel.jsx';
import EventList from './EventList.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

//TODO: toggle search panel (jQuery?)
//TODO: styling
//TODO: set websocket
//TODO: need sanitize for user input
class App extends Component {
  constructor(){
    super();
    this.state = {
      'events': [],
      'conditions': [], //maybe no need
      'messages': [], //will be array of object
    }
   this.searchEvent = this.searchEvent.bind(this);
   this.addEventToMyList = this.addEventToMyList.bind(this);
   this.openChat = this.openChat.bind(this);
 } 

  componentWillMount() {

    //retrieve initial events 
    fetch(`https://www.eventbriteapi.com/v3/events/search/?q=&sort_by=date&location.address=toronto&start_date.keyword=today&token=${process.env.TOKEN}`)

      .then(res=> {
        return res.json();

      }).then(data=>{
        const temp = data.events;
        //set retrieved events
        this.setState({events: temp.slice(0)})
      });

  }

  componentDidMount(){
    //socket will come here
  }
 
  searchEvent(e){
    e.preventDefault() 
    // extract each form values and assign to fetch query

    // ↓need to add place holder to use passed param. empty value will be ignored

    // fetch(`//https://www.eventbriteapi.com/v3/events/search/?q=&sort_by=date&location.address=&location.within=&location.latitude=&location.longitude=&location.viewport.northeast.latitude=&location.viewport.northeast.longitude=&location.viewport.southwest.latitude=&location.viewport.southwest.longitude=&organizer.id=&user.id=&categories=&subcategories=&formats=&price=free&start_date.range_start=&start_date.range_end=&start_date.keyword=today&date_modified.range_start=&date_modified.range_end=&date_modified.keyword=today&search_type=promoted&include_all_series_instances=&include_unavailable_events=&include_adult_events=&incorporate_user_affinities=&high_affinity_categories=&token=${process.env.TOKEN}`)
    // .then(res=> {
    //   return res.json();

    // }).then(data=>{
    //  may need extra filtering depends on condition?
    //   const temp = data.events;
         //set updated events
    //   this.setState({events: temp.slice(0)})
    // });

  }

  addEventToMyList(id){
      alert("do get request with id to express");
      //update state
  }

  openChat(id){
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
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>eventoooo</a>
          <button>search</button>&nbsp;
          <button>list</button>
        </nav>

        <main>

          <div  className ='searchPanel'>
              <SearchPanel searchEvent={this.searchEvent} />
          </div>
          
          <div className ='mainContent'>

            <EventList events= {this.state.events} searchEvent={this.searchEvent}/>

            <div className='chatSpace'>
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

import React, {Component} from 'react';
import EventList from './EventList.jsx';


class App extends Component {
  constructor(){
    super();
    this.state = {
      'events': [],
      'conditions': [],
     // 'currentUser': {name: ''},

    }
  // this.test = this.test.bind(this);
  
 } 

  componentDidMount() {

    fetch(`https://www.eventbriteapi.com/v3/events/search/?q=&sort_by=date&location.address=toronto&token=${process.env.TOKEN}`)

      .then(res=> {

        return res.json();

      }).then(data=>{
        const temp = data.events;
        this.setState({events: [...this.state.events, ...temp]})
      });
  }

  render() {
    const { events, conditions } = this.state;
    const serchResult = events.filter(event =>{
      return event;
    })

    return (
      <div>
      <nav className='navbar'>
        <a href='/' className='navbar-brand'></a>
        nav 
      </nav>
     <EventList events= {serchResult}/>
     {/* <ChatBar addMessage={this.addMessage} changeName={this.changeName} currentUser = {this.state.currentUser}/> */}
     </div>
    );
  }
}
export default App;

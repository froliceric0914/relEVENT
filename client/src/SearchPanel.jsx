import React, { Component } from "react";

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      category: "",
      location: "toronto",
      localWithin: "",
      startDate: ""
    };

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _searchEvent = (keyword, category, location, localWithin, startDate) => {


    this.props.setListItemSelected({ listItem: false });
    this.props.closeChat();
    let trueStartDate = "";

    startDate ? trueStartDate = startDate + "T00%3A00%3A00" : null;

    fetch(`https://www.eventbriteapi.com/v3/events/search/?q=${keyword}&expand=organizer,venue&sort_by=${
      this.props.orderby
      }&categories=${category}&location.address=${location}&location.within=${localWithin}&start_date.range_start=${trueStartDate}&token=${
      process.env.TOKEN
      }`)
      .then(res => res.json())
      .then(events => {
        let data = events.events.filter(event => event.description.text);
        this.props.setEvents({ events: data });
        this.props.setEventsTmp({ eventsTmp: data });
      });
  }

  _handleSubmit(e) {
    e.preventDefault();
    const { keyword, category, location, localWithin, startDate } = this.state;
    this._searchEvent(keyword, category, location, localWithin, startDate);
  }

  render() {
    return (
      <div className="searchPanel">
        <form>
          <div className="form-wrap">
            <label>Keyword</label>
            <input
              type="text"
              id="event-name"
              className="form-control"
              onChange={e => {
                this.setState({
                  keyword: e.target.value
                });
              }}
              value={this.state.keyword}
              placeholder="ex.festival"
            />
          </div>
          <div className="form-wrap">
            <label>
              Start<span id="txt-date"> Date</span>
            </label>
            <input
              type="text"
              id="start-date"
              className="form-control"
              onChange={e => {
                this.setState({
                  startDate: e.target.value
                });
              }}
              value={this.state.startDate}
              placeholder="yyyy-mm-dd"
            />
          </div>

          <div className="form-wrap">
            <label>Category</label>
            <select
              className="form-control"
              id="category"
              onChange={e => {
                this.setState({ category: e.target.value });
              }}
            >
              <option value="">-</option>
              {this.props.categories.map(categoryOption => {
                return (
                  <option value={categoryOption.id} key={categoryOption.id}>
                    {categoryOption.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className=" form-wrap">
            <label>Location</label>
            <input
              type="text"
              id="location"
              className="form-control"
              onChange={e => {
                this.setState({
                  location: e.target.value
                });
              }}
              value={this.state.location}
              placeholder="Please select a city"
            />
          </div>

          <div className=" form-wrap">
            <label>Within</label>
            <input
              type="text"
              id="local-within"
              onChange={e => {
                this.setState({
                  localWithin: e.target.value
                });
              }}
              value={this.state.localWithin}
              className="form-control"
              placeholder="Please input km/mile"
            />
          </div>

          <div className=" form-wrap">
            <button onClick={this._handleSubmit} className="btn-search">
              SEARCH
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchPanel;

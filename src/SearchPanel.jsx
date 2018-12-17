import React, { Component } from "react";

//This is an Search window
//TODO: replace dummy code to form
//TODO: set onclick to submit button
//TODO: add styling

// TODO: make the key words mak first

class SearchPanel extends Component {
  render() {
    return (
      <div className="container search-wrapper">
        <div id="search-events" className="card card-body">
          <h1 className="text-center">evenTOOOOOOO</h1>

          <div className="form-group">
            <label for="event-name">Keyword</label>
            <input
              type="text"
              id="event-name"
              className="form-control"
              value="drake"
              placeholder="all the fantastic starts from here"
            />
          </div>

          <div className="form-group">
            <label for="category">Category</label>
            <select className="form-control" id="category" />
          </div>

          <div className="form-group">
            <label for="location">Location</label>
            <input
              type="text"
              id="location"
              className="form-control"
              value="toronto"
              placeholder="Please select a city"
            />
          </div>

          <div className="form-group">
            <label for="localWithin">Within</label>
            <input
              type="text"
              id="local-within"
              className="form-control"
              placeholder="Please input km/mile"
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              className="mt-5 form-control btn btn-success"
              id="submitBtn"
              value="Search"
            />
          </div>
        </div>
        <div id="result" className="row mt-5" />
      </div>
    );
  }
}

export default SearchPanel;

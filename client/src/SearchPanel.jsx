import React, { Component } from "react";

// This is an Search window
// TODO: add styling

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      category: "",
      location: "toronto",
      localWithin: "",
      startDate: ""
      // `${this.props.categories}`
    };

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    const { keyword, category, location, localWithin, startDate } = this.state;
    this.props.searchEvent(keyword, category, location, localWithin, startDate);
    //call this.props.searchEvent(e)
  }

  render() {
    return (
      <div className="searchPanel">
        <form>
          {/* <div className="inner-form"> */}
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
            // placeholder="all the fantastic starts from here"
            />
          </div>
          <div className="form-wrap">
            <label>Start<span id="txt-date"> Date</span></label>
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

        {/* <div id="result" className="row mt-5" /> */}
      </div>
    );
  }
}

export default SearchPanel;

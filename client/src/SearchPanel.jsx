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
      localWithin: "50km"
      // `${this.props.categories}`
    };

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  // componetdidMount() {
  //   const options = this.prpos.categories.filter(category => {
  //     category.name === "Music";
  //     // console.log("!", category);
  //   });
  //   console.log("options:", options);
  //api call to get the catrget
  //set state of the top
  // }

  _handleSubmit(e) {
    e.preventDefault();
    const { keyword, category, location, localWithin } = this.state;
    // console.log("categorty: ", this.state);
    // alert("click the search");
    this.props.searchEvent(keyword, category, location, localWithin);
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
                      {/* selected={} */}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* <div className="form-wrap">
              <label>start-date</label>
              <input
                type="text"
                id="start-date"
                className="form-control"
                onChange={e => {
                  this.setState({
                    keyword: e.target.value
                  });
                }}
                value={this.state.start_date}
              />
            </div>
            <div className="form-wrap">
              <label>end-date</label>
              <input
                type="text"
                id="end-date"
                className="form-control"
                onChange={e => {
                  this.setState({
                    keyword: e.target.value
                  });
                }}
                value={this.state.end_date}
              />
            </div> */}

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
              <button
                onClick={this._handleSubmit}
                // type="submit"
                className="btn-search"
                // id="submitBtn"
              >
                Search
              </button>
            </div>
          {/* </div> */}
        </form>

        {/* <div id="result" className="row mt-5" /> */}
      </div>
    );
  }
}

export default SearchPanel;

import React, { Component } from "react";

// This is an Search window
// TODO: add styling

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "drake",
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
    const { keyword, category, location, localWithin } = this.state;
    console.log("categorty: ", this.state);
    alert("click the search");
    this.props.searchEvent(keyword, category, location, localWithin);
    //call this.props.searchEvent(e)
  }

  render() {
    return (
      <div className="s01">
        <form>
          <div className="inner-form">
            <div className="input-field first-wrap">
              <label for="event-name">Keyword</label>
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
                placeholder="all the fantastic starts from here"
              />
            </div>

            <div className="input-field second-wrap">
              <label for="category">Category</label>
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

            <div className="input-field second-wrap">
              <label for="location">Location</label>
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

            <div className="input-field second-wrap">
              <label for="localWithin">Within</label>
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

            <div className="input-field third-wrap">
              <button
                onClick={this._handleSubmit}
                type="submit"
                className="btn-search"
                // id="submitBtn"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* <div id="result" className="row mt-5" /> */}
      </div>
    );
  }
}

export default SearchPanel;

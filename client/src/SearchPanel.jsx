import React, { Component } from "react";

//This is an Search window
//TODO: set onclick to submit button
//TODO: add styling

// TODO: make the key words first

//listen to the
class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      category: "108",
      location: "toronto",
      localWithin: "50km"
      // `${this.props.categories}`
    };

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componetdidMount() {
    const options = this.prpos.categories.filter(category => {
      category.name === "Music";
      console.log("!", category);
    });
    console.log("options:", options);
    //api call to get the catrget
    //set state of the top
  }

  _handleSubmit(e) {
    const { keyword, category, location, localWithin } = this.state;
    console.log("categorty: ", this.state.categories);
    alert("click the search");
    this.props.searchEvent(keyword, category, location, localWithin);
    //call this.props.searchEvent(e)
  }

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
              onChange={e => {
                this.setState({
                  keyword: e.target.value
                });
              }}
              value={this.state.keyword}
              placeholder="all the fantastic starts from here"
            />
          </div>
          {/* <option value={option.value} 
selected={optionsState == option.value}>
{option.label}</option>
 */}
          <div className="form-group">
            <label for="category">Category</label>
            <select
              className="form-control"
              id="category"
              onChange={e => {
                this.setState({ category: e.target.value });
              }}
            >
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

          <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-group">
            <button
              onClick={this._handleSubmit}
              type="submit"
              className="mt-5 form-control btn btn-success"
              id="submitBtn"
            >
              Seach
            </button>
          </div>
        </div>

        <div id="result" className="row mt-5" />
      </div>
    );
  }
}

export default SearchPanel;

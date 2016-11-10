import React, { Component } from 'react';
import 'normalize.css';
import './App.css';
import _ from 'lodash';
import Header from './header';

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
    this.state = {
      newestLoans: null,
      sortType: 'country',
      countrySort: [],
      sectorSort: []
    }
  }

  handleSortClick = (sortType) => {
    console.log('Sort Type = '+sortType);
    this.setState({ sortType: sortType });
  }

  createSortGroups = () => {
    // console.log(this.state.newestLoans);
    // console.log(_.last(this.state.newestLoans));
  }

  fetchData = (pageNumber) => {
    let _this = this;
    // let url = 'https://api.kivaws.org/v1/loans/newest.json?page=' + page;
    // let url = 'http://api.kivaws.org/v1/loans/search.json?status=funded&sort=newest&per_page=100';
    let url = 'search-100-newest-funded-loans.json';

    fetch(url, {
      accept: 'application/json'
    })
    .then(function(response){
      // console.log(response);
      return response.json();
    })
    .then(function(json) {
      // console.log(json);
      _this.setState({ newestLoans: json.loans });
      _this.createSortGroups();
      return json;
    })
    .catch(function(err) {
      console.log(err);
    });

  }

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps);
    // console.log(prevState);
  }

  render() {
    let renderedContent;
    if (this.state.newestLoans !== null) {
      renderedContent = this.state.newestLoans.map((loan, index) => {
        return(
          <div key={loan.id}>{loan.location.country} - {loan.sector}</div>
        )
      });
    } else {
      renderedContent = <small>Data is not available at this time.</small>;
    }
    return (
      <div className="app-wrap">
        <Header sortType={this.state.sortType} onClick={(sortType) => this.handleSortClick(sortType)} />
        {renderedContent}
      </div>
    );
  }
}

export default App;

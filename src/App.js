import React, { Component } from 'react';
import 'normalize.css';
import './App.css';

import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      newestLoans: null
    }
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
    console.log('rendered');
    console.log(this.state);
    let renderedContent;
    if (this.state.newestLoans !== null) {
      renderedContent = this.state.newestLoans.map((loan, index) => {
        return(
          <div key={loan.id}>{loan.location.country}</div>
        )
      });
    } else {
      renderedContent = <small>Data is not available at this time.</small>;
    }
    return (
      <div className="app-wrap">
        <h3>List</h3>
        {renderedContent}
      </div>
    );
  }
}

export default App;

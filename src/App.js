import React, { Component } from 'react';
import 'normalize.css';
import './App.css';
import _ from 'lodash';
import Header from './Header';
import SelectedSort from './SelectedSort';

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
    this.state = {
      newestLoans: null,
      sortType: 'country',
      country: null,
      sector: null
    }
  }

  handleSortClick = (sortType) => {
    console.log('Sort Type = '+sortType);
    this.setState({ sortType: sortType });
  }

  createSortGroups = () => {
    let countries = [];
    let sectors = [];
    const sortedLoans = this.state.newestLoans.map((loan, index) => {
      // create object for each country if it doesn't exit
      if (!_.find(countries, {'name': loan.location.country})) {
        countries.push({'name': loan.location.country, 'loans': [loan]});
        // console.log('created new country object for: ' +loan.location.country);
      } else {
        // Add loans to appropriate object in countries
        _.find(countries, {'name': loan.location.country}).loans.push(loan);
      }

      // create object for each sector if it doesn't exit
      if (!_.find(sectors, {'name': loan.sector})) {
        sectors.push({'name': loan.sector, 'loans': [loan]});
        // console.log('created new sector object for: ' +loan.sector);
      } else {
        // add loans to appropriate object and array for sectors
        _.find(sectors, {'name': loan.sector}).loans.push(loan);
      }
    });

    // console.log(countries);
    // console.log(sectors);
    this.setState({
      country: countries,
      sector: sectors
    })
    
    return sortedLoans;
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
      return;
    });

    return;

  }

  // Gather and format data on inital mount
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps);
    // console.log(prevState);
    // console.log(this.state);
  }

  render() {
    return (
      <div className="app-wrap">
        <Header sortType={this.state.sortType} onClick={(sortType) => this.handleSortClick(sortType)} />
        <SelectedSort selectedLoanData={this.state[this.state.sortType]} />        
      </div>
    );
  }
}

export default App;

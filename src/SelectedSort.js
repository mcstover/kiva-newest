// SelectedSort.js
import React, { Component } from 'react';
import './SelectedSort.css';
import _ from 'lodash';

// Primary component wrapping the selected entry types and associated entries
class SelectedSort extends Component {
  constructor(props) {
    super(props);
    this.handleSortItemClick = this.handleSortItemClick.bind(this);
    this.state = {
      selectedSortKey: 0
    }
  }

  // Handle Click on Sorted Type
  handleSortItemClick = (e, itemIndex) => {
    e.preventDefault();
    this.setState({ selectedSortKey: itemIndex });
  }

  render() {
    // Render the content
    return (
      <div className="loan-viewer">
          <SortedTypeList loanData={this.props.selectedLoanData} onClick={(e, itemIndex) => this.handleSortItemClick(e, itemIndex)} sortType={this.props.sortType} />
          <SortedTypeLoans loanData={this.props.selectedLoanData} selectedSortKey={this.state.selectedSortKey} />
      </div>
    )
  };
}

// List of selected sort criteria entries
class SortedTypeList extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = {
      activeEntry: 0
    }
  }

  handleOnClick = (e, itemIndex) => {
    e.preventDefault();
    this.props.onClick(e, itemIndex);
    this.setState({ activeEntry: itemIndex});
  }

  render() {
    // prepare the content
    let renderedContent;
    if (this.props.loanData !== null) {
      // map sort type entries 
      renderedContent = this.props.loanData.map((type, index) => {
        const activeClass = (index === this.state.activeEntry) ? 'link-sort-type link-active' : 'link-sort-type';
        return (
          <li key={index}>
            <a href="#{type.name}" className={activeClass} name={type.name} onClick={(e, itemIndex) => this.handleOnClick(e, index)}>
              {type.name} ({type.loans.length})
            </a>
          </li>
        )
      });
    } else {
      renderedContent = <small>Loading {this.props.sortType} data...</small>;
    }
    // Render the content
    return (
      <ul className="sorted-type-list">
        {renderedContent}
      </ul>
    )
  };
}

// List of loans associated with selected entry in sort type
class SortedTypeLoans extends Component {
  render() {
    let renderedLoans;
    // Render data when available
    if (this.props.loanData !== null && this.props.selectedSortKey !== null) {
      // reset selectedSortKey
      const safeSortKey = (this.props.selectedSortKey <= this.props.loanData.length) ? this.props.selectedSortKey : 0;
      if (this.props.loanData[safeSortKey].loans.length) {
        // Map loans to loan component
        renderedLoans = _.map(this.props.loanData[safeSortKey].loans, function(loan, index) {
          return(
            <LoanEntry key={index} loan={loan} />
          )
        });
      } else {
        renderedLoans = <li><small>No loans returned for this location.</small></li>;
      }
    } else {
      renderedLoans = <li><small>Loading loan data...</small></li>;
    }
    return (
      <ul className="sorted-loan-list">
        {renderedLoans}
      </ul>
    )
  };
}

class LoanEntry extends Component {
  render() {
    // Latency in image loading is revealing some intersting react dom update delays
    // The image element retains it's previous image until the new one is loaded from the server
    // const imgURL = 'http://www.kiva.org/img/w80h80/'+this.props.loan.image.id+'.jpg';
    // <img src={imgURL} title={this.props.loan.name} />

    return (
      <li>
        <div className="loan-entry group">
          
          <h3>{this.props.loan.name} was funded for <span>${this.props.loan.funded_amount}</span></h3>
          <p>This loan will help with <strong>{this.props.loan.activity}</strong>.</p>
        </div>
      </li>
    )
  };
}

export default SelectedSort;
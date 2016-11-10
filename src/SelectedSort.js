// SelectedSort.js
import React, { Component } from 'react';
import './SelectedSort.css';
import _ from 'lodash';

class SelectedSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSortKey: 0
    }
  }

  render() {
    return (
      <div className="loan-viewer">
          <SortedTypeList loanData={this.props.selectedLoanData} />
      </div>
    )
  };
}

// <ul className="sorted-loan-list">
  // <SortedTypeLoans />
// </ul>

class SortedTypeList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let renderedContent;
    if (this.props.loanData !== null) {
      renderedContent = _.map(this.props.loanData, function(type, index) {
        return(
          <li key={index}><a href="#{type.name}" className="btn-sort-item" name={type.name}>{type.name} ({type.loans.length})</a></li>
        )
      });
    } else {
      renderedContent = <small>Data is not available at this time.</small>;
    }
    return (
      <ul className="sorted-type-list">
        {renderedContent}
      </ul>
    )
  };

}

export default SelectedSort;
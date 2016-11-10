// header.js
import React, { Component } from 'react';
import './header.css';

class Sortbar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      activeButton: this.props.sortType // initialize state with passed down property, only occurs once
    }
  }

  // handle button click pass through to enable internal state changes
  // - powers the classes for the active button
  handleClick = (e) => {
    this.props.onClick(e.target.name);
    this.setState({ activeButton: e.target.name })
  }

  render() {
    // map buttons to elements
    const buttons = ['country', 'sector'].map((sortType, index) => {
      const activeClass = (sortType === this.state.activeButton) ? 'btn-sort btn-active' : 'btn-sort';
      return (
        <li key={index} onClick={(e) => this.handleClick(e)}><button className={activeClass} name={sortType}>{sortType}</button></li>
      )
    });

    return (
      <div className="sortbar">
        <h4>Sort By:</h4>
        <ul>
          {buttons}
        </ul>
      </div>
    )
  }
}

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1>Latest Funded Loans</h1>
        <Sortbar sortType={this.props.sortType} onClick={(e) => this.props.onClick(e)}/>
      </div>
    )
  }
}

export default Header;
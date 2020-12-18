import React, { PureComponent } from 'react';

class NavBar extends PureComponent {
  render() {
    return (
      <header className="navBar">
        <i className="navBar-logo fas fa-leaf"></i>
        <span className="navBar-title">Habit Tracker</span>
        <span className="navBar-count">{this.props.totalCount}</span>
      </header>
    );
  }
}

export default NavBar;

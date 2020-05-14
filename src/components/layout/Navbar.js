import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar bg-primary">
        <i className={this.props.icon} /> {this.props.title}
        </nav>
        
      </div>
    )
  }
}

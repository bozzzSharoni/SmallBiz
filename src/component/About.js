import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class About extends Component {
  constructor() {
    super()

  }

  render() {

    return <div>
      <h2>Who we are?</h2>
      <p className="flow-text">Smallbiz is a platform for connecting small business owners with clients.</p>
      <p className="flow-text">With our platform, you can assign appointments, message business owners and get discounts!</p>
      <h2>How does it work?</h2>
      <p className="flow-text">Every client can search for the business of thier choice and immediately assign an apponitment.</p>
      <p className="flow-text">If you came to the apponitment, you will get points which can be trasnformed into discounts!</p>
      <h2>"Wow your website is great! How do I signup?"</h2>
      <p className="flow-text">Click the "Signup" button below and fill in the form.</p>
      <p className="btn pulse">↓</p>
      <li className="flow-text">{this.props.state.user ? <Link to='/' >Sign-Up</Link> : <Link to='/Signup'>Sign-Up</Link>}</li>
      <h2>"But wait! I don't want a regular account! How do I sign up as a new business?"</h2>
      <p className="flow-text">What a great question! Click on the "Open your Business Page" button below and enjoy an endless stream of clients for the rest of your life!</p>
      <p className="btn pulse">↓</p>
      <li className="flow-text"><Link to="/OpenBisnnes"> Open your Business Page </Link></li>
    </div>


  }

}

export default About;


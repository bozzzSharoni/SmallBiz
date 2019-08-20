import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class About extends Component {
    constructor() {
        super()

    }

  render() {

    return <div>About Us about our policy and how to get singUp and how to make your own besniess page
         <li ><Link to="/"> sing Up </Link></li>
         <li ><Link to="/OpenBisnnes"> Open your Bessnies Page </Link></li>
    </div>


  }
    
}
    
export default About;

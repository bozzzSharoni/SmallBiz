import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import firebase from '../config/firebase'

class Home extends Component {
    constructor() {
        super()

    }
  logout = () => {
      firebase.auth().signOut()
  }
    render() {
        return <div> Home
        <button onClick={this.logout}>Logout</button>
        {this.props.Catgoriec.map(c =>
            <li ><Link to={`/Filter/${c}`} >Some Catgory/ {c} </Link></li>
        )} }
        </div>
    }

}

export default Home;

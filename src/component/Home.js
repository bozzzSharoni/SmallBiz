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
            {this.props.getName}
            {this.props.Catgories.map(c =>
                <li ><Link to={`/Filter/${c}`} >Some Catgory/ {c} </Link></li>
            )}

            <h1>welcome back {this.props.name} !!!!</h1>
            <button onClick={this.logout}>Logout</button>
        </div>
    }

}

export default Home;

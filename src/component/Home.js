import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
import firebase from '../config/firebase'


class Home extends Component {
    constructor() {
        super()
        this.state = {
            loggedInUserName:''
        }
    }

    logout = () => {
        firebase.auth().signOut()
    }

    getName = async () => {
        let response = await axios.get(`http://localhost:8000/getuser/${this.props.email}`)
        this.setState({ loggedInUserName: response.data.name })
      }

    

    render() {
        this.getName()
        return <div> Home
            {this.props.Catgories.map(c =>
                <li ><Link to={`/Filter/${c}`} >Some Catgory/ {c} </Link></li>
            )}

            <h1>welcome back {this.state.loggedInUserName} !!!!</h1>
            <button onClick={this.signOut}>Logout</button>
        </div>
    }

}

export default Home;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
import firebase from '../config/firebase'


class Home extends Component {
    constructor() {
        super()
        this.state = {
            loggedInUserName: ''
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
        <h1>welcome back {this.state.loggedInUserName} !!!!</h1>
           {this.props.Catgories.map(c =>
            <div class="row">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          <img src={c.img}></img>
          <span class="card-title">{c.name}</span>
        </div>
        <div class="card-content">
          <p> {c.description}
          </p>
        </div>
        <div class="card-action">
        <li ><Link to={`/Filter/${c.name}`} > {c.name} </Link></li>
        </div>
      </div>
    </div>
  </div>
   )}

            {/* {this.props.Catgories.map(c => */}
            {/* <li ><Link to={`/Filter/${c}`} >Some Catgory/ {c} </Link></li> */}
        {/* )} */}

            <button onClick={this.logout}>Logout</button>
        </div>
    }

}

export default Home;

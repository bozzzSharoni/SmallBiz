import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import firebase from './config/firebase'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {},

    }
  }
  componentDidMount() {
      this.authListener()
  }
  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        this.setState({ user })

      } else {
        this.setState({ user: null })

      }
    })
  }
  render() {
    return (
      <Router>
        <nav>
          <div class="nav-wrapper navBar #212121 grey darken-4">
            {this.state.user}
            <a href="" class="brand-logo right">smallBiz</a>
            <ul id="nav-mobile" class="left hide-on-med-and-down">
              <li ><Link to="/singup">singup  </Link></li>
              <li ><Link to="/Home" >Home  </Link></li>
              <li ><Link to="/About">About </Link></li>
            </ul>
          </div>
        </nav>

        {/* <Route path="/singup" render={() => this.state.users ? <LogUp /> : null} /> */}
        {/* <Route path="/actions" render={() => <Actions CreateNewClient={this.CreateNewClient} data={this.state.data} />} /> */}
        {/* <Route path="/analytics" render={() => <Analytics data={this.state.data} />} /> */}
        {/* <Route path="/Moveis/:id" exact render={() => <Catalog movies={this.state.movies} isRented={this.isRented} />} />  */}

        {/* <Route path="/Catalog/:id" exact render={({ match }) => (this.state[match.params.id] ? (<Catalog match={match} state={this.state} />) : (<Landing />))} /> */}
        {/* <a onClick={this.isRented}> sfhfjdnkbjdsnfkbjndsfk</a> */}

        {/* <Route /> */}
      </Router>
    );
  }
}

export default App;

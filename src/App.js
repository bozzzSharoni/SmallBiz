import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import firebase from './config/firebase'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import SignUp from './component/SignUp'
import Home from './component/Home';
import About from './component/About';
import Catgoty from './component/Catgoty';
import Filter from './component/Filter';
import Bessiness from './component/Bessiness';
import OpenBisnnes from './component/OpenBisnnes';
import User from './component/User'
import { async } from 'q';


class App extends Component {
  constructor() {
    super()
    this.state = {
      Catgories: ["BarberShop", "Cosmetics", "Food", "cars"],
      name: '',
      phone: '',
      gender: 'male',
      city: '',
      email: '',
      password: '',
      user: {},
      loggedInUserName: '',
    }
  }

  saveNewUserToDb = async () => {
    let saveStatus = await axios.post('http://localhost:8000/addnewuser', {
      name: this.state.name,
      password: this.state.password,
      phone: this.state.phone,
      email: this.state.email,
      gender: this.state.gender,
      city: this.state.city
    })
    if (saveStatus.data == 'succes!') {
      alert('signed up successfully')
    } else {
      alert('there was a problem with the sign up, please try again')
    }
  }

  getName = async () => {
    let response = await axios.get(`http://localhost:8000/getuser/${this.state.email}`)
    console.log(response.data)
    this.setState({ loggedInUserName: response.data.name }, function () {
      console.log(this.state.loggedInUserName)
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
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
    console.log(this.state)
    return (
      <Router>
        <nav>
          <div class="nav-wrapper navBar #212121 grey darken-4">
            <a href="/About" class="brand-logo right"> smallBiz</a> {/* also a link but in html syntax */}
            <ul id="nav-mobile" class="left hide-on-med-and-down">
              {/* <li ><Link to="/SingUp">singup  </Link></li> */}
              <li ><Link to="/" >Home</Link></li>
              <li ><Link to="/About">About </Link></li>
            </ul>
          </div>
        </nav>

        <div>
          {/* {this.state.user ? <Home Catgories={this.state.Catgories} /> : <SignUp />} */}
        </div>
        <Route path="/" exact render={() => this.state.user ? <Home Catgories={this.state.Catgories} name={this.state.loggedInUserName} /> : <User handle={this.handleChange} email={this.state.email} password={this.state.password} getName={this.getName} />} />
        <Route path="/Home" render={() => <Home Catgories={this.state.Catgories} name={this.state.loggedInUserName} />} />
        <Route path="/About" render={() => <About state={this.state} />} />

        <Route path="/Catgory" render={() => <Catgoty />} />
        <Route path="/Filter/:CatgoryName" exact render={({ match }) => <Filter name={match.params.CatgoryName} />} />
        <Route path="/SmallBizz/:BesniessName" exact render={({ match }) => <Bessiness name={match.params.BesniessName} />} />
        <Route path="/Signup" exact render={() => this.state.user ? <Home Catgories={this.state.Catgories} name={this.state.loggedInUserName} /> : <SignUp handle={this.handleChange} state={this.state} saveUser={this.saveNewUserToDb} getName={this.getName} />} />
        <Route path="/OpenBisnnes" render={() => <OpenBisnnes />} />

      </Router >

    );
  }
}

export default App;

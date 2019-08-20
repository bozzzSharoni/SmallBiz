import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import SingUp from './component/SingUp';
import Home from './component/Home';
import About from './component/About';
import Catgoty from './component/Catgoty';
import Filter from './component/Filter';
import Bessiness from './component/Bessiness';

class App extends Component {
  constructor() {
    super()
    this.state = {
      SingUp: true,
      Catgoriec: ["BarberShop", "Cosmetics", "Food"]
    }
  }
  render() {
    return (
      <Router>
        <nav>
          <div class="nav-wrapper navBar #212121 grey darken-4">
            <a href="" class="brand-logo right">smallBiz</a>
            <ul id="nav-mobile" class="left hide-on-med-and-down">
              {/* <li ><Link to="/SingUp">singup  </Link></li> */}
              <li ><Link to="/Home" >Home  </Link></li>
              <li ><Link to="/About">About </Link></li>
            </ul>
          </div>
        </nav>

        {/* <Route path="/" render={() => this.state.SingUp ? <SingUp /> : null} /> */}
        <Route path="/Home" render={() => this.state.SingUp ? <Home Catgoriec={this.state.Catgoriec} /> : null} />
        <Route path="/About" render={() => <About />} />
        <Route path="/Catgory" render={() => <Catgoty />} />
        <Route path="/Filter/:CatgoryName" exact render={({ match }) => <Filter name={match.params.CatgoryName} />} />
        <Route path="/SmallBizz/:BesniessName" exact render={({ match }) => <Bessiness name={match.params.BesniessName} />} />


        {/* <Route path="/Moveis/:id" exact render={() => <Catalog movies={this.state.movies} isRented={this.isRented} />} />  */}

        {/* <Route path="/Catalog/:id" exact render={({ match }) => (this.state[match.params.id] ? (<Catalog match={match} state={this.state} />) : (<Landing />))} /> */}
        {/* <a onClick={this.isRented}> sfhfjdnkbjdsnfkbjndsfk</a> */}

        {/* <Route /> */}
      </Router>
    );
  }
}

export default App;

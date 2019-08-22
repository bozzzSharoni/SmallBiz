import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
import firebase from '../config/firebase'
import Maps from './Maps';
import { async } from 'q';


class Home extends Component {
    constructor() {
        super()
        this.state = {
            loggedInUserName: ''
        }
    }

    // componentDidUpdate = () => {
    //   this.getName()
    // }

    logout = () => {
        firebase.auth().signOut()
    }

    getName = async () => {
        let y = this.props.state
        console.log(y, this.props.state.user.email)
        let response = await axios.get(`http://localhost:8000/getuser/${this.props.state.user.email}`)

        console.log(response)

        this.setState({ loggedInUserName: "we love you very much " + response.data.name }, function () { console.log(this.state.loggedInUserName) })
    }


    // hasEndedTimer(callback) {
    //   const intervalId = setInterval(() => {
    //     // 'this' is now the window instead of the component? Even though arrow
    //     callback()
    //   }, 1000)
    // }

    // hasEndedTimer(getName)

    onMyClick = () => {
        this.getName()
    }


    render() {
        // this.getName()
        console.log(this.props.state)
        return <div> Home
        <h4> {this.state.loggedInUserName} </h4>
            <a class="waves-effect waves-light btn-small" onClick={this.onMyClick}>give me some love</a>
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

            <button className="btn waves-effect waves-light" onClick={this.logout}>Logout<i class="material-icons right">send</i></button>
            {/* <Maps /> */}
        </div>
    }

}

export default Home;

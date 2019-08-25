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
            loggedInUserName: undefined
        }
    }

    componentDidMount = () => {
        this.getName()
    }

    logout = () => {
        firebase.auth().signOut()
    }

    getName = async () => {
        if (this.state.loggedInUserName === undefined) {
            console.log(this.props.state.user.email)
            let response = await axios.get(`http://localhost:8000/getuser/${this.props.state.user.email}`)
            console.log(response)
            this.setState({ loggedInUserName: response.data.name }, function () { console.log(this.state.loggedInUserName) })

        }
    }

    render() {
        return <div> Home
        <h4> {this.state.loggedInUserName !== undefined ? "welcome back " + this.state.loggedInUserName : null} </h4>
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
            <button className="btn waves-effect waves-light" onClick={this.logout}>Logout<i class="material-icons right">send</i></button>
            {/* <Maps /> */}
        </div>
    }

}

export default Home;

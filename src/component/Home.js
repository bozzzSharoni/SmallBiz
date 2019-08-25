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
            loggedInUserName: undefined,
            loggedInUserImg: undefined
        }
    }

    componentDidMount = () => {
        this.getName()
        this.getImg()
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

    getImg = async () => {
        if (this.state.loggedInUserImg === undefined) {
            console.log(this.props.state.img)
            let response = await axios.get(`http://localhost:8000/getuser/${this.props.state.user.email}`)
            this.setState({ loggedInUserImg: response.data.img }, function () { console.log(this.state.loggedInUserImg) })
        }
    }



    render() {
        return <div className="#f1f8e9 light-green lighten-5">
            <h1>Home</h1>
            <h4> {this.state.loggedInUserName !== undefined ? "welcome back " + this.state.loggedInUserName : null} </h4>
            <img  className="circle responsive-img" src={this.state.loggedInUserImg} />
            <div className="categories">
                {this.props.Catgories !== undefined ? this.props.Catgories.map(c =>
                    <div className="category">

                        <div class="card">
                            <div class="card-image">
                                <img src={c.img}></img>
                                <span class="card-title">{c.name}</span>
                            </div>
                            <div class="card-content">
                                <p>{c.description}</p>
                            </div>
                            <div class="card-action">
                                <Link to={`/Filter/${c.name}`} > {c.name} </Link>                            </div>
                        </div>
                    </div>
                ) : null }
            </div>
            <button className="btn waves-effect waves-light" onClick={this.logout}>Logout<i class="material-icons right">send</i></button>
            {/* <Maps /> */}
        </div >
    }

}

export default Home;

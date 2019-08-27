import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
import firebase from '../config/firebase'
import Maps from './Maps';
import { async } from 'q';
import Button from '@material-ui/core/Button'


class Home extends Component {
    constructor() {
        super()
        this.state = {
            loggedInUserName: undefined,
            loggedInUserImg: undefined,
            isUdateCatgoreisFromProps: false

        }
    }

    componentDidMount = () => {
        this.props.returnCatgories()
        // if(this.state.isUdateCatgoreisFromProps){
        //     this.setState({ Catgories : this.props.Catgories})
        // } 
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

    slecetCatgory = () => {

    }

    updateusersText = (e) => {
        let name = e.target.name
        let text = e.target.value
        // this.state[name] = 0
        console.log(name, text)
        this.setState({
            [name]: text
        }
            , function () {
                console.log(this.state)
                // let input = this.state[name]
                // console.log(name)
                if (this.state.catagorySearch !== undefined) {
                    // console.log("don't work")
                    let catagorySearch = this.state.catagorySearch
                    console.log(this.state.catagorySearch)
                    let ifValue = true
                    if (text === '') {
                        ifValue = false
                        // console.log(text, typeof text)
                    } else {
                        this.searchByCatgory(catagorySearch, text, ifValue)
                    }
                    ///////////////////////////////////////////////////////////////////////
                } else { console.log("work") }
                // console.log(typeof text, text.length)
                text.length === 0 ? this.props.returnCatgories()  : console.log()
            }
            , function () { console.log(this.state) }
        )
    }

    searchByCatgory = async (catagorySearch, text, ifValue) => {
        // let obj = {
        //   catagorySearch: catagorySearch,
        //   text: text
        // }
        // if (ifValue === false) {
        //     this.componentDidMount()
        // } else {
        console.log(catagorySearch, text, typeof text)
        let res = await axios.get(`http://localhost:8000/searchByCatagory/${catagorySearch}/${text}`)
        console.log(res.data)
        this.setState({
            resultByCatgory: res.data,
            Catgories: undefined
        }, function () {
            console.log(this.state.Catgories, this.state.resultByCatgory)
            // if (typeof text === "string" && text === "") {
            //     console.log("gfdgfdbgkjbdkgbkdj")
            //     this.setState({
            //         users: this.state.data.slice(0, 20)
            //     })
            // }
        })
        this.props.reaseCatgories()
    }
    // }


    resultByCatgory = () => {
        if (this.state.resultByCatgory !== undefined) {
            return this.state.resultByCatgory.map(b => {
                return <div className="row">
                  <div className="col s12 m7">
                    <div className="card medium">
                      <div className="card-image">
                        <img src={b.img}></img>
                        <span className="card-title">{b.name}</span>
                      </div>
                      <div className="card-content">
                        <p> {b.description}
                        </p>
                      </div>
                      <div className="card-action">
                        <p><Link to={`/SmallBizz/${b.name}`}>Assign your appointment</Link></p>
                      </div>
                    </div>
                  </div>
      
                </div>
              }  )
        }
    }

    catagorySearch = (e) => {
        let x = e.target.value
        console.log(x)
        this.setState({
            // input: null,
            catagorySearch: x
        }
            , function () { console.log(this.state.catagorySearch) }
        )
    }



    render() {
        return <div className="#f1f8e9 light-green lighten-5">
            <h1>Home</h1>
            <button on={this.slecetCatgory}>
                <select class="browser-default" onClick={this.catagorySearch}>
                    <option value="Catgory" disabled selected>select a Category</option>
                    <option value="name">bussnies name</option>
                    <option value="rating">rating </option>
                    {/* <option value="firstContact">First Contact</option> */}
                    <option value="city">City</option>
                    {/* <option value="sold">Sold</option> */}
                    <option value="price">Price</option>
                    <option value="days">Days</option>
                </select>




                <input name="input" type="text" value={this.state.input} onChange={this.updateusersText} placeholder="type here" /></button>
            <h4> {this.state.loggedInUserName !== undefined ? "welcome back " + this.state.loggedInUserName : null} </h4>
            <img width="200" height="200" className="circle responsive-img" src={this.state.loggedInUserImg} />
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
                                <Link to={`/Filter/${c.name}`}> {c.name} </Link>
                            </div>
                        </div>
                    </div>
                ) :
                    this.resultByCatgory()
                    // null
                }
            </div>
            <button className="btn waves-effect waves-light" onClick={this.logout}>Logout<i class="material-icons right">send</i></button>
            {/* <Maps /> */}
        </div >
    }

}

export default Home;

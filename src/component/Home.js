import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Home extends Component {
    constructor() {
        super()

    }

    render() {
        return <div> Home
        {this.props.Catgoriec.map(c =>
            <li ><Link to={`/Filter/${c}`} >Some Catgory/ {c} </Link></li>
        )} }
        </div>
    }

}

export default Home;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


class Filter extends Component {
    constructor() {
        super()

    }
    
    render() {
        let someBessnies = "DolevHearCut"
        return <div>Filter
        <br></br>
            I will get all this {this.props.name} bessniess and sowed them to you
        <Link to={`/SmallBizz/${someBessnies}`} >Some bessnis/ {someBessnies} </Link>
        </div>
    }

}

export default Filter;

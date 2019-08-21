import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'


class Filter extends Component {
    constructor() {
        super()
        this.state = {
            businessess: []
        }
    }

    componentDidMount = async () => {
        this.getBusinesses()
    }

    getBusinesses = async () => {
        let businessess = await axios.get(`http://localhost:8000/getbyfield/${this.props.name}`)
        this.setState({ businessess: businessess.data }, function () {
            console.log(this.state)
        })
    }

    render() {
        const bizCategory = this.props.name

        return <div >Filter
            <h3>{bizCategory}</h3>
            {this.state.businessess.map(b=>{return <div class="card small">
                 <div class="card-image waves-effect waves-block waves-light">
                   <img class="activator" src={b.img}/>
                 </div>
                 <div class="card-content">
                   <span class="card-title activator grey-text text-darken-4">{b.name}<i class="material-icons right">more_vert</i></span>
                   <p><Link to={`/SmallBizz/${b.name}`}>Assign your appointment</Link></p>
                 </div>
                 <div class="card-reveal">
                   <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                   <p>{b.description}</p>
                 </div>
               </div>
            })}
        </div>
    }

}

export default Filter;

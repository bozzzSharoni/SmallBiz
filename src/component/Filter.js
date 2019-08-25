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
    console.log(this.props.name)
    let businessess = await axios.get(`http://localhost:8000/getbyfield/${this.props.name}`)
    console.log(businessess.data)
    this.setState({ businessess: businessess.data }, function () {
      console.log(this.state)
    })
  }

  render() {
    const bizCategory = this.props.name
    console.log(this.state)

    return <div >Filter
            <h3>{bizCategory}</h3>
      <div>
        {this.state.businessess.map(b => {
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
        })}
      </div>
    </div>
  }

}

export default Filter;

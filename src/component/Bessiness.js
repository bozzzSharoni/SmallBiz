import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'

class Bessiness extends Component {
  constructor() {
    super()
    this.state = {
      business: [],
      displayAppo: false,
    }
  }


  componentDidMount = async () => {
    await this.getBusinesses()
  }

  getBusinesses = async () => {
    let business = await axios.get(`http://localhost:8000/getbyname/${this.props.name}`)
    this.setState({ business: business.data }, function () {
      // console.log(this.state)
    })
  }

  changeDisplay = () => {
    this.setState({ displayAppo: !this.state.displayAppo })
  }

  makeAnAppointment = (e) => {
    let time = e.target.id
    console.log(time)
  }

  func = () => {
    let arr = []
    let counter = -1
    let biz = this.state.business[0].availableAppointments.slice(1, 8)
    console.log(biz)
    let as = biz.map((a) => a[`${moment().add(0, 'day').format('L')}`])
    console.log(as)
    for (let i = 0; i < 8; i++) {
      // console.log(counter++)
      arr.push(this.state.business[0].availableAppointments.slice(1, 8).map((a, ind) => a[moment().add(ind, 'day').format('L')])[0].map((b,ind) => <div id={b} onClick={this.makeAnAppointment}>{b} {ind} </div>))
      // this.state.business[0].availableAppointments.slice(1, 8).map(a => console.log(a))
    }
    // return arr
}

  render() {
    let x = this.state.business[0]

    return (<div>

      {x ? console.log(this.state.business[0].availableAppointments.slice(1, 8)[0]) : null}
      {this.state.business.map(b => {
        return <div>
          <h2>{b.name}</h2>
          <img src={b.img}></img>
          <p>{b.description}</p>
          <button onClick={this.changeDisplay}>Make an appointment</button></div>
      })}
      {this.state.displayAppo && this.state.business[0] ? this.func() : null}
      {/* 
      //   return <div>
      //     <span>{a.regularDay[0]}</span>


      //   </div>
      // }) : <div>hi</div>} */}
    </div>)
  }


}

export default Bessiness;

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

  makeAnAppointment = async (e) => {
    let time = e.target.value
    let date = e.target.name
    // let value = e.target.value
    let object = { date: date, time: time }
    console.log(object)
    console.log(date, time)
    console.log(this.props.state.user.uid)
    await axios.put(`http://localhost:8000/makeapp/${this.state.business[0]._id}/${this.props.state.user.uid}`, object)
    console.log(this.state.business[0].availableAppointments)
  }

  func = () => {
    let days = this.state.business[0].availableAppointments.map(d => Object.keys(d)[0])
    let length = days.length
    days = days.slice(1, length)

    console.log(days)


    // console.log(hours)
    let number = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    //  let number = days.map(n => moment().add(n, 'day').format('L'))
    number = number.map(n => moment().add(n, 'day').format('L'))

    console.log(number)

    // let dayss = this.state.business[0].availableAppointments.map(d => Object.keys(d)[0])
    // let lengthh = dayss.length
    // dayss = dayss.slice(1, lengthh)

    return <div>
      {days.map(d => <div className={d}>    <h5>{d} {moment(d).format('dddd')} </h5>
        <select class="browser-default" name={d} onChange={this.makeAnAppointment} >
          {this.state.business[0].availableAppointments.find(h => Object.keys(h)[0] === d)[d].map(c => { return <option value={c} className={c} onChange={this.makeAnAppointment}>{c} </option> })}
        </select>
      </div>)}
    </div>

  }


  render() {

    return (<div>

      {this.state.business.map(b => {
        return <div>
          <h2>{b.name}</h2>
          <img src={b.img}></img>
          <p>{b.description}</p>
          <a className="waves-effect waves-light btn-small" onClick={this.changeDisplay}>Make an appointment</a></div>
      })}
      {this.state.displayAppo && this.state.business[0] ? this.func() : null}

    </div>)
  }


}

export default Bessiness;

import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import alertify from 'alertifyjs'

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
    })
  }

  changeDisplay = () => {
    this.setState({ displayAppo: !this.state.displayAppo })
  }

  makeAnAppointment = async (e) => {
    let time = e.target.value
    let date = e.target.name
    let appointmentComfirm = this.state.business[0].appointmentComfirm
    let object = { date: date, time: time, appointmentComfirm: appointmentComfirm }
    await axios.put(`http://localhost:8000/makeapp/${this.state.business[0]._id}/${this.props.state.user.uid}`, object)
    await this.makeRequestToMail(this.props.state.userEmail, time, date, this.state.business[0].name)
    await alert("Congratulations!! the appointment is set, count to 3 and check your email :)")
    window.location.reload()
  }

  makeRequestToMail = async (email, time, date, business) => {
    console.log("got To APP.js")
    let mail = {
      from: `SmallBizz < SmallBizYMG@gmail.com>`,
      to: email,
      subject: `You made it! you have an appointment`,
      text: `we've created for you an appointment at ${date} in ${time} for ${business}`
    }
    await axios.post('http://localhost:8000/sendEmail', mail)
  }

  func = () => {

    let days = this.state.business[0].availableAppointments.map(d => Object.keys(d)[0])
    let length = days.length
    days = days.slice(1, length)

    return <div>
      {days.map(d => <div className={d}>  <h6>{d} {moment(d).format('dddd')} </h6>
        <select class="browser-default" name={d} onChange={this.makeAnAppointment} >
          {/* <select> */}
          {this.state.business[0].availableAppointments.find(h => Object.keys(h)[0] === d
          )[d].map(c => { return <option value={c} className={c} onChange={this.makeAnAppointment}>{c} </option> })}
          {/* </select> */}
        </select>
      </div>)}
    </div>

  }


  render() {
    return (<div className="stores">
      {this.state.business.map(b => {
        return <div className="details">
          <h2>{b.name}</h2>
          <img src={b.img}></img>
          <p>{b.description}</p>
          <a className="waves-effect waves-light btn-small" onClick={this.changeDisplay}>Make an appointment</a></div>
      })}
      <div className="appo">{this.state.displayAppo && this.state.business[0] ? this.func() : null}</div>


    </div>)
  }


}

export default Bessiness;

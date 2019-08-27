import React, { Component } from 'react';
import axios from 'axios'
import { googleMap, withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import moment from 'moment'
import alertify from 'alertify.js'
import Maps from './Maps';
require('dotenv').config()

const API_KEY = process.env.API_KEY

require('dotenv').config()


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
    await alertify
      .alert("Congratulations!! the appointment is set, count to 3 and check your email :)")
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
    let length = days.length-4
    days = days.slice(1, length)
    console.log(days)
    return <div className="anim">
      {days.map(d => <div className={d} >
        <h6>{d} {moment(d).format('dddd')} </h6>

        <select class="browser-default" name={d} onChange={this.makeAnAppointment} >
          {this.state.business[0].availableAppointments.find(h => Object.keys(h)[0] === d
          )[d].map(c => { return <option value={c} className={c} onChange={this.makeAnAppointment}>{c} </option> })}
        </select>
      </div>)}
    </div>
  }


  render() {
    // const MapWrapped = withScriptjs(withGoogleMap(Maps))
    console.log(this.state.business)
    return (<div className="stores">
      {this.state.business.map(b => {
        return <div className="details">
          <h2>{b.name}</h2>
          <img src={b.img} class="busImg"></img>
          <p>{b.description}</p>
          <p> Address : {b.city}, {b.address}</p>
          <p> Price : {b.price} ₪ </p>
          {/* <div id="map" style={{ width: '0vw', height: '0vh' }}> */}
            {/* <MapWrapped
              googleMapURL={
                `https://www.google.com/maps/place/Api-Center/@47.4899796,8.2483565,12.17z/data=!4m5!3m4!1s0x0:0x9ef0cba7ea548529!8m2!3d47.5093461!4d8.1547752`
                // `https://www.google.com/maps/place/Api-Center/@47.4899796,8.2483565,12.17z/data=!4m5!3m4!1s0x0:0x9ef0cba7ea548529!8m2!3d47.5093461!4d8.1547752`
                // {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                // API_KEY || "AIzaSyAkkBgnQGlcbI0KSxTgsP24-HjAkXEuI9s&libraries"
              }
              loadingElement={<div style={{ height: '100%' }} />}
              containerElement={<div style={{ height: '100%' }} />}
              mapElement={<div style={{ height: '100%' }} />}
            /> */}
          {/* </div> */}
          <a className="waves-effect waves-light btn-small" onClick={this.changeDisplay}>Make an appointment</a></div>
      })}
      <div className="appo">
        {this.state.displayAppo && this.state.business[0] ? this.func() : null}</div>
    </div>)
  }
}

export default Bessiness;

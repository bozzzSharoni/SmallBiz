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
    // let arr = []
    // arr.push({ [moment().add(0, 'day').format('L')]: this.state.business[0].availableAppointments.slice(1, 8)[0][moment().add(0, 'day').format('L')] })
    // arr.push({ [moment().add(1, 'day').format('L')]: this.state.business[0].availableAppointments.slice(1, 8)[1][moment().add(1, 'day').format('L')] })
    // arr.push({ [moment().add(2, 'day').format('L')]: this.state.business[0].availableAppointments.slice(1, 8)[2][moment().add(2, 'day').format('L')] })
    // arr.push({ [moment().add(3, 'day').format('L')]: this.state.business[0].availableAppointments.slice(1, 8)[3][moment().add(3, 'day').format('L')] })
    // arr.push({ [moment().add(4, 'day').format('L')]: this.state.business[0].availableAppointments.slice(1, 8)[4][moment().add(4, 'day').format('L')] })
    // arr.push({ [moment().add(5, 'day').format('L')]: this.state.business[0].availableAppointments.slice(1, 8)[5][moment().add(5, 'day').format('L')] })
    // arr.push({ [moment().add(6, 'day').format('L')]: this.state.business[0].availableAppointments.slice(1, 8)[6][moment().add(6, 'day').format('L')] })
    // console.log(arr)
    // let biz = this.state.business[0].availableAppointments.slice(1, 8)
    // let as = biz.map(a => a[moment().add(0, 'day').format('L')])[0]
    // let ac = biz.map(a => a[moment().add(2, 'day').format('L')])[2]
    // let x = 0
    let days = this.state.business[0].availableAppointments.map(d => Object.keys(d)[0])
    let length = days.length
    days = days.slice(1,length)
    // let hours = this.state.business[0].availableAppointments.find(h => Object.keys(h)[0] === "08/22/2019")["08/22/2019"] ********************************************
    // console.log(biz)
    // console.log(as)
    // console.log(ac)
    console.log(days)
    // let today = new Date()
    // today = JSON.stringify(today)
    // console.log(today)
    // today = today.slice(9, 11)
    // console.log(today)
    // let dayss = days[1].slice(3, 5)
    // days = days.filter(d => d.slice(3, 4) > today)
    // console.log(dayss)

    // console.log(hours)
    // console.log(moment().add(0, 'day').format('L'))
    // console.log(moment().add(2, 'day').format('L'))
    {/* <h2>{moment().add(0, 'day').format('L')}</h2> */ }
    // <div className={moment().add(0, 'day').format('L')}>
    return <div>
      {days.map(d => <div className={d}>    <h5>{d} {moment(d).format('dddd')} </h5>
        <select class="browser-default" name={d} onChange={this.makeAnAppointment} >
          {/* <select> */}
          {this.state.business[0].availableAppointments.find(h => Object.keys(h)[0] === d)[d].map(c => { return <option value={c} className={c} onChange={this.makeAnAppointment}>{c} </option> })}
          {/* </select> */}
        </select>
      </div>)}
      {/* <select class="browser-default" onClick={this.catagorySearch}>
                            <option className={c} value={c} disabled selected>select hours</option>
                            <option value={c} className={c} onClick={this.makeAnAppointment}>{c}</option>
                            <option value="email">E-Mail </option>
                            <option value="firstContact">First Contact</option>
                            <option value="emailType">Email Type</option>
                            <option value="sold">Sold</option>
                            <option value="owner">Owner</option>
                            <option value="country">Country</option>
                        </select> */}
    </div>

  }


  render() {
    let x = this.state.business[0]

    return (<div>

      {/* {x ? console.log(this.state.business[0].availableAppointments.slice(1, 8)[0]) : null} */}
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

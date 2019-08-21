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
    let time = e.target.className
    let date = e.target.parentElement.className
    let object = { date: date, time: time }
    await axios.put(`http://localhost:8000/makeapp/${this.state.business[0]._id}`, object)
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
    let biz = this.state.business[0].availableAppointments.slice(1, 8)
    let as = biz.map(a => a[moment().add(0, 'day').format('L')])[0]
    let ac = biz.map(a => a[moment().add(2, 'day').format('L')])[2]
    console.log(biz)
    console.log(as)
    console.log(ac)
    console.log(moment().add(0, 'day').format('L'))
    console.log(moment().add(2, 'day').format('L'))
    return <div className={moment().add(0, 'day').format('L')}>
      <h2>{moment().add(0, 'day').format('L')}</h2>
      {as.map(c => { return <div className={c} onClick={this.makeAnAppointment}>{c} </div> })}
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

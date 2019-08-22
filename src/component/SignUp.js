import React, { Component } from 'react';
import firebase from '../config/firebase'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
class SignUp extends Component {
  constructor() {
    super()
    this.state = {

    }

  }



  signup = async (e) => {
    e.preventDefault()
    await firebase.auth().createUserWithEmailAndPassword(this.props.state.email, this.props.state.password).catch((error) => {
      console.log(error)
    })
    this.props.saveUser()
    // this.props.getName()
  }

  render() {
    return <div className='col-md-6'>
      <div>
        <div>
          <label>Full Name</label>
          <input placeholder='Full Name' value={this.props.state.name} onChange={this.props.handle} type='text' name='name' />
          <label>Phone</label>
          <input placeholder='Phone' value={this.props.state.phone} onChange={this.props.handle} type='text' name='phone' />

          <div>
            <label>Gender</label>
            <select className="browser-default col s2" onChange={this.props.handle} name='gender'>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
          </div>
          <label>City</label>
          <input placeholder='City' value={this.props.state.city} onChange={this.props.handle} type='text' name='city' />
          <label>Email Address</label>
          <input placeholder='Enter email' value={this.props.state.email} onChange={this.props.handle} type='email' name='email' />
          <small className='form-text text-muted'>We`ll Never Share Your Email With Anyone Else</small>
        </div>
        <div>
          <label>Password</label>
          <input placeholder='Password' value={this.props.state.password} onChange={this.props.handle} type='password' name='password' />

          <button onClick={this.signup} className='btn btn-success'>Signup</button>
        </div>
      </div>
    </div>
  }

}

export default SignUp;

import React, { Component } from 'react';
import firebase from '../config/firebase'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      
    }

  }



  signup = (e) => {
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(this.props.email, this.props.password).catch((error) => {
      console.log(error)
    })
  }

  
  render() {
    return <div className='col-md-6'>
      <div>
        <div>
          <label>Email Address</label>
          <input placeholder='Enter email' value={this.props.email} onChange={this.props.handle} type='email' name='email' />
          <small className='form-text text-muted'>We`ll Never Share Your Email With Anyone Else</small>
        </div>
        <div>
          <label>Password</label>
          <input placeholder='Password' value={this.props.password} onChange={this.props.handle} type='password' name='password' />
          <button onClick={this.signup} className='btn btn-success'><Link to="/" >Sign up</Link></button>
        </div>
      </div>
    </div>
  }

}

export default SignUp;

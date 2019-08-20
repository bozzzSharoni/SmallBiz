import React, { Component } from 'react';
import firebase from '../config/firebase'
class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      
    }

  }

  login = (e) => {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(this.props.email, this.props.password).catch((error) => {
      console.log(error)
    })
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
          <button onClick={this.login} className='btn btn-primary'>Login</button>
          <button onClick={this.signup} className='btn btn-success'>Signup</button>
        </div>
      </div>
    </div>
  }

}

export default SignUp;

import React, { Component } from 'react';
import firebase from '../config/firebase'
class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }

  }

  login = (e) => {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      console.log(error)
    })
  }

  signup = (e) => {
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      console.log(error)
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return <div className='col-md-6'>
      <div>
        <div>
          <label>Email Address</label>
          <input placeholder='Enter email' value={this.state.email} onChange={this.handleChange} type='email' name='email' />
          <small className='form-text text-muted'>We`ll Never Share Your Email With Anyone Else</small>
        </div>
        <div>
          <label>Password</label>
          <input placeholder='Password' value={this.state.password} onChange={this.handleChange} type='password' name='password' />
          <button onClick={this.login} className='btn btn-primary'>Login</button>
          <button onClick={this.signup} className='btn btn-success'>Signup</button>
        </div>
      </div>
    </div>
  }

}

export default SignUp;

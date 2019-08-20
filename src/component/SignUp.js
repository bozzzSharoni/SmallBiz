import React, { Component } from 'react';

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }

  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return <div className='col-md-6'>
      <form>
        <div>
          <label for="InputEmail">Email Address</label>
          <input id='InputEmail' placeholder='Enter email' value={this.state.email} onChange={this.handleChange} type='email' name='email' />
          <small className='form-text text-muted'>We`ll Never Share Your Email With Anyone Else</small>
        </div>
        <div>
          <label for='InputPassword'>Password</label>
          <input id='InputPassword' placeholder='Password' value={this.state.password} onChange={this.handleChange} type='password' name='password' />
          <button type='submit' onClick={this.login} className='btn btn-primary'>Login</button>
          <button onClick={this.signup} className='btn btn-success'>Signup</button>
        </div>
      </form>
    </div>
  }

}

export default SignUp;

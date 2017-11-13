import React, {Component} from 'react'
import reqHandler from '../../utils/requestHandler'

export default class Register extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      success: false
    }

    this.dataCollector = this.dataCollector.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  dataCollector = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    reqHandler.register(this.state)
    .then(parsedData => {
      this.setState({success: true})
      console.log(parsedData)
    })
  }

  render() {
    return(
      <div>
      <form id="registerForm" onSubmit={this.onSubmit}>
        <h2>Register</h2>
        <label>Username:</label>
        <input onChange={this.dataCollector} name="username" type="text" value={this.state.username}/>
        <label>Password:</label>
        <input onChange={this.dataCollector} name="password" type="password" value={this.state.password}/>
        <label>Repeat Password:</label>
        <input onChange={this.dataCollector} name="repeatPass" type="password"/>
        <input id="btnRegister" value="Sign Up" type="submit"/>
      </form>
      </div>
    );
  }
}
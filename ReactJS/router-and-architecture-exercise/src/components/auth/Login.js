import React, {Component} from 'react'
import reqHandler from '../../utils/requestHandler'
import notification from '../../utils/notifications'
import {Redirect} from 'react-router-dom'
import observer from './../../utils/observer'

export default class Login extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      loading: false,
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
    this.setState({loading: true})
    reqHandler.login(this.state)
    .then(parsedData => {
      this.setState({loading: false, success: true})
      localStorage.setItem('token', parsedData._kmd.authtoken)
      localStorage.setItem('username', parsedData.username)
      observer.executeObserver('changeFocus', { username: localStorage.getItem('username') })
      notification.showInfo('Loggin successful!')
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return(
      <div>
      <form id="loginForm" onSubmit={this.onSubmit}>
        <h2>Sign In</h2>
        <label>Username:</label>
        <input onChange={this.dataCollector} name="username" type="text" value={this.state.username}/>
        <label>Password:</label>
        <input onChange={this.dataCollector} name="password" type="password" value={this.state.password}/>
        <input id="btnLogin" value="Sign In" type="submit"/>
    </form>
    {this.state.success && (<Redirect to={'/' || '/catalog'}/>)}
    </div>
    );
  }
}
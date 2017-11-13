import React, { Component } from 'react'
import './App.css'

import SingUpForm from './components/form/SingUpForm';
import LoginForm from './components/form/LoginForm';
import Pokemon from './components/form/Pokemon';

class App extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      token: ''
    }

    this.authenticate = (data) => {
      if (data.success) {
        this.setState({ token: data.token, username: data.user.name })
        localStorage.setItem("token", data.token);
      }
    }
  }

  componenDidMount() {
    this.setState({ token: localStorage.getItem("token") })
  }

  render() {
    console.log(this.state)
    if (this.state.token !== '' && this.state.token !== undefined && typeof (localStorage.token) !== undefined) {
      return (
        <div>
          <h1>Logged</h1>
          <Pokemon />
        </div>
      );
    }
    return (
      <div>
        <SingUpForm />
        <LoginForm authFunc={this.authenticate} />
      </div>
    );
  }
}

export default App

import React, { Component } from 'react'
import {BrowserRouter} from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import GustHome from './components/auth/Home'
import Wrapper from './components/common/LoggedWrapper'
import './App.css'
import observer from './utils/observer'

class App extends Component {
  constructor() {
    super()

    this.state = {
      token: '',
      isLoggedIn: false,
      username: ''
    }

    this.changeStateFunc = ({username}) => {
      this.setState({isLoggedIn: true, username: username})
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token') !== '' && localStorage.getItem('token') !== null) {
      this.setState({ 
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username')
      })
    }
    observer.addObserver('changeFocus', this.changeStateFunc)
  }

  render() {
    return (
      <BrowserRouter>
        <div id="container">
          {this.state.username !== '' ? <Header data={this.state.username} /> : <Header data={null} />}
          {this.state.username !== '' ? <Wrapper/> : <GustHome/>}
          <Footer/>
          <div id="notifications">
            <div id="loadingBox" className="notification"><span>Loading...</span></div>
            <div id="infoBox" className="notification"><span>Info</span></div>
            <div id="errorBox" className="notification"><span>Error</span></div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

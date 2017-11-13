import React, {Component} from 'react'
import Login from './Login'
import Register from './Register'
//import Menu from '../common/Menu'

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
    <div className="content">
      <section id="viewWelcome">
        <div className="welcome">
          <div className="signup">
            <Login/>
            <Register/>
          </div>
          <div className="about">
            <h1>Welcome to SeenIt</h1>
            <p>Share interesting links and discuss great content. It's what's happening now.</p>
            <p>Sign in or sign up in a second.</p>
          </div>
        </div>
      </section>
    </div>
    );
  }
}
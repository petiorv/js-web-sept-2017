import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
import reqHandler from '../../utils/requestHandler'
import notification from '../../utils/notifications'
import observer from '../../utils/observer'

export default (props) => {
  return(
    <header>
      <span className="logo">☃</span><span className="header">SeenIt</span>
      {props.data !== null && 
        <div id="profile"><span>{props.data}</span>| 
        <Link onClick={() => {
          localStorage.clear()
          observer.executeObserver('changeFocus', {
          isLoggedIn: false,
          username: '' })
          reqHandler.logout()
          .then(() => {
            notification.showInfo('Logout successful!')
          })}} to="/logout">logout</Link>
        </div>
      }
    </header>
  )
}
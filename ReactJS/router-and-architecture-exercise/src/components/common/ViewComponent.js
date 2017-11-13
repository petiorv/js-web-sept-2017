import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Catalog from '../elements/Catalog'
import MyPosts from '../elements/MyPosts'
import SubmitLink from '../elements/SubmitLink'
import Details from '../elements/Details'
import DeleteComment from './../elements/DeleteComment'
import Edit from './../elements/Edit'
import Delete from './../elements/Delete'


let ViewComponent = () => {
  return(
    <Switch>
      <Route exact path='/' component={Catalog}/>
      <Route path='/catalog' component={Catalog}/>
      <Route path='/submitLink' component={SubmitLink}/>
      <Route path='/myPosts' component={MyPosts}/>
      <Route path='/details/:id' component={Details}/>
      <Route path='/removeComment/:id' component={DeleteComment} />
      <Route path='/edit/:id' component={Edit} />
      <Route path='/remove/:id' component={Delete} />
    </Switch>
  )
}

export default ViewComponent
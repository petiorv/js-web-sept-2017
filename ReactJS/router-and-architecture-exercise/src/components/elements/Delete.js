import React from 'react'
import {Redirect} from 'react-router-dom'
import reqHandler from './../../utils/requestHandler'
import observer from './../../utils/observer'

let Delete = (props) => {
  reqHandler.getPostComments(props.match.params.id)
  .then(foundComments => {
    if(foundComments.length > 0) {
      for(let comment of foundComments) {
        let currentCommentId = comment._id
        reqHandler.deleteComment(currentCommentId)
        .then(() => {
          console.log('the comments are removed, too')
        })
      }
    }

    reqHandler.deletePost(props.match.params.id)
    .then(() => {
      console.log('removed post')
      reqHandler.getPosts()
      .then(allPosts => {
        observer.executeObserver('changeCatalogPosts',{posts: allPosts})
      })
    })
  })

  return (
    <Redirect to ='/'/>
  )
}

export default Delete
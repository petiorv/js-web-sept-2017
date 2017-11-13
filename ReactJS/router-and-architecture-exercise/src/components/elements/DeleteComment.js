import React from 'react'
import { Redirect } from 'react-router-dom'
import reqHandler from '../../utils/requestHandler'

let DeleteComment = (props) => {
  reqHandler.deleteComment(props.match.params.id)
  .then(() => {
    console.log('removed comment')
  })

    return (
        <Redirect to ='/catalog'/>
        
    )
}

export default DeleteComment
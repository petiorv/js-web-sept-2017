import React from 'react'
import {Link} from 'react-router-dom'
import reqHandler from '../../../utils/requestHandler'

let PostComment = (props) => {
  return(
  <article className="post post-content">
    <p>{props.data.content}</p>
    <div className="info">
      submitted {reqHandler.postTime(props.data._kmd.ect)} ago by {props.data.author} | 
      {props.data.author === localStorage.getItem('username') &&
        <Link className="deleteLink" to={`/removeComment/${props.data._id}`}>delete</Link>
      }
    </div>
  </article>
  );
}

export default PostComment
import React from 'react'
import {Link} from 'react-router-dom'
import reqHandler from '../../../utils/requestHandler'

let Post = (props) => {
  return(
  <article className="post">
    <div className="col rank"><span>{props.rank}</span></div>
    <div className="col thumbnail">
      <Link className="commentsLink" to={`/details/${props.data._id}`}>
        <img src={props.data.imageUrl}/>
      </Link>
    </div>
    <div className="post-content">
      <div className="title">
      <Link className="commentsLink" to={`/details/${props.data._id}`}>{props.data.title}</Link>
      </div>
      <div className="details">
        <div className="info">submitted {reqHandler.postTime(props.data._kmd.ect)} ago by {props.data.author}</div>
        <div className="controls">
          {props.data.author === localStorage.getItem('username') && 
            <ul>
              <li className="action"><Link className="commentsLink" to={`/details/${props.data._id}`}>comments</Link></li>
              <li className="action"><Link className="editLink" to={`/edit/${props.data._id}`}>edit</Link></li>
              <li className="action"><Link className="deleteLink" to={`/remove/${props.data._id}`}>delete</Link></li>
            </ul>
          }
          {props.data.author !== localStorage.getItem('username') &&
            <ul>
              <li className="action"><Link className="commentsLink" to={`/details/${props.data._id}`}>comments</Link></li>
            </ul>
          }
        </div>
      </div>
    </div>
  </article>
  );
}

export default Post
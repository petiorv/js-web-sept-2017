import React, {Component} from 'react'
import reqHandler from '../../utils/requestHandler'
import {Link} from 'react-router-dom'
import PostComment from './partials/Comment'
import AddComment from './AddComment'

export default class Details extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPost: {},
      comments: [],
      postDate: ''
    }
  }

  componentDidMount() {
    reqHandler.getPostDetails(this.props.match.params.id)
    .then(data => {
      this.setState({currentPost: data})
      this.setState({postDate: reqHandler.postTime(data._kmd.ect)})
      reqHandler.getPostComments(data._id)
      .then(parsedComments => {
        this.setState({comments: parsedComments})
      })
    })
  }

  render() {
    return(
      <section id="viewComments">
        <div className="post">
          <div className="col thumbnail">
            <a href={this.state.currentPost.url}>
              <img src={this.state.currentPost.imageUrl}/>
            </a>
          </div>
          <div className="post-content">
            <div className="title">
                <a href={this.state.currentPost.url}>{this.state.currentPost.title}</a>
            </div>
            <div className="details">
                <p>{this.state.currentPost.description}</p>
                <div className="info">submitted {this.state.postDate} ago by {this.state.currentPost.author}</div>
                <div className="controls">
                {this.state.currentPost.author === localStorage.getItem('username') && 
                  <ul>
                    <li className="action"><Link className="editLink" to={`/edit/${this.state.currentPost._id}`}>edit</Link></li>
                    <li className="action"><Link className="deleteLink" to={`/remove/${this.state.currentPost._id}`}>delete</Link></li>
                  </ul>
                }
                </div>
            </div>
          </div>
          <div className="clear"></div>
        </div>
        <AddComment data={this.state.currentPost._id}/>
        {this.state.comments.map((c, index) => {
          return <PostComment key={index} data={c}/>
        })}
      </section>
    );
  }
}
import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import reqHandler from './../../utils/requestHandler'

export default class AddComment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      success: false
    }

    this.dataCollector = this.dataCollector.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  dataCollector = (e) => {
    this.setState({content: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    let newComment = {
      content: this.state.content,
      author: localStorage.getItem('username'),
      postId: this.props.data
    }
    reqHandler.addComment(newComment)
    .then(parsedData => {
      this.setState({success: true})
      console.log(parsedData)
    })
  }

  render() {
    return(
    <div className="post post-content">
      <form id="commentForm" onSubmit={this.onSubmit}>
        <label>Comment</label>
        <textarea onChange={this.dataCollector} name="content" type="text" required></textarea>
        <input type="submit" value="Add Comment" id="btnPostComment"/>
      </form>
      {this.state.success && (<Redirect to='/catalog'/>)}
    </div>
    );
  } 
}
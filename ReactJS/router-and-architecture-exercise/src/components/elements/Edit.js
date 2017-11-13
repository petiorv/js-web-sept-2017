import React, {Component} from 'react'
import reqHandler from '../../utils/requestHandler'
import {Redirect} from 'react-router-dom'

export default class Edit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
      title: '',
      imageUrl: '',
      description: '',
      success: false
    }

    this.dataCollector = this.dataCollector.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  dataCollector = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    let editedPost = {
      _id: this.props.match.params.id,
      url: this.state.url,
      title: this.state.title,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
      author: localStorage.getItem('username')
    }
    reqHandler.editPost(editedPost)
    .then(parsedData => {
      this.setState({success: true})
    })
  }

  componentDidMount() {
    reqHandler.getPostDetails(this.props.match.params.id)
    .then(data => {
      this.setState({
        url: data.url,
        title: data.title,
        imageUrl: data.imageUrl,
        description: data.description
      })
    })
  }

  render() {
    return(
    <section id="viewEdit">
      <div className="submitArea">
        <h1>Edit Link</h1>
        <p>Please, fill out the form. A thumbnail image/description is not required.</p>
      </div>
      <div className="submitArea formContainer">
        <form id="editPostForm" className="submitForm" onSubmit={this.onSubmit}>
          <label>Link URL:</label>
          <input required onChange={this.dataCollector} name="url" type="text" value={this.state.url}/>
          <label>Link Title:</label>
          <input required onChange={this.dataCollector} name="title" type="text" value={this.state.title}/>
          <label>Link Thumbnail Image (optional):</label>
          <input onChange={this.dataCollector} name="imageUrl" type="text" value={this.state.imageUrl}/>
          <label>Comment (optional):</label>
          <textarea onChange={this.dataCollector} name="description" value={this.state.description}></textarea>
          <input id="btnEditPost" type="submit" value="Edit Post"/>
        </form>
        {this.state.success && (<Redirect to='/'/>)}
      </div>
    </section>
    );
  }
}
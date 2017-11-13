import React, {Component} from 'react'
import reqHandler from '../../utils/requestHandler'
import {Redirect} from 'react-router-dom'

export default class SubmitLink extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
      title: '',
      imageUrl: '',
      description: '',
      author: localStorage.getItem('username'),
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
    reqHandler.addPost(this.state)
    .then(parsedData => {
      this.setState({success: true})
      console.log(parsedData)
    })
  }

  render() {
    return(
    <section id="viewSubmit">
      <div className="submitArea">
          <h1>Submit Link</h1>
          <p>Please, fill out the form. A thumbnail image is not required.</p>
      </div>
      <div className="submitArea formContainer">
        <form id="submitForm" className="submitForm" onSubmit={this.onSubmit}>
          <label>Link URL:</label>
          <input required onChange={this.dataCollector} name="url" value={this.state.url} type="text"/>
          <label>Link Title:</label>
          <input required onChange={this.dataCollector} name="title" value={this.state.title} type="text"/>
          <label>Link Thumbnail Image (optional):</label>
          <input onChange={this.dataCollector} name="imageUrl" value={this.state.imageUrl} type="text"/>
          <label>Comment (optional):</label>
          <textarea onChange={this.dataCollector} name="description"></textarea>
          <input id="btnSubmitPost" value="Submit" type="submit"/>
        </form>
        {this.state.success && (<Redirect to='/'/>)}
      </div>
    </section>
    );
  }
}
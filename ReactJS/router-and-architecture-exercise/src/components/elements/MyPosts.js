import React, {Component} from 'react'
import reqHandler from '../../utils/requestHandler'
import Post from './partials/Post'

export default class MyPosts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      myPosts: []
    }
  }

  componentDidMount() {
    reqHandler.getMyPosts()
    .then(data => {
      this.setState({myPosts: data})
      console.log(this.state)
    }).catch(e => {
      console.log(e)
    })
  }

  render() {
    return(
    <section id="viewMyPosts">
      <div className="post post-content"><h1>Your Posts</h1></div>
      <div className="posts">
      {this.state.myPosts.map((post, index) => {
          return <Post key={index} data={post} rank={index+=1}/>
        })}
      </div>
    </section>
    );
  }
}






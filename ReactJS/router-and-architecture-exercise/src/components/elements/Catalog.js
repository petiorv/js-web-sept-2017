import React, {Component} from 'react'
import reqHandler from '../../utils/requestHandler'
import Post from './partials/Post'
import observer from './../../utils/observer'

export default class Catalog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }

    this.changeStateFunc = ({posts}) => {
      this.setState({posts: posts})
    }
  }

  componentDidMount() {
    reqHandler.getPosts()
    .then(data => {
      this.setState({posts: data})
      observer.executeObserver('changeFocus', { username: localStorage.getItem('username') })
    })

    observer.addObserver('changeCatalogPosts', this.changeStateFunc)
  }

  render() {
    return(
    <section id="viewCatalog">
      <div className="posts">
        {this.state.posts.map((post, index) => {
          return <Post key={index} data={post} rank={index+=1}/>
        })}
      </div>
    </section>
    );
  }
}
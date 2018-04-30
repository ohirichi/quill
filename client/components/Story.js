import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getOneStory} from '../store'

export class Story extends Component {
  constructor (){
    super();
  }
  componentDidMount(){
    this.props.getStory(Number(this.props.match.params.storyId))
  }

  render () {
    const story = this.props.stories.story
    console.log("story.user", this.props.stories.story.user)
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-3">{story.title || "Untitled"} <small className = "text-muted"> by {story && story.user ? story.user.name : null}</small></h1>
          <p className="lead">The story of {story && story.prompt ? story.prompt.content.substring(46) : "some mysterious things" }
          </p>
          <hr className="my-4"/>
          <p>{story.content}</p>
          {story.userId === this.props.user.id &&
          <p className="lead">
            <Link className="btn btn-primary btn-lg" to={`/stories/${story.id}/edit`} role="button">Edit Story</Link>
          </p>
          }
        </div>
      </div>
  )}

}

const mapState = (state) =>{
  return {...state}
}

const mapDispatch = (dispatch) =>{
  return {
    getStory (storyId){
      dispatch(getOneStory(storyId))
    }
  }
}

export default connect(mapState, mapDispatch)(Story)

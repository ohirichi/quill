import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateStory, updateUser, me} from '../store';
import {noTime} from '../../utils'

class EditStory extends Component {
  constructor () {
    super();
    this.state = {

    }
  }


  render (){
    const story = this.props.story
    console.log("STORY:", this.props.story)
    return (
    <div className="container" >
      <form onSubmit={(event) => this.props.handleSubmit(event, this.props.user)} >
        <fieldset>
          <legend>Editing story#{story.id}</legend>
          <div className="form-group row">
            <label className="col-md-2 col-form-label">Prompt: </label>
            <div className="col-lg-7">
              <p>{story && story.prompt ? story.prompt.content : "UNKOWN PROMPT"}</p>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="storyTitle">Title: </label>
            <input className="form-control" name="storyTitle" aria-describedby="titleHelp" defaultValue="Untitled" type="text" />
            <small id="titleHelp" className="form-text text-muted">You can leave the story Untitled if you wish</small>
          </div>

          <div className="form-group">
            <label htmlFor="storyContent">Story:</label>
            <textarea className="form-control" name="storyContent" rows="10" defaultValue={story.content} ></textarea>
          </div>

          <fieldset className="form-group">
            <legend>Make Story Public?</legend>
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="setPublic" id="setPublicYes" value="Yes" type="radio"/>
                Yes
              </label>
            </div>
            <div className="form-check">
            <label className="form-check-label">
                <input className="form-check-input" name="setPublic" id="setPublicNo" value="No" type="radio"/>
                No
              </label>
            </div>
            <input type="hidden" name="id" value={story.id} />

          <button type="submit" className="btn btn-primary">Submit</button>
        </fieldset>
      </fieldset>
  </form>
</div>
    )}
}

const mapState = (state) => {
  return { story: state.stories.story, user: state.user}
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (event, user) {
    event.preventDefault();
    const id = event.target.id.value;
    const title = event.target.storyTitle.value;
    const content = event.target.storyContent.value;
    let isPublic;
    event.target.setPublic.value === 'Yes' ? isPublic = true : isPublic = false;
    const updatedStory = { id, title, content, isPublic}
    dispatch(updateStory(updatedStory))
    const currentTime = new Date()
    // if (!user.lastSubmit || noTime(user.lastSubmit) > noTime(currentTime)){
      dispatch(updateUser(user.id))
      dispatch(me())
    // }
    // else {
    //   console.log("user in the else:", user)
    // }


    }
  }
}

export default connect(mapState, mapDispatch)(EditStory)

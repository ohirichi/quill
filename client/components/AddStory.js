import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getNewPrompt, submitStory, editStreak, me} from '../store';
import {noTime} from '../../utils'

class AddStory extends Component {
  constructor () {
    super();
    this.state = {
      prompt: {}
    }
  }

  componentDidMount(){
    this.props.getNewPrompt();
  }

  componentWillReceiveProps(nextProps){
    if (this.props !== nextProps){
      console.log("this props", this.props)
      console.log("next props", nextProps.prompt.prompt)
      this.setState({prompt: nextProps.prompt.prompt})
    }
  }

  render (){
    const prompt = this.state.prompt
    console.log("STORY:", this.props.story)
    return (
    <div className="container" >
      <form onSubmit={(event) => this.props.handleSubmit(event, this.props.user, prompt)} >
        <fieldset>
          <legend>New Story</legend>
          <div className="form-group row">
            <label className="col-md-2 col-form-label">Prompt: </label>
            <div className="col-lg-7">
              <p>{prompt && prompt.id ? prompt.content : "UNKOWN PROMPT"}</p>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="storyTitle">Title: </label>
            <input className="form-control" name="storyTitle" aria-describedby="titleHelp" defaultValue="Untitled" type="text" />
            <small id="titleHelp" className="form-text text-muted">You can leave the story Untitled if you wish</small>
          </div>

          <div className="form-group">
            <label htmlFor="storyContent">Story:</label>
            <textarea className="form-control" name="storyContent" rows="10" ></textarea>
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

          <button type="submit" className="btn btn-primary">Submit</button>
        </fieldset>
      </fieldset>
  </form>
</div>
    )}
}

const mapState = (state) => {
  return { prompt: state.prompt, user: state.user}
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (event, user, prompt) {
    event.preventDefault();
    const promptId = prompt.id;
    const userId = user.id
    const title = event.target.storyTitle.value;
    const content = event.target.storyContent.value;
    let isPublic;
    event.target.setPublic.value === 'Yes' ? isPublic = true : isPublic = false;
    const newStory = { userId, promptId, title, content, isPublic}
    dispatch(submitStory(newStory))
    const currentTime = new Date()
    if (!user.lastSubmit || noTime(user.lastSubmit) > noTime(currentTime)){
      dispatch(editStreak(user.id))
    }
    },
    getNewPrompt () {
      dispatch(getNewPrompt())
    }
  }
}

export default connect(mapState, mapDispatch)(AddStory)

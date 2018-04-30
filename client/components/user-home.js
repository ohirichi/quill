import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {displayName} = props
  const now = new Date();
  const {lastSubmit} = props;
  let elapsedTime;
  if (lastSubmit){
    elapsedTime = now - lastSubmit
  }


  return (
    <div className="jumbotron">
      <h1 className="display-3">Welcome, {displayName.charAt(0).toUpperCase()+ displayName.slice(1)}!</h1>
      <p className="lead">Your current writing streak is {props.streak}. {props.streak === 0 ? 'Why not try writing a response to one of our prompts to get your creative streak started?' : 'Keep up the great work!'} {lastSubmit ? `Your last submission was on ${lastSubmit.toString().substring(0,10)}.` : null }</p>
      <hr className="my-4"/>
      <p>Choose one of the following options. You can get a brand new prompt to work on, or pick one you've already written to continue working on. The most important thing is to keep writing!</p>
      <p className="lead row">
        <Link className="col-sm-4 btn btn-primary btn-md" to={`/user/${props.user.id}/stories/add`} role="button" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Get a random new prompt">Get New Prompt</Link>

        <Link className="col-sm-4 btn btn-primary btn-md" to={`/user/${props.user.id}/stories`} role="button"  data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Choose a story you've written that you want to continue to develop">Continue a Story</Link>
      </p>
</div>

  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    email: state.user.email,
    displayName: state.user.name,
    streak: state.user.streak,
    lastSubmit: state.user.lastSubmit
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

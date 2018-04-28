import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

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
      <p className="lead">Your current writing streak is {props.streak}. {props.streak === 0 ? 'Why not try writing a response to one of our prompts to get your creative streak started?' : 'Keep up the great work!'} {lastSubmit ? `Your last submission was on ${lastSubmit}` : null }</p>
      <hr className="my-4"/>
      <p>Choose one of the following options:</p>
      <p className="lead row">
        <a className="col-sm-4 btn btn-primary btn-md" href="#" role="button">Learn more</a>
        <a className="col-sm-4 btn btn-primary btn-md" href="#" role="button">Learn more</a>
        <a className="col-sm-4 btn btn-primary btn-md" href="#" role="button">Learn more</a>
      </p>
</div>

  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
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

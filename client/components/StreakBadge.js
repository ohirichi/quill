import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addStreak, editStreak} from '../store';

export class StreakBadge extends Component {
  constructor (){
    super()

  }


  render(){
    const streak = this.props.streak - 0 === this.props.streak ? this.props.streak : "HELP ME"
    return (
      <div>
        <a href='/home'><span className="badge badge-pill badge-info"> streak: {streak}</span></a>
      </div>
    )
  }
}

const mapState = (state) => ({streak: state.user.streak, user: state.user})

const mapDispatch = null

export default connect(mapState, mapDispatch)(StreakBadge)

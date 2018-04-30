import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {StreakBadge} from '../components';


const Navbar = ({ handleClick, isLoggedIn, user, streak }) => (
  <div>
    <div id="header"><h1> <img src="quill-icon-22.png" />Quill: <span className="text-muted" >Break the Block</span></h1></div>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark" id="nav">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarColor03">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/read">Read</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/write">Write</Link>
          </li>
        </ul>

        {isLoggedIn ? ( <ul className = "navbar-nav my-2 my-lg-0">
            <li className= "nav-link" ><StreakBadge /></li>
            <li className = "nav-link"> | </li>
            <li><a className= "nav-link" href="#" onClick={handleClick}>
              Logout
            </a></li>
          </ul>
        ) : (
        <ul className = " navbar-nav my-2 my-lg-0">
          <li className=" nav-item mr-sm" ><Link className="nav-link" to="/login">Login</Link></li>
          <li className=" nav-item mr-sm nav-link" > | </li>
          <li className="nav-item mr-sm" ><Link className="nav-link" to="/signup">Sign Up</Link></li>
        </ul>)}


      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    streak: state.user.streak
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

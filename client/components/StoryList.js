import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getAllUserStories} from '../store'


class SharedStories extends Component {
  constructor (props) {
    super (props);
    this.state = {
      selectedCategory: "All"
    }
  }
  componentDidMount () {
    const userId = this.props.match.params.id;
    console.log("USERID", userId)
    this.props.getUserStories(userId)
  }

  render () {
    let stories;
    console.log("PROPS:", this.props)
    let own = false;
    if (this.props.match.path === '/read'){
      stories = this.props.stories.publicStories
    }
    else {
      stories = this.props.stories.userStories
      own = true;
    }

    // if (this.state.category !== 'All'){
    //   stories = this.props.stories.publicStories.filter(story => story.category.includes(this.state.selectedCategory))
    // }
    // let helper = []
    // let storyCategories = this.props.stories.publicStories.map(story => story.category)

    // storyCategories.forEach (category => {
    //   helper.concat(category)
    // })

    // storyCategories = Array.from(new Set(helper))
    console.log("PROPS:", this.props)

  return (
    <div className ="container">
      {!own? <h3>Shared Stories</h3> : <h3>Your Stories</h3>}

      {!stories.length ? <h2>There are currently no stories to show. Why not add one?</h2> : <div id = "story-cards-holder" className = "row">
        {stories.map(story => {
          return (
            <Link key = {story.id} to = {`/stories/${story.id}`} className = "col-lg-4">
              <div>
                <div className="card border-info mb-3">
                  <div className="card-header">{story.title || "Untitled"}, by {story.user.name}</div>
                  <div className="card-body">
                    <h4 className="card-title">{"The story of" + story.prompt.content.substring(46)}</h4>
                    <p className="card-text">{story.content.substring(0,15)+ "..."}</p>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>}
    </div>
  )
  }


}


const mapState = (state) => {
  return {...state, user: state.user}
}

const mapDispatch = (dispatch) => {
  return {
    getUserStories (userId) {
      dispatch(getAllUserStories(userId))
    }
  }
}
export default connect(mapState, mapDispatch)(SharedStories)

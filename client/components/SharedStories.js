import React, {Component} from 'react';
import {connect} from 'react-redux';


class SharedStories extends Component {
  constructor () {
    super ();
    this.state = {
      selectedCategory: "All"
    }
  }

  render () {
    let stories = this.props.stories.publicStories
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
    <div>
      <h1>Hello?</h1>
      <div id = "story-cards-holder">
        {stories.map(story => {
          return (
            <div key = {story.id} className="card border-info mb-3">
              <div className="card-header">Author: {story.user.name}</div>
              <div className="card-body">
                <h4 className="card-title">{story.title || story.prompt.content}</h4>
                <p className="card-text">{story.content.substring(0,15)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
  }


}


const mapState = (state) => {
  return {...state}
}

const mapDispatch = null
export default connect(mapState, mapDispatch)(SharedStories)

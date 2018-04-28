import React from 'react';
import {connect} from 'react-redux';

class SharedStories extends React.Component {
  constructor () {
    super ();
    this.state = {
      selectedCategory: "All"
    }
  }

  render () {
    let stories = this.props.publicStories
    if (this.state.category !== 'All'){
      stories = this.prop.publicStories.filter(story => story.category.includes(this.state.selectedCategory))
    }
    let helper = []
    let storyCategories = this.props.publicStories.map(story => story.category)

    storyCategories.forEach (category => {
      helper.concat(category)
    })

    storyCategories = Array.from(new Set(helper))

  return (
    <div>
      <div id = "story-cards-holder">
        {stories.map(story => {
          return (
            <div class="card border-info mb-3" style="max-width: 20rem;">
              <div class="card-header">{story.title}</div>
              <div class="card-body">
                <h4 class="card-title">Info card title</h4>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  }


}

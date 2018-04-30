import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StoryList} from './StoryList';

export class UserStories extends Component {
  constructor (){
    super();
    this.state = {

    }
  }

  componentDidMount(){

  }

  render(){

    return(
      <div>
        <StoryList />
      </div>
    )
  }

}

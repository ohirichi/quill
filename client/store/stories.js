import axios from 'axios'
import history from '../history'

// Action Types

const GET_PUBLIC_STORIES = 'GET_PUBLIC_STORIES';
const GET_USER_STORIES = 'GET_USER_STORIES';
const GET_STORY = 'GET_STORY';
const EDIT_STORY = 'EDIT_STORY';
const DELETE_STORY = 'DELETE_STORY';
const ADD_STORY = 'ADD_STORY';

//Initial State:

const initialState = {
  publicStories: [],
  userStories: [],
  story: {}
}

// Action Creators:

const getSharedStories = (sharedStories) => ({type: GET_PUBLIC_STORIES, sharedStories});

const getUserStories = (userStories) => ({type: GET_USER_STORIES, userStories});

const getStory = (story) => ({type: GET_STORY, story});

const editStory = (story) => ({type: EDIT_STORY, story});

const deleteStory = (story) => ({type: DELETE_STORY, story});

const addStory = (story) => ({type: ADD_STORY, story});

//Thunks:

export const getAllSharedStories = () =>
  dispatch =>
    axios.get('/api/stories')
      .then (res => res.data)
      .then(stories => dispatch(getSharedStories(stories)))
      .catch(err => console.log(err))

export const getAllUserStories = (userId) =>
  dispatch =>
    axios.get(`/api/users/${userId}/stories`)
      .then(res => res.data)
      .then(stories => dispatch(getUserStories(stories)))
      .catch(err => console.log(err))

export const getOneStory = (storyId) =>
  dispatch =>
    axios.get(`/api/stories/${storyId}`)
      .then(res => res.data)
      .then(story => dispatch(getStory(story)))
      .catch(err => console.log(err))

export const updateStory = (story) =>
  dispatch =>
    axios.put(`/api/stories/${story.id}`, story)
      .then(res => res.data)
      .then(updatedStory => {
        console.log("updatedStory", updatedStory)
        dispatch(editStory(updatedStory))
        window.location = `/user/${updatedStory.userId}/stories`
      })
      .catch(err => console.log(err))

export const removeStory = (story) =>
  dispatch =>
    axios.delete(`/api/stories/${story.id}`)
      .then(() => dispatch(deleteStory(story)))
      .catch(err => console.log(err))

export const submitStory = (story) =>
  dispatch =>
    axios.post('/api/stories', story)
      .then(res =>  res.data)
      .then(newStory => {
        console.log("newStory:", newStory)
        dispatch(addStory(newStory))
        window.location = `/user/${newStory.userId}/stories`
      })
      .catch(err => console.log(err))


//REDUCER:

export default function (state = initialState, action){
  switch (action.type){
    case GET_PUBLIC_STORIES:
      return {...state, publicStories: action.sharedStories}
    case GET_USER_STORIES:
      return {...state, userStories: action.userStories}
    case GET_STORY:
      return {...state, story: action.story}
    case EDIT_STORY:
      return {...state, userStories: [...state.userStories.filter(story => story.id !== action.story.id, action.story)], story: action.story}
    case DELETE_STORY:
      return {...state, userStories: [...state.userStories.filter(story => story.id !== action.story.id)], story: {}}
    case ADD_STORY:
      return {...state, userStories: [...state.userStories, action.story], story: action.story}
    default:
      return state

  }
}

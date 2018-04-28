import axios from 'axios'
import history from '../history'

//ACTION TYPES:
const GET_PROMPT = 'GET_PROMPT'

//INITIAL STATE:
const initialState = {
  prompt: {}
};

//ACTION CREATORS:

const getPrompt = (prompt) => ({type:GET_PROMPT, prompt})

//THUNKS:

export const getNewPrompt = () =>
  dispatch =>
    axios.get('/api/prompts')
      .then(res => res.data)
      .then(prompt => dispatch(getPrompt(prompt)))
      .catch(err => console.log(err))

//REDUCER

export default function (state = initialState, action){

  switch (action.type){
    case GET_PROMPT:
      return {...state, prompt: action.prompt}
    default:
      return state
  }

}


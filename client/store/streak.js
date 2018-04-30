import axios from 'axios'
import history from '../history'

//ACTION TYPES:

const GET_STREAK = 'GET_STREAK';
const UPDATE_STREAK = 'UPDATE_STREAK';
const REMOVE_STREAK = 'REMOVE_STREAK';

//INITIAL STATE

const initialStreak = 0;

//ACTION CREATORS:

const getStreak = (streak) => ({type:GET_STREAK, streak});
const updateStreak = (streak) => ({type: UPDATE_STREAK, streak});
const removeStreak = () => ({type:REMOVE_STREAK})

//THUNKS:

export const addStreak = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => res.data)
      .then(user => {
        dispatch(getStreak(user.streak))
      })
      .catch(err => console.log("error getting streak: ", err))


export const editStreak = (userId) =>
  dispatch =>
      axios.put(`/api/users/${userId}`)
        .then(res => res.data)
        // .then(streak => {
        //   //dispatch(updateStreak(streak))
        // })
        .catch(err => console.log("err updating streak", err))

export const deleteStreak = () =>
  dispatch => {
    dispatch(removeStreak())
  }

export default function (state = initialStreak, action) {
  switch (action.type){
    case GET_STREAK:
      return action.streak
    case UPDATE_STREAK:
      return action.streak
    case REMOVE_STREAK:
      return initialStreak;
    default:
      return initialStreak;

  }
}

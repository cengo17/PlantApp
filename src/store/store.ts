import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
  questions: [],
  categories: [],
};

// Actions
export const setQuestions = questions => ({
  type: 'SET_QUESTIONS',
  payload: questions,
});

export const setCategories = categories => ({
  type: 'SET_CATEGORIES',
  payload: categories,
});

// Async Actions
export const fetchQuestions = () => {
  return async dispatch => {
    try {
      const response = await axios.get(
        'https://dummy-api-jtg6bessta-ey.a.run.app/getQuestions',
      );
      dispatch(setQuestions(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchCategories = () => {
  return async dispatch => {
    try {
      const response = await axios.get(
        'https://dummy-api-jtg6bessta-ey.a.run.app/getCategories',
      );
      dispatch(setCategories(response.data.data));
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return {...state, questions: action.payload};
    case 'SET_CATEGORIES':
      return {...state, categories: action.payload};
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

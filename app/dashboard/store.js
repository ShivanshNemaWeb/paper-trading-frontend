// store.js
import { createStore } from 'redux';

const initialState = {
  selectedStock: 'TCS.NS', // Initial value
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_STOCK':
      return {
        ...state,
        selectedStock: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;

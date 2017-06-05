import { RECEIVE_PATH } from "../actions/path_actions";
import merge from 'lodash/merge';

const PathReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_PATH:
      return newState;

    default:
      return state;
  }
};

export default PathReducer;

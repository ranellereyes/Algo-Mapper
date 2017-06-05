import {combineReducers} from 'redux';
import PathReducer from './path_reducer';


const rootReducer = combineReducers({
  paths: PathReducer
});

export default rootReducer;

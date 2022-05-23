import { combineReducers } from 'redux';
import { nodeReducer } from './reducers/nodeReducer';

const rootReducer = combineReducers({
  nodes: nodeReducer,
});
export default rootReducer;

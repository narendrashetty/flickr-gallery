import { combineReducers } from 'redux';
import Photos from './photos';
import Tags from './tags';

const rootReducer = combineReducers({
  Photos,
  Tags
});

export default rootReducer;

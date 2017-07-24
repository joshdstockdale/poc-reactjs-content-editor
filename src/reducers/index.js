import {combineReducers} from 'redux';
import items from './itemReducer';
import folders from './folderReducer';
import tags from './tagReducer';
import templates from './templateReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  items,
  folders,
  tags,
  templates,
  ajaxCallsInProgress
});

export default rootReducer;
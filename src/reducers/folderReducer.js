import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function folderReducer(state = initialState.folders, action) {
  switch (action.type) {

    case types.LOAD_FOLDERS_SUCCESS:
      return action.folders;

    case types.CREATE_FOLDER_SUCCESS:
      return [
        ...state,
        ...Object.assign({}, action.folder)
      ];

    case types.UPDATE_FOLDER_SUCCESS:
      return [
        ...state.filter(folder => folder.id !== action.folder.id),
        Object.assign({}, action.folder)
      ];

    case types.DELETE_FOLDER_SUCCESS:
      return action.folders;

    default:
      return state;
  }
}

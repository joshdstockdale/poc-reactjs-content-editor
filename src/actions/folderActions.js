import * as types from './actionTypes';
import folderApi from '../api/folderApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadFolderSuccess(folders) {
  return {type: types.LOAD_FOLDERS_SUCCESS, folders};
}
export function createFolderSuccess(folder) {
  return {type: types.CREATE_FOLDER_SUCCESS, folder};
}
export function updateFolderSuccess(folder) {
  return {type: types.UPDATE_FOLDER_SUCCESS, folder};
}
export function deleteFolderSuccess(folders) {
  return {type: types.DELETE_FOLDER_SUCCESS, folders};
}

export function loadFolders() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return folderApi.getAllFolders().then(folders => {
      dispatch(loadFolderSuccess(folders));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveFolder(folder) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return folderApi.saveFolder(folder).then(folder => {
      //Update
      folder.id ? dispatch(updateFolderSuccess(folder)) :
      //Create
        dispatch(createFolderSuccess(folder));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteFolder(folders, folderId) {
  return function(dispatch) {
    if(!isNaN(folderId)){
      return new Promise((resolve, reject) => {
        let updated = Object.assign([], folders);
        updated.splice(folders.findIndex(folder => folder.id == folderId), 1);
        dispatch(deleteFolderSuccess(updated));
        resolve(updated);
      });

    }else{
      throw("Not a Number"+ folderId);
    }
  };
}
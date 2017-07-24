import * as types from './actionTypes';
import tagApi from '../api/tagApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadTagSuccess(tags) {
  return {type: types.LOAD_TAGS_SUCCESS, tags};
}
export function createTagSuccess(tag) {
  return {type: types.CREATE_TAG_SUCCESS, tag};
}
export function updateTagSuccess(tag) {
  return {type: types.UPDATE_TAG_SUCCESS, tag};
}
export function deleteTagSuccess(tags) {
  return {type: types.DELETE_TAG_SUCCESS, tags};
}

export function loadTags() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return tagApi.getAllTags().then(tags => {
      dispatch(loadTagSuccess(tags));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveTag(tag) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return tagApi.saveTag(tag).then(tag => {
      //Update
      tag.id ? dispatch(updateTagSuccess(tag)) :
      //Create
        dispatch(createTagSuccess(tag));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteTag(tags, tagId) {
  return function(dispatch) {
    if(!isNaN(tagId)){
      return new Promise((resolve, reject) => {
        let updated = Object.assign([], tags);
        updated.splice(tags.findIndex(tag => tag.id == tagId), 1);
        dispatch(deleteTagSuccess(updated));
        resolve(updated);
      });

    }else{
      throw("Not a Number"+ tagId);
    }
  };
}
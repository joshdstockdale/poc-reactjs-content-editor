import * as types from './actionTypes';
import itemApi from '../api/itemApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadItemsSuccess(items) {
  return {type: types.LOAD_ITEMS_SUCCESS, items};
}
export function createItemSuccess(item) {
  return {type: types.CREATE_ITEM_SUCCESS, item};
}
export function updateItemSuccess(item) {
  return {type: types.UPDATE_ITEM_SUCCESS, item};
}
export function uploadImageSuccess(file) {
  return {type: types.UPDATE_IMAGE_SUCCESS, file};
}
export function deleteItemSuccess(items) {
  return {type: types.DELETE_ITEM_SUCCESS, items};
}

export function loadItems() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return itemApi.getAllItems().then(items => {
      dispatch(loadItemsSuccess(items));
    }).catch(error => {
      throw(error);
    });
  };
}

export function uploadImage(file) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return itemApi.uploadImage(file).then(file => {
      dispatch(uploadImageSuccess(file));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveItem(item) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return itemApi.saveItem(item).then(item => {
      //Update
      item.id ? dispatch(updateItemSuccess(item)) :
      //Create
        dispatch(createItemSuccess(item));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteItem(items, itemId) {
  return function(dispatch) {
    if(!isNaN(itemId)){
      return new Promise((resolve, reject) => {
        let updated = Object.assign([], items);
        updated.splice(items.findIndex(item => item.id == itemId), 1);
        dispatch(deleteItemSuccess(updated));
        resolve(updated);
      });

    }else{
      throw("Not a Number"+ itemId);
    }
  };
}
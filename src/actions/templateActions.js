import * as types from './actionTypes';
import templateApi from '../api/templateApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadTemplateSuccess(templates) {
  return {type: types.LOAD_TEMPLATES_SUCCESS, templates};
}
export function createTemplateSuccess(template) {
  return {type: types.CREATE_TEMPLATE_SUCCESS, template};
}
export function updateTemplateSuccess(template) {
  return {type: types.UPDATE_TEMPLATE_SUCCESS, template};
}
export function deleteTemplateSuccess(templates) {
  return {type: types.DELETE_TEMPLATE_SUCCESS, templates};
}

export function loadTemplates() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return templateApi.getAllTemplates().then(templates => {
      dispatch(loadTemplateSuccess(templates));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveTemplate(template) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return templateApi.saveTemplate(template).then(template => {
      //Update
      template.id ? dispatch(updateTemplateSuccess(template)) :
      //Create
        dispatch(createTemplateSuccess(template));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteTemplate(templates, templateId) {
  return function(dispatch) {
    if(!isNaN(templateId)){
      return new Promise((resolve, reject) => {
        let updated = Object.assign([], templates);
        updated.splice(templates.findIndex(template => template.id == templateId), 1);
        dispatch(deleteTemplateSuccess(updated));
        resolve(updated);
      });

    }else{
      throw("Not a Number"+ templateId);
    }
  };
}
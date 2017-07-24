import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tagReducer(state = initialState.tags, action) {
  switch (action.type) {

    case types.LOAD_TAGS_SUCCESS:
      return action.tags;

    case types.CREATE_TAG_SUCCESS:
      return [
        ...state,
        ...Object.assign({}, action.tag)
      ];

    case types.UPDATE_TAG_SUCCESS:
      return [
        ...state.filter(tag => tag.id !== action.tag.id),
        Object.assign({}, action.tag)
      ];

    case types.DELETE_TAG_SUCCESS:
      return action.tags;

    default:
      return state;
  }
}

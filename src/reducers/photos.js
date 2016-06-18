import { fromJS } from 'immutable';
import * as types from '../constants/ActionTypes';
import { normalizePhotosArray } from '../utils/normalizer';

const initialState = fromJS({
  'isFetching': true,
  'photos': []
});

export default function(state = initialState, action) {
  switch (action.type) {

    case types.FETCH_PHOTOS_INIT:
      return state.merge({
        'isFetching': true
      });

    case types.FETCH_PHOTOS_SUCCESS:
      return state.merge({
        'isFetching': false,
        'photos': normalizePhotosArray(action.data.photos.photo)
      });

    case types.FETCH_PHOTOS_ERROR:
      return state;

    default:
      return state;
  }
}

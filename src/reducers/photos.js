import { fromJS } from 'immutable';
import * as types from '../constants/ActionTypes';
import { normalizePhotosArray } from '../utils/normalizer';

const initialState = fromJS({
  'isFetching': true,
  'isNextPageFetching': false,
  'photos': {},
  'page': 0,
  'pages': 1
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
        'page': action.data.photos.page,
        'pages': action.data.photos.pages,
        'photos': normalizePhotosArray(action.data.photos.photo)
      });

    case types.FETCH_PHOTOS_ERROR:
      return state;

    case types.FETCH_PHOTOS_NEXT_INIT:
      return state.merge({
        'isNextPageFetching': true
      });

    case types.FETCH_PHOTOS_NEXT_SUCCESS:
      state = state.merge({
        'isNextPageFetching': false,
        'page': action.data.photos.page,
        'pages': action.data.photos.pages,
      });

      return state.updateIn(['photos'], (photos) => {
        return photos.mergeDeepWith((prev, next) => {
          return prev / next;
        }, fromJS(normalizePhotosArray(action.data.photos.photo)));
      });

    default:
      return state;
  }
}

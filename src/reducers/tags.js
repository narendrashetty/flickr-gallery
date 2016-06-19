import { fromJS } from 'immutable';
import * as types from '../constants/ActionTypes';
import { normalizePhotosArray } from '../utils/normalizer';

const initialState = fromJS({});

export default function(state = initialState, action) {
  switch (action.type) {

    case types.FETCH_PHOTOS_SUCCESS:
      action.data.photos.photo.forEach((photo) => {
        const tags = photo.tags.split(' ').filter(Boolean);
        tags.forEach((tag) => {
          if (!state.get(tag)) {
            state = state.merge({
              [tag]: []
            });
          }

          let newList = state.get(tag).push(photo.id);
          state = state.mergeIn([tag], newList);
        });
      });
      return state;

    default:
      return state;
  }
}

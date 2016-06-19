import { fromJS } from 'immutable';
import * as types from '../constants/ActionTypes';
import { normalizeTags } from '../utils/normalizer';

const initialState = fromJS({
  tags: {},
  titleTags: {}
});

export default function(state = initialState, action) {
  switch (action.type) {

    case types.FETCH_PHOTOS_SUCCESS:
      let stateTags = state.get('tags');
      let stateTitleTags = state.get('titleTags');
      action.data.photos.photo.forEach((photo) => {
        stateTags = normalizeTags(photo.tags, stateTags, photo.id);
        stateTitleTags = normalizeTags(photo.title, stateTitleTags, photo.id);
      });
      
      return state.merge({
        'tags': stateTags,
        'titleTags': stateTitleTags
      });

    default:
      return state;
  }
}

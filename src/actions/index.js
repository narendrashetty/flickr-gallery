import * as types from '../constants/ActionTypes';
import Api from '../api';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const Handlers = {
  'fetchRecentPhotos': {

    init() {
      return {
        'type': types.FETCH_PHOTOS_INIT
      };
    },

    success(data) {
      return {
        'type': types.FETCH_PHOTOS_SUCCESS,
        data
      };
    },

    error(error) {
      return {
        'type': types.FETCH_PHOTOS_ERROR
      };
    },

    nextPageInit() {
      return {
        'type': types.FETCH_PHOTOS_NEXT_INIT
      };
    },

    nextPageSuccess(data) {
      return {
        'type': types.FETCH_PHOTOS_NEXT_SUCCESS,
        data
      };
    }
  }
};

const Actions = {
  fetchRecentPhotos() {
    const handler = Handlers.fetchRecentPhotos;
    return (dispatch) => {
      dispatch(handler.init());
      return Api.getRecentPhotos(1)
        .then(checkStatus)
        .then(parseJSON)
        .then((json) => {
          return dispatch(handler.success(json));
        })
    };
  },

  fetchNextPhotos(page = 1) {
    const handler = Handlers.fetchRecentPhotos;
    return (dispatch) => {
      dispatch(handler.nextPageInit());
      return Api.getRecentPhotos(page)
        .then(checkStatus)
        .then(parseJSON)
        .then((json) => {
          return dispatch(handler.nextPageSuccess(json));
        })
    };
  }
};

export default Actions;
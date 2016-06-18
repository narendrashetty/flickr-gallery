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
    }
  }
};

const Actions = {
  fetchRecentPhotos() {
    const handler = Handlers.fetchRecentPhotos;
    return (dispatch) => {
      dispatch(handler.init());
      return Api.getRecentPhotos()
        .then(checkStatus)
        .then(parseJSON)
        .then((json) => {
          return dispatch(handler.success(json));
        })
        .catch((error) => {
          return dispatch(handler.error(error));
        });
    };
  }
};

export default Actions;
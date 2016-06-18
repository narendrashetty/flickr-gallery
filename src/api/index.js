import fetch from 'isomorphic-fetch';

export default {
  getRecentPhotos() {
    return fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=6c8edb701e336fc974e44b9d2d58eae9&extras=owner_name%2Crealname%2Curl_z%2Ctags%2Cdates&format=json&nojsoncallback=1`);
  }
};

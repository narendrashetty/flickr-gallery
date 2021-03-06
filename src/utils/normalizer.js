function normalizePhotosSingle(photo) {
  return {
    'id': photo.id,
    'url': photo.url_z,
    'postedBy': photo.realname || photo.ownername,
    'width': photo.width_z,
    'height': photo.height_z,
    'title': photo.title
  };
}

export function normalizePhotosArray(photos) {
  var photosObject = {};
  return photos.filter((photo) => {
    return photo.url_z !== undefined
      && photo.width_z !== undefined
      && photo.height_z !== undefined;
  }).map((photo) => {
    return normalizePhotosSingle(photo);
  });
  return photosObject;
}

function normalizeImage(image) {
  image.width =  parseInt(image.width, 10);
  image.height = parseInt(image.height, 10);

  return image;
}

export function normalizeImages(images) {
  for(var i = 0; i < images.length; i++) {
    images[i] = normalizeImage(images[i]);
  }

  return images;
}

export function normalizeTags(tagString, state, photoId) {
  const tags = tagString.split(' ').filter(Boolean);
  tags.forEach((tag) => {
    if (!state.get(tag)) {
      state = state.merge({
        [tag]: {
          'key': tag,
          'value': []
        }
      });
    }

    const newList = state.getIn([tag, 'value']).push(photoId);
    state = state.mergeIn([tag, 'value'], newList);
  });
  return state;
}
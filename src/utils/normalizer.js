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
  return photos.filter((photo) => {
    return photo.url_z !== undefined
      && photo.width_z !== undefined
      && photo.height_z !== undefined;
  }).map((photo) => {
    return normalizePhotosSingle(photo);
  });
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
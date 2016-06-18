function normalizePhotosSingle(photo) {
  return {
    'id': photo.id,
    'url': photo.url_z,
    'postedBy': photo.realname || photo.ownername
  }
}

export function normalizePhotosArray(photos) {
  return photos.map((photo) => {
    return normalizePhotosSingle(photo);
  });
}
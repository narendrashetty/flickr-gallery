function normalizePhotosSingle(photo) {
  return {
    'id': photo.id,
    'url': photo.url_z,
    'postedBy': photo.realname || photo.ownername,
    'width': photo.width_z,
    'height': photo.height_z
  }
}

export function normalizePhotosArray(photos) {
  return photos.filter((photo) => {
    return (photo.url_z !== undefined && 
      photo.width_z !== undefined && 
      photo.height_z !== undefined);
  }).map((photo) => {
    return normalizePhotosSingle(photo);
  });
}
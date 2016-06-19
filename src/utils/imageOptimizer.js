import { BORDER_OFFSET, MAX_WIDTH, TARGET_HEIGHT } from '../constants/image';

export function makeSmaller(image, amount) {
  amount = amount || 1;
  const newHeight = image.height - amount;
  image.width = (image.width * (newHeight / image.height));
  image.height = newHeight;

  return image;
}

export function getCumulativeWidth(images) {
  let width = 0;

  for(let i = 0; i < images.length; i++) {
    width += images[i].width;
  }

  width += (images.length - 1) * BORDER_OFFSET;

  return width;
}

export function fitImagesInRow(images) {
  while(getCumulativeWidth(images) > MAX_WIDTH) {
    for(var i = 0; i < images.length; i++) {
      images[i] = makeSmaller(images[i]);
    }
  };

  return images;
}

export function processImages(photos) {
  const processedImages = [];
  photos.forEach((photo, key) => {
    let width = parseInt(photo.get('width'), 10);
    const height = parseInt(photo.get('height'), 10);
    const ratio = width / height;
    width = TARGET_HEIGHT * ratio; 

    var image = {
      'id': photo.get('id'),
      'height': TARGET_HEIGHT,
      'url': photo.get('url'),
      'postedBy': photo.get('postedBy'),
      'title': photo.get('title'),
      width
    };
    processedImages.push(image);
  });

  return processedImages;
}

export function buildRows(processedImages, currentRow = 0, currentWidth = 0, rows = []) {
  processedImages.forEach((image) => {
    if (currentWidth >= MAX_WIDTH) {
      currentRow++;
      currentWidth = 0;
    }

    if (!rows[currentRow]) {
      rows[currentRow] = [];
    }

    rows[currentRow].push(image);
    currentWidth += image.width;
  });
  return rows;
}
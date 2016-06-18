import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { normalizeImages } from '../utils/normalizer';

const PhotoGallery = React.createClass({

  getInitialState() {
    return {
      'isLoading': true,
      'rows': []
    };
  },

  targetHeight: 250,
  borderOffset: 10,
  maxWidth: 800,

  componentWillMount() {
    this.setup(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.setup(nextProps);
  },

  setup(props) {
    const isFetching = props.Photos.get('isFetching');
    this.setState({
      'isLoading': isFetching
    });
    if (!isFetching) {
      const photos = props.Photos.get('photos');
      const processedImages = this.processImages(photos);
      const rows = this.buildRows(processedImages);

      for(let i = 0; i < rows.length; i++) {
        rows[i] = this.fitImagesInRow(rows[i]);
        rows[i] = normalizeImages(rows[i]);

        const difference = (this.maxWidth - this.getCumulativeWidth(rows[i]));
        const amountOfImages = rows[i].length;

        if(amountOfImages > 1 && difference < 10) {
          const addToEach = difference / amountOfImages;
          for(let n = 0; n < rows[i].length; n++) {
            rows[i][n].width += addToEach;
          }

          rows[i] = normalizeImages(rows[i]);

          rows[i][rows[i].length - 1].width += (this.maxWidth - this.getCumulativeWidth(rows[i]));
        }
      }
      this.setState({
        rows
      });
    }
  },

  processImages(photos) {
    const processedImages = [];
    for(let i = 0; i < photos.size; i++) {
      let width = parseInt(photos.getIn([i, 'width']), 10);
      const height = parseInt(photos.getIn([i, 'height']), 10);
      width = width * (this.targetHeight / height); 
      var image = {
        'id': photos.getIn([i, 'id']),
        'height': this.targetHeight,
        'url': photos.getIn([i, 'url']),
        width
      };

      processedImages.push(image);
    }
    return processedImages;
  },

  buildRows(processedImages) {
    let currentRow = 0;
    let currentWidth = 0;
    let imageCounter = 0;
    const rows = [];

    processedImages.forEach((image) => {
      if (currentWidth >= this.maxWidth) {
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
  },

  fitImagesInRow(images) {
    while(this.getCumulativeWidth(images) > this.maxWidth) {
      for(var i = 0; i < images.length; i++) {
        images[i] = this.makeSmaller(images[i]);
      }
    };

    return images;
  },

  getCumulativeWidth(images) {
    let width = 0;

    for(let i = 0; i < images.length; i++) {
      width += images[i].width;
    }

    width += (images.length - 1) * this.borderOffset;

    return width;
  },

  makeSmaller(image, amount) {
    amount = amount || 1;

    const newHeight = image.height - amount;
    image.width = (image.width * (newHeight / image.height));
    image.height = newHeight;

    return image;
  },

  renderLoading() {
    return (
      <div>Loading...</div>
    );
  },

  renderImageRow(row, index) {
    return (
      <div className="image-row" key={index}>
        {row.map((image) => {
          return (
            <img
              key={image.id}
              src={image.url}
              style={{
                'width': `${Math.ceil(image.width)}px`,
                'height': `${image.height}px`
              }} 
            />
          );
        })}
      </div>
    )
  },

  renderBody() {
    const rows = this.state.rows;
    return (
      <div style={{'width': '800px'}}>
        {rows.map((row, index) => {
          return this.renderImageRow(row, index);
        })}
      </div>
    );
  },

  render() {
    if (this.state.isLoading) {
      return this.renderLoading();
    } else {
      return this.renderBody();
    }
  }
});

function mapStateToProps(state) {
  return {
    'Photos': state.Photos
  };
}

export default connect(mapStateToProps)(PhotoGallery);

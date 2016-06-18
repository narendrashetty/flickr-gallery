import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const PhotoGallery = React.createClass({

  getInitialState() {
    return {
      'isLoading': true
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
    this.setState({
      'isLoading': props.Photos.get('isFetching')
    });
  },

  renderLoading() {
    return (
      <div>Loading...</div>
    );
  },

  processImages(photos) {
    const processedImages = [];
    for(var i = 0; i < photos.size; i++) {
      var width = parseInt(photos.getIn([i, 'width']), 10);
      var height = parseInt(photos.getIn([i, 'height']), 10);
      width = width * (this.targetHeight / height); 
      if (isNaN(width)) debugger;
      var image = {
        'width': width,
        'height': this.targetHeight,
        'image': photos.getIn([i, 'url']),
        'id': photos.getIn([i, 'id'])
      };

      processedImages.push(image);
    }
    return processedImages;
  },

  buildRows(processedImages) {
    var currentRow = 0;
    var currentWidth = 0;
    var imageCounter = 0;
    var rows = [];
    var maxWidth = this.maxWidth;

    processedImages.forEach((image) => {
      if (currentWidth >= maxWidth) {
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
    var width = 0;

    for(var i = 0; i < images.length; i++) {
      width += images[i].width;
    }

    width += (images.length-1)*this.borderOffset;

    return width;
  },

  makeSmaller(image, amount) {
    amount = amount || 1;

    var newHeight = image.height - amount;
    image.width = (image.width * (newHeight / image.height));
    image.height = newHeight;

    return image;
  },

  normalizeImage(image) {
    image.width =  parseInt(image.width);
    image.height = parseInt(image.height);

    return image;
  },

  normalizeImages(images) {
    for(var i = 0; i < images.length; i++) {
      this.normalizeImage(images[i]);
    }

    return images;
  },

  renderGrid(rows) {
    var output = '';
    for(var i = 0; i < rows.length; i++) {
      output += '<div class="image-row">';
      for(var n = 0; n < rows[i].length; n++) {
        var image = rows[i][n];
        output += '<img src="' + image.image + '" style="width:' + Math.ceil(image.width) + 'px; height:' + image.height + 'px;" />';
      }
      output += '</div>';
    }
    return (
      <div style={{'width': '800px'}}>
        {rows.map((row) => {
          return (
            <div className="image-row">
              {row.map((image) => {
                return (
                  <img src={image.image} style={{
                    'width': `${Math.ceil(image.width)}px`,
                    'height': `${image.height}px`
                  }} />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  },

  renderBody() {
    const photos = this.props.Photos.get('photos');
    const processedImages = this.processImages(photos);
    const rows = this.buildRows(processedImages);
    for(var i = 0; i < rows.length; i++) {
      rows[i] = this.fitImagesInRow(rows[i]);

      rows[i] = this.normalizeImages(rows[i]);

      var difference = (this.maxWidth- this.getCumulativeWidth(rows[i]));
      var amountOfImages = rows[i].length;

      if(amountOfImages > 1 && difference < 10) {
        var addToEach = difference / amountOfImages;
        for(var n = 0; n < rows[i].length; n++) {
          rows[i][n].width += addToEach;
        }

        rows[i] = this.normalizeImages(rows[i]);

        rows[i][rows[i].length-1].width += (this.maxWidth - this.getCumulativeWidth(rows[i]));
      }
    }

    return this.renderGrid(rows);
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

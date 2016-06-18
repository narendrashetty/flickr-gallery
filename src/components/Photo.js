import React from 'react';

const Photo = React.createClass({

  render() {
    const image = this.props.image;
    return (
      <div
        className="photo"
        style={{
          'width': `${Math.ceil(image.width)}px`,
          'height': `${image.height}px`,
          'backgroundImage': `url(${image.url})`
        }}
      >
        <div className="photo__overlay">
          <span className="photo__title">{image.title}</span>
          <span className="photo__name">by {image.postedBy}</span>
        </div>
      </div>
    )
  }

});

export default Photo;
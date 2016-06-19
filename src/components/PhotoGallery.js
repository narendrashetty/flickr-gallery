import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { normalizeImages } from '../utils/normalizer';
import { fitImagesInRow, getCumulativeWidth, processImages, buildRows } from '../utils/imageOptimizer';
import { TARGET_HEIGHT, MAX_WIDTH } from '../constants/image';
import shallowCompare from 'react-addons-shallow-compare';
import { VirtualScroll, WindowScroller } from 'react-virtualized';
import 'react-virtualized/styles.css';
import Photo from './Photo';

const PhotoGallery = React.createClass({

  getInitialState() {
    return {
      'isLoading': true,
      'rows': [],
      'tag': 'all'
    };
  },

  componentWillMount() {
    this.setup(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.setup(nextProps);
  },

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  },

  setup(props) {
    const isFetching = props.Photos.get('isFetching');
    this.setState({
      'isLoading': isFetching
    });
    if (!isFetching) {
      let photos = props.Photos.get('photos');

      const tag = props.location.query.tag;
      if (tag) {
        const tags = props.Tags.getIn(['tags', tag, 'value']);
        if (tags) {
          photos = tags.map(tag => photos.get(tag));
        }
      }
      const processedImages = processImages(photos);
      const rows = buildRows(processedImages);
      for(let i = 0; i < rows.length; i++) {
        rows[i] = fitImagesInRow(rows[i]);
        rows[i] = normalizeImages(rows[i]);

        const difference = (MAX_WIDTH - getCumulativeWidth(rows[i]));
        const amountOfImages = rows[i].length;

        if(amountOfImages > 1 && difference < 10) {
          const addToEach = difference / amountOfImages;
          for(let n = 0; n < rows[i].length; n++) {
            rows[i][n].width += addToEach;
          }

          rows[i] = normalizeImages(rows[i]);

          rows[i][rows[i].length - 1].width += (MAX_WIDTH - getCumulativeWidth(rows[i]));
        }
      }
      this.setState({
        rows,
        tag: tag || 'all'
      });
    }
  },

  renderLoading() {
    return (
      <div>Loading...</div>
    );
  },

  renderImageRow({index}) {
    const row = this.state.rows[index];
    return (
      <div className="image-row" style={{
        'display': 'flex'
      }}>
        {row.map((image) => {
          return (
            <Photo 
              key={image.id}
              image={image}
            />
          );
        })}
      </div>
    );
  },

  renderBody() {
    const rows = this.state.rows;
    return (
      <div style={{'paddingTop': '50px', 'boxSizing': 'border-box'}}>
        <WindowScroller>
          {({ height, scrollTop }) => (
            <VirtualScroll
              key={this.state.tag}
              width={MAX_WIDTH}
              height={height - 50}
              rowCount={rows.length}
              rowHeight={TARGET_HEIGHT}
              rowRenderer={this.renderImageRow}
              scrollTop={scrollTop}
            />
          )}
        </WindowScroller>
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
    'Photos': state.Photos,
    'Tags': state.Tags
  };
}

export default connect(mapStateToProps)(PhotoGallery);

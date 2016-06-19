import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

const TopBar = React.createClass({

  getInitialState() {
    return {
      'filterType': 'none',
      'showModal': false
    };
  },

  componentWillMount() {
    this.setup(this.props);  
  },

  componentWillReceiveProps(nextProps) {
    this.setup(nextProps);
  },

  setup(props) {
    const tag = props.location.query.tag;
    this.setState({
      'isFilter': !!tag
    });
  },

  showFilter(filterType) {
    this.setState({
      'showModal': true,
      filterType
    });
  },

  hideFilter() {
    this.setState({
      'showModal': false,
      'filterType': 'none'
    });
  },

  renderTagList() {
    if (this.state.showModal) {
      let tags = this.props.Tags.get(this.state.filterType).toArray().sort((a, b) => {
        return b.get('value').size - a.get('value').size;
      });
      return (
        <div className="tags__container">
          <div className="tags">
            {tags.map((tag) => {
              return (
                <Link to={{ pathname: '/', query: { tag: tag.get('key') } }} tagName="div" className="tag" onClick={this.hideFilter}>
                  <span className="tag__name">{tag.get('key')}</span>
                  <span className="tag__count">{tag.get('value').size}</span>
                </Link>
              );
            })}
          </div>
        </div>
      );
    }
  },

  render() {
    return (
      <div>
        <div className="topbar">
          <div className="topbar__container">
            <div className="topbar__title">
              Flickr Clone
            </div>
            <div className="filterHolder">
              {this.state.isFilter &&
                <Link to={{ pathname: '/' }} tagName="span" className="clearFilter">
                  clear filter
                </Link>
              }
              <div className="topbar__filter">
                <span onClick={() => this.showFilter('tags')}>Filter by Photo Tags</span>
                <span onClick={() => this.showFilter('titleTags')}>Filter by Title Tags</span>
              </div>
            </div>
          </div>
        </div>
        {this.renderTagList()}
      </div>
    );
  }

});

function mapStateToProps(state) {
  return {
    'Tags': state.Tags
  };
}

export default connect(mapStateToProps)(TopBar);
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

const TopBar = React.createClass({

  renderTagList() {
    let tags = this.props.Tags.get('tags').toArray().sort((a, b) => {
      return b.get('value').size - a.get('value').size;
    });
    return (
      <div className="tags__container">
        <div className="tags">
          {tags.map((tag) => {
            return (
              <Link to={{ pathname: '/', query: { tag: tag.get('key') } }} tagName="div" className="tag">
                <span className="tag__name">{tag.get('key')}</span>
                <span className="tag__count">{tag.get('value').size}</span>
              </Link>
            );
          })}
        </div>
      </div>
    );
  },

  render() {
    return (
      <div>
        <div className="topbar">
          <div className="topbar__container">
            <div className="topbar__title">
              Flickr Clone
            </div>
          </div>
        </div>
        {this.renderTagList()}
      </div>
    )
  }

});

function mapStateToProps(state) {
  return {
    'Tags': state.Tags
  };
}

export default connect(mapStateToProps)(TopBar);
import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'debounce';
import { hasReachedBottom } from '../utils/core';

const DEFAULT_OFFSET = 250;
const MINIMUM_OFFSET = 15;

const InfiniteScroll = React.createClass({

  getDefaultProps() {
    return {
      'isNewDataLoading': false,
      'hasMore': true,
      'fetchNewData': () => {}
    };
  },

  componentWillMount() {
    this.debouncedCheck = debounce(() => {
      this.checkIfNewDataNeedsToBeFetched();
    }, 50);
  },

  componentDidMount() {
    this.attachScrollListener();
  },

  componentDidUpdate() {
    this.checkIfNewDataNeedsToBeFetched();
  },

  componentWillUnmount() {
    this.detachScrollListener();
  },

  getParentEl() {
    return ReactDOM.findDOMNode(this).querySelector('.Grid');
  },

  hasReachedBottom() {
    const el = this.getParentEl();
    return hasReachedBottom(el, DEFAULT_OFFSET);
  },

  passedEdgeForInfiniteScroll() {
    if (!this.getParentEl()) {
      return false;
    }

    return this.hasReachedBottom();
  },

  checkIfNewDataNeedsToBeFetched() {
    if (this.passedEdgeForInfiniteScroll()
        && this.props.hasMore
        && !this.props.isNewDataLoading) {
      this.props.fetchNewData();
    }
  },

  scrollListener() {
    if (!this.props.isNewDataLoading) {
      this.debouncedCheck();
    }
  },

  attachScrollListener() {
    const parentEl = this.getParentEl();
    this.checkIfNewDataNeedsToBeFetched();
    if (!parentEl) {
      return;
    }
    parentEl.addEventListener('scroll', this.scrollListener);
  },

  detachScrollListener() {
    const parentEl = this.getParentEl();
    if (!parentEl) {
      return;
    }
    parentEl.removeEventListener('scroll', this.scrollListener);
  },

  render() {
    return (
      <div>
        {this.props.children}
        {(() => {
          if (this.props.isNewDataLoading) {
            return (
              <div className="js-loadingNextPage pageCenter">
                loading
              </div>
            );
          }
        })()}
      </div>
    );
  }

});

export default InfiniteScroll;

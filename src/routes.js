import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './containers/App';
import PhotoGallery from './components/PhotoGallery';

export default function() {
  return (
    <Router history={ hashHistory }>
      <Route path="/" component={App}>
      	<IndexRoute component={PhotoGallery} />
      </Route>
    </Router>
  );
}

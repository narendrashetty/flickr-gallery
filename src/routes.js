import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import App from './containers/App';

export default function() {
  return (
    <Router history={ hashHistory }>
      <Route path="/" component={App} />
    </Router>
  );
}

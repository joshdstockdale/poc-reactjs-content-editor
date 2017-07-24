/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Router, hashHistory} from 'react-router';
import routes from './routes';
import {Provider} from 'react-redux';
import {loadItems} from './actions/itemActions';
import {loadFolders} from './actions/folderActions';
import {loadTags} from './actions/tagActions';
import {loadTemplates} from './actions/templateActions';
import Foundation from 'react-foundation';
import './styles/styles.css';
import './styles/editor.css';

const store = configureStore();
store.dispatch(loadItems());
store.dispatch(loadFolders());
store.dispatch(loadTags());
store.dispatch(loadTemplates());

render(
  <Provider store={store} >
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
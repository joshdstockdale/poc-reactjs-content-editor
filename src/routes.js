import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Handler from './components/Handler';
import App from './components/App';

import TemplateModal from './components/modal/Template';
import FolderModal from './components/modal/Folder';
import TagModal from './components/modal/Tag';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Handler} />
    <Route path="settings/template/:id" component={TemplateModal} />
    <Route path="settings/folder/:id" component={FolderModal} />
  </Route>
);
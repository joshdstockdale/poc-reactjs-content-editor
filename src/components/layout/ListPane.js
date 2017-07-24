import React, {PropTypes} from 'react';
import ItemList from './list_views/itemList';
import FolderList from './list_views/folderList';
import TagList from './list_views/tagList';
import TemplateList from './list_views/templateList';

const ListPane = ({items, folders, tags, templates, clickEvents, activeContent}) => {
  function group(items, groupBy){
    if(groupBy === 'items'){
      return items;
    }
    const grouped = items.reduce(function(g, i) {
      let key = i.template === groupBy ? groupBy : '_';
      g[key] = g[key] || [];
      g[key].push(i);
      return g;
    }, {});
    return grouped[groupBy];
  }
  function getActiveView(activeContent){
    let groupedItems = [];
    groupedItems = group(items, activeContent);
    return (<ItemList items={groupedItems} onClick={clickEvents.itemClick} />);

  }
  return (
    <div className="listbar">
      {getActiveView(activeContent, items, folders, tags, templates, clickEvents)}
    </div>
  );
};
ListPane.propTypes = {
  items: React.PropTypes.array.isRequired,
  folders: React.PropTypes.array.isRequired,
  tags: React.PropTypes.array.isRequired,
  templates: React.PropTypes.array.isRequired,
  clickEvents: React.PropTypes.object.isRequired,
  activeContent: React.PropTypes.string.isRequired
};

export default ListPane;
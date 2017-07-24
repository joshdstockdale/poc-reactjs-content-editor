import React, {PropTypes} from 'react';

const SidePane = ({items, folders, tags, templates, onClick}) => {
  function getItemTypes(){
    let rTypes = [];
    templates.map((t) => {
      rTypes.push(<a key={t.id} data-id={t.id} onClick={onClick}>{t.label}</a>);
    });
    return rTypes;
  }
  return (
    <div className="sidebar">
      <a data-id="items" onClick={onClick}>All Items</a>
      {getItemTypes()}
      <a data-id="templates" onClick={onClick}>Templates</a>
      <a data-id="trash" onClick={onClick}>Trash</a>
    </div>
  );
};
SidePane.propTypes = {
  items: React.PropTypes.array.isRequired,
  folders: React.PropTypes.array.isRequired,
  tags: React.PropTypes.array.isRequired,
  templates: React.PropTypes.array.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default SidePane;
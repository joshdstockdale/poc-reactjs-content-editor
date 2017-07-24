import React, {PropTypes} from 'react';

const ItemList = ({items, onClick}) => {
  let counter = 0;
  function strip(html)
  {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent||tmp.innerText;
  }
  return (
    <div className="list-items">
      {items.map(x =>
        <div key={counter++} data-id={x.id} className={"item-list"} onClick={onClick}>
          <div className="item-title title">{x.title}</div>
          <div className="item-content content">{strip(x.content)}</div>
        </div>
      )}
    </div>
  );
};
ItemList.propTypes = {
  items: React.PropTypes.array.isRequired,
  onClick: React.PropTypes.func.isRequired

};

export default ItemList;
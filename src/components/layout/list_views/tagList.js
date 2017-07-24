import React, {PropTypes} from 'react';

const TagList = ({tags}) => {
  let counter = 0;
  return (
    <div className="list-tags">
      {tags.map(x =>
        <div key={counter++} data-id={x.id} className={"lycra-row  middle-xs"}>
          {x.name}
        </div>
      )}
    </div>
  );
};
TagList.propTypes = {
  tags: React.PropTypes.array.isRequired
};

export default TagList;
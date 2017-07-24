import React, {PropTypes} from 'react';

const FolderList = ({folders}) => {
  let counter = 0;
  return (
    <div className="list-folders">
      {folders.map(x =>
        <div key={counter++} data-id={x.id} className={"lycra-row  middle-xs"}>
          {x.name}
        </div>
      )}
    </div>
  );
};
FolderList.propTypes = {
  folders: React.PropTypes.array.isRequired
};

export default FolderList;
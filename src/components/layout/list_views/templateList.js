import React, {PropTypes} from 'react';

const TemplateList = ({templates}) => {
  let counter = 0;
  return (
    <div className="list-templates">
      {templates.map(x =>
        <div key={counter++} data-id={x.id} className={"lycra-row  middle-xs"}>
          {x.name}
        </div>
      )}
    </div>
  );
};
TemplateList.propTypes = {
  templates: React.PropTypes.array.isRequired
};

export default TemplateList;
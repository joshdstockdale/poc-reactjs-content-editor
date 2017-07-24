import React, {PropTypes} from 'react';

class SettingsEditor extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      isFlipped: false,
      updateItemSettings: props.updateItemSettings,
      testValue: ""
    };
    this.getItemMeta = this.getItemMeta.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  getItemMeta(activeItem){
    const itemMeta = activeItem.itemMeta;
    if(typeof itemMeta !== 'undefined'){
      //console.log(typeof itemMeta);
      // itemMeta.map(m =>
      //   console.log(m)
      // );
    }

    //<input type="text" value={this.state.testValue} onChange={this.handleChange} />

  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  //   itemMeta:{
  //     featuredImage: "./images/will.jpg",
  //     promoted: true,
  //     editedBy: ""
  //   },
  render(){
    return (
      <div className="Settings-root">
        <form>
          <label>Test:</label>
            {this.getItemMeta(this.props.activeItem)}
          </form>
      </div>
    );
  }
}

SettingsEditor.propTypes = {
  // items: React.PropTypes.array.isRequired,
  // folders: React.PropTypes.array.isRequired,
  // tags: React.PropTypes.array.isRequired,
  // templates: React.PropTypes.array.isRequired,
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  updateItemSettings: React.PropTypes.func.isRequired,
  activeItem: React.PropTypes.object
};


export default SettingsEditor;
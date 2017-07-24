import React, {PropTypes} from 'react';
import ContentEditor from './views/contentEditor';
import SettingsEditor from './views/settingsEditor';
import FlipCard from 'react-flipcard';

class ItemPane extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      isFlipped: false,
      activeItem: props.activeItem,
      clickEvents: props.clickEvents
    };
    this.updateItemState = this.updateItemState.bind(this);
    this.saveClick = this.saveClick.bind(this);
    this.showFront = this.showFront.bind(this);
    this.showBack = this.showBack.bind(this);
    this.getContentEditor = this.getContentEditor.bind(this);
    this.getSettingsEditor = this.getSettingsEditor.bind(this);
  }

  showBack() {
    this.setState({
      isFlipped: true
    });
  }

  showFront() {
    this.setState({
      isFlipped: false
    });
  }
  updateItemState(name, value){
    let item = Object.assign({},this.state.activeItem);
    item[name] = value;
    this.setState({
      activeItem: item
    });
  }
  getContentEditor(activeItem, clickEvents){
    if(typeof activeItem !== 'undefined'){
      if(typeof activeItem.content !== 'undefined'){
        return (<ContentEditor key={activeItem.id} activeItem={activeItem} updateItemState={this.updateItemState} uploadImage={clickEvents.uploadImage} />);
      }
    }
    return (<ContentEditor key={0} updateItemState={this.updateItemState} uploadImage={clickEvents.uploadImage} />);
  }
  getSettingsEditor(activeItem, clickEvents){
    if(typeof activeItem !== 'undefined'){
      if(typeof activeItem.content !== 'undefined'){

        return (<SettingsEditor key={activeItem.id} activeItem={activeItem} id={activeItem.id} updateItemSettings={clickEvents.updateItemSettings} />);
      }
    }
    return (<SettingsEditor key={0} activeItem={activeItem} id={0} updateItemSettings={clickEvents.updateItemSettings} />);
  }
  saveClick(){
    this.props.clickEvents.saveItemState(this.state.activeItem);
  }

  render(){
    const {activeItem} = this.state;
    const {clickEvents} = this.props;
    const tags = activeItem.tags;
    const dates = activeItem.dates;

    return (
      <div className="itembar">
        <FlipCard
            disabled={true}
            flipped={this.state.isFlipped}
            onFlip={this.handleOnFlip}
            onKeyDown={this.handleKeyDown} style={{}} >
            <div className="front">
              <button type="button" onClick={this.showBack}>Settings</button>
              &nbsp;|&nbsp;
              <button onClick={this.saveClick} data-id={activeItem.id}> Save </button><br />
              <input type="text" placeholder="Title" value={activeItem.title} name="title" onChange={this.updateItemState} /><br />
              {activeItem.path}<input type="text" placeholder="slug" /><br />
              <input type="text" placeholder="Template" /><br />
              <small>{(typeof tags !== 'undefined') ? tags.join(', ') : 'tags'}</small>
              &nbsp;|&nbsp;
              <small>{(typeof dates !== 'undefined') ? dates.updatedDate : ''}</small>
              {this.getContentEditor(activeItem, clickEvents)}
            </div>
            <div className="back">
              <button type="button" ref="backButton" onClick={this.showFront}>Editor</button>
              &nbsp;|&nbsp;
              <button onClick={clickEvents.updateItemSettings} data-id={activeItem.id}> Save </button><br />

              <input type="text" placeholder="Title" /><br />

              {this.getSettingsEditor(activeItem, clickEvents)}
            </div>
        </FlipCard>
      </div>
    );
  }
}

ItemPane.propTypes = {
  items: React.PropTypes.array.isRequired,
  folders: React.PropTypes.array.isRequired,
  tags: React.PropTypes.array.isRequired,
  templates: React.PropTypes.array.isRequired,
  clickEvents: React.PropTypes.object.isRequired,
  activeItem: React.PropTypes.object.isRequired
};


export default ItemPane;
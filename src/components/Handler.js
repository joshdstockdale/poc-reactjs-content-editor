import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ItemPane from './editor/ItemPane';
import ListPane from './layout/ListPane';
import SidePane from './layout/SidePane';

import * as itemActions from '../actions/itemActions';
import * as folderActions from '../actions/folderActions';
import * as tagActions from '../actions/tagActions';
import * as templateActions from '../actions/templateActions';

class Handler extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      items: props.items,
      folders: props.folders,
      tags: props.tags,
      templates: props.templates,
      activeContent: "items",
      activeItem: {id:0},
      saving: false
    };

    this.itemClick = this.itemClick.bind(this);
    this.folderClick = this.folderClick.bind(this);
    this.tagClick = this.tagClick.bind(this);
    this.templateClick = this.templateClick.bind(this);
    this.handleItemPaneClick = this.handleItemPaneClick.bind(this);

    this.success = this.success.bind(this);
    this.saveItemState = this.saveItemState.bind(this);
    this.updateItemSettings = this.updateItemSettings.bind(this);
    this.updateFolderState = this.updateFolderState.bind(this);
    this.saveFolder = this.saveFolder.bind(this);
    this.updateTagState = this.updateTagState.bind(this);
    this.saveTag = this.saveTag.bind(this);
    this.updateTemplateState = this.updateTemplateState.bind(this);
    this.saveTemplate = this.saveTemplate.bind(this);
  }

  saveItemState(item){
    this.setState({saving:true});
    //Save Item
    this.props.itemActions.saveItem(Object.assign({},this.state.items,item))
      .then(() => this.success(), console.log("Success"))
      .catch(error => {
        this.setState({saving: false});
        console.log(error);
      });
  }
  updateItemSettings(name, value){
    let item = Object.assign({},this.state.activeItem);
    item[name] = value;

    this.setState({saving:true});
    //Save Item
    this.props.itemActions.saveItem(Object.assign({},this.state.items,item))
      .then(() => this.success(), console.log("Success"))
      .catch(error => {
        this.setState({saving: false});
        console.log(error);
      });
  }

  updateFolderState(name, value){
    let folder = {};
    folder[name] = value;
    this.setState({folder:Object.assign({},this.state.folders,folder)});
  }
  saveFolder(e) {
    this.setState({saving:true});

    this.props.folderActions.saveFolder(this.state.folders)
      .then(() => this.success())
      .catch(error => {
        this.setState({saving: false});
        console.log(error);
      });
  }
  updateTagState(name, value){
    let tag = {};
    tag[name] = value;
    this.setState({tags:Object.assign({},this.state.tags,tag)});
  }
  saveTag(e) {
    this.setState({saving:true});

    this.props.tagActions.saveTag(this.state.tags)
      .then(() => this.success())
      .catch(error => {
        this.setState({saving: false});
        console.log(error);
      });
  }
  updateTemplateState(name, value){
    let template = {};
    template[name] = value;
    this.setState({templates:Object.assign({},this.state.templates,template)});
  }
  saveTemplate(e) {
    this.setState({saving:true});

    this.props.templateActions.saveTemplate(this.state.templates)
      .then(() => this.success())
      .catch(error => {
        this.setState({saving: false});
        console.log(error);
      });
  }
  success(){
    this.setState({saving:false});
    //TODO: Something not sure
  }
  handleItemPaneClick(e){
    const id = e.currentTarget.dataset.id;
    this.setState({activeContent: id});
  }
  itemClick(e){
    e.preventDefault();
    const itemId = e.currentTarget.dataset.id;
    const item = this.props.items.filter(item => item.id == itemId);
    this.setState({activeItem: item[0]});
  }
  folderClick(e){
    const folderId = e.currentTarget.dataset.id;
    const folder = this.props.folders.filter(folder => folder.id == folderId);

    this.setState({activeItem: folder[0]});
  }
  tagClick(e){
    const tagId = e.currentTarget.dataset.id;
    const tag = this.props.tags.filter(tag => tag.id == tagId);

    this.setState({activeItem: tag[0]});
  }
  templateClick(e){
    const templateId = e.currentTarget.dataset.id;
    const template = this.props.templates.filter(template => template.id == templateId);

    this.setState({activeItem: template[0]});
  }
  render() {
    const {items} = this.props;
    const {folders} = this.props;
    const {tags} = this.props;
    const {templates} = this.props;
    const {activeContent} = this.state;
    const {activeItem} = this.state;

    const listBarClickEvents = {
      "itemClick":this.itemClick,
      "folderClick":this.folderClick,
      "tagClick":this.tagClick,
      "templateClick":this.templateClick
    };
    const editorClickEvents = {
      "saveItemState":this.saveItemState,
      "updateItemSettings":this.updateItemSettings,
      "uploadImage": this.props.itemActions.uploadImage
    };

    return (
      <div className="content-wrapper">
        <SidePane items={items} folders={folders} tags={tags} templates={templates} onClick={this.handleItemPaneClick} />
        <ListPane items={items} folders={folders} tags={tags} templates={templates} activeContent={activeContent} clickEvents={listBarClickEvents} />
        <ItemPane key={activeItem.id} items={items} folders={folders} tags={tags} templates={templates} activeItem={activeItem} id={activeItem.id} clickEvents={editorClickEvents} />
      </div>
    );
  }
}

Handler.contextTypes = {
  router: React.PropTypes.object
};
Handler.propTypes = {
  itemActions: React.PropTypes.object.isRequired,
  items: React.PropTypes.array.isRequired,
  folderActions: React.PropTypes.object.isRequired,
  folders: React.PropTypes.array.isRequired,
  tagActions: React.PropTypes.object.isRequired,
  tags: React.PropTypes.array.isRequired,
  templateActions: React.PropTypes.object.isRequired,
  templates: React.PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){
  return {
    items: state.items,
    folders: state.folders,
    tags: state.tags,
    templates: state.templates
  };
}
function mapDispatchToProps(dispatch){
  return {
    itemActions: bindActionCreators(itemActions, dispatch),
    folderActions: bindActionCreators(folderActions, dispatch),
    tagActions: bindActionCreators(tagActions, dispatch),
    templateActions: bindActionCreators(templateActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Handler);


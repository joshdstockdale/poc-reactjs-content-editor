import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import ReactCrop from 'react-image-crop';

import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../../../node_modules/react-image-crop/dist/ReactCrop.css';

class contentEditor extends React.Component {
  constructor(props) {
    super(props);
    if(typeof props.activeItem !== 'undefined'){
      if(typeof props.activeItem.content !== 'undefined'){
        const editorState = EditorState.createWithContent(stateFromHTML(props.activeItem.content));
        this.state = {
          editorState: editorState,
          uploadImage: props.uploadImage,
          loadFlag: false
        };
      }
    }else{
      const editorState = EditorState.createEmpty();
      this.state = {
        editorState: editorState,
        uploadImage: props.uploadImage,
        loadFlag: false
      };
    }
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.uploadCallback = this.uploadCallback.bind(this);
  }
  onEditorStateChange(editorState){
    this.setState({
      editorState,
    });
    //const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
    const html = stateToHTML(this.state.editorState.getCurrentContent());
    this.props.updateItemState('content', html);
  }
  uploadCallback(file) {
    // First upload image to server
    this.props.uploadImage(file)
      .then(() => this.cropImage(file))
      .catch(error => {
        console.log(error);
      });
  }
  cropImage(file){
    //Crop Image Options
    console.log("success");
    console.log(file);
    return (<ReactCrop src={file.name} />);
  }
  render() {
    const {editorState} = this.state;

      return (
        <div className="RichEditor-root">
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker','image','link', 'embedded','remove', 'history'], inline: {inDropdown: true}, list: {inDropdown: true}, textAlign: {inDropdown: true}, image: { uploadCallback: this.uploadCallback }}
            }
          />
        </div>
      );
    }
  }

contentEditor.propTypes = {
  editorState: React.PropTypes.object,
  activeItem: React.PropTypes.object,
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  updateItemState: React.PropTypes.func.isRequired,
  uploadImage: React.PropTypes.func.isRequired
};

export default contentEditor;
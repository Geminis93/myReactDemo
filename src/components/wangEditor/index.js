import React, { Component } from 'react'
import WangEditor from 'wangeditor';
// 引入编辑器以及EditorState子模块
import BraftEditor, { EditorState } from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './index.scss';

class DemoWangEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createFrom('htmlContent')
    }
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  submitContent = () => {
    console.log('submitContent --- ', this.state.editorState.toHTML());
  }

  componentDidMount() {
    const editor = new WangEditor('#editor');
    editor.create();
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className="wang-editor">
        <h3 style={{ 'marginBottom': '32px', }}>wangeditor 富文本编辑器</h3>
        <div id="editor" />
        <h3 style={{ 'margin': '32px 0', }}>Braft Editor 基于draft-js的Web富文本编辑器</h3>
        <div className="wang-editor-two">
          <BraftEditor
            value={editorState}
            onChange={this.handleEditorChange}
            onSave={this.submitContent}
          />
        </div>
      </div>
    );
  }
};

export default DemoWangEditor;
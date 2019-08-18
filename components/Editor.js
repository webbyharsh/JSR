import React, { Component } from 'react';
import ReactQuill from 'react-quill'
import Button from 'react-bootstrap/Button'
import firebase from '../config/firebaseConfig'
import 'firebase/firestore'

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '', theme: 'snow' }
    this.handleChange = this.handleChange.bind(this)
    this.submitOpinion = this.submitOpinion.bind(this)
  }
  handleChange(value) {
    this.setState({ text: value })
  }
  submitOpinion() {
    this.setState({ text: '' })
    let date = new Date()
    let response = this.state.text
    let photoURL = this.props.photoURL
    let seconds = Math.floor(date.getTime() / 1000);
    let authorName = this.props.authorName
    let likes = 0
    let uid = this.props.uid
    let saying = this.props.name
    firebase.firestore().collection('sayings').doc(saying)
      .collection('responses')
      .add({
        response: response,
        date: { seconds: seconds },
        photoURL: photoURL,
        likes: likes,
        uid: uid,
        authorName: authorName,
        liked_by:[]
      })
      .then(() => { })
    firebase.firestore().collection('sayings').doc(saying).update({
      responses_added: parseInt(this.props.responsesAdded + 1)
    })
      .then(() => { window.location.reload() })

  }
  render() {
    return (
      <div>
        <ReactQuill
          onChange={this.handleChange}
          value={this.state.text}
          modules={Editor.modules}
          formats={Editor.formats}
          placeholder="Write Your valuable Opinion "
        />
        <Button onClick={this.submitOpinion} variant="success">Add my opinion as {this.props.authorName}</Button>
      </div>);
  }
}
Editor.modules = {
  toolbar: [
    [{ 'font': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export default Editor;
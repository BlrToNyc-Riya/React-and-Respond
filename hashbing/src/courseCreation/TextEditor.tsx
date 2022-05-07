import { Component, createRef, Dispatch, SetStateAction } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Width, Float, Height, ImageWithStyle } from './ImageWithStyle'

Quill.register('formats/float', Float)
Quill.register('formats/height', Height)
Quill.register('formats/width', Width)
Quill.register('formats/image', ImageWithStyle, true)

type EditorPropsType = {
  updateDocument: Dispatch<SetStateAction<string>>
}
class Editor extends Component<EditorPropsType, {}> {
  private reactQuillRef: React.RefObject<HTMLInputElement | null>
  public quillRef: React.RefObject<HTMLInputElement | null> | null
  constructor (props: EditorPropsType) {
    super(props)
    this.reactQuillRef = createRef()
    this.state = { editorHtml: '' }
    this.quillRef = null
  }

  componentDidMount () {
    this.registerFormat()
  }

  componentDidUpdate () {
    this.registerFormat()
  }

  registerFormat () {
    if (!this.reactQuillRef) return
    if (typeof this.reactQuillRef.getEditor !== 'function') return
    if (this.quillRef != null) return
    const quillRef = this.reactQuillRef.getEditor() // could still be null
    if (quillRef != null) {
      this.quillRef = quillRef
      let range = this.quillRef.getSelection()
      console.log(range)
    }
  }

  addImage = () => {
    let range = this.quillRef.getSelection()
    if (!range) {
      return
    }
    console.log('Adding image')
    this.quillRef.insertEmbed(range.index + 1, 'image', {
      src:
        'https://images.unsplash.com/photo-1508614999368-9260051292e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNTMxNTJ8MHwxfHNlYXJjaHw1fHxncmFkaWVudHxlbnwwfDB8fHwxNjM1MTU5MDY4&ixlib=rb-1.2.1&q=80&w=1080',
      caption: 'Image caption'
    })
  }

  render () {
    const { updateDocument } = this.props
    return (
      <>
        <ReactQuill
          ref={this.reactQuillRef}
          value={this.state.editorHtml}
          onChange={value => {
            this.setState({ editorHtml: value })
            updateDocument(value)
          }}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={'#root'}
          placeholder='Write something'
        />
      </>
    )
  }
}

Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
  // imageResize: {
  //   parchment: Quill.import('parchment'),
  //   modules: ['Resize', 'DisplaySize']
  // }
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
]

export default Editor

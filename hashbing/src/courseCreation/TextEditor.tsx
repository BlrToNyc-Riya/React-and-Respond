import { Component, createRef, Dispatch, SetStateAction } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
// import { Width, Float, Height, ImageWithStyle } from './ImageWithStyle'
import classNames from 'classNames'
import hljs from 'highlight.js'
import ImageCompress from 'quill-image-compress'
import { Video } from '../Components/Utilities/quill-video-resize.js'
import('../Components/Utilities/quill-video-resize.css')

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'rust']
})

// Quill.register('formats/float', Float)
// Quill.register('formats/height', Height)
// Quill.register('formats/width', Width)
// Quill.register('formats/image', ImageWithStyle, true)
Quill.register('modules/imageCompress', ImageCompress)
Quill.register({ 'formats/video': Video })

type EditorPropsType = {
  updateDocument: Dispatch<SetStateAction<string>>
  className: string
}
class TextEditor extends Component<EditorPropsType, {}> {
  private reactQuillRef: React.ClassAttributes<ReactQuill>
  public quillRef: React.ClassAttributes<ReactQuill>
  constructor (props: EditorPropsType) {
    super(props)
    this.reactQuillRef = createRef()
    this.state = { editorHtml: '' }
    this.quillRef = null
  }

  componentDidMount () {
    this.registerFormat()
    window.addEventListener('beforeunload', function (event) {
      event.returnValue = ''
    })
  }

  componentWillUnmount () {
    window.removeEventListener('beforeunload', function (event) {
      if (this.state.editorHtml.length > 0) event.returnValue = ''
    })
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

  render () {
    const { updateDocument, className } = this.props
    return (
      <div className={classNames(className)}>
        <ReactQuill
          ref={this.reactQuillRef}
          value={this.state.editorHtml}
          onChange={value => {
            this.setState({ editorHtml: value })
            updateDocument(value)
          }}
          modules={modules}
          formats={formats}
          bounds={'#root'}
          placeholder='Write something'
        />
      </div>
    )
  }
}

const modules = {
  // VideoResize: {
  //   modules: ['Resize', 'DisplaySize', 'Toolbar']
  // },
  imageCompress: {
    quality: 0.7, // default
    maxWidth: 1000, // default
    maxHeight: 1000, // default
    imageType: 'image/jpeg', // default
    debug: true, // default
    suppressErrorLogging: false // default
  },
  syntax: {
    highlight: text => hljs.highlightAuto(text).value
  },
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
    ['link', 'image', 'video', 'code-block'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
}

const formats = [
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
  'video',
  'code-block'
]

export default TextEditor

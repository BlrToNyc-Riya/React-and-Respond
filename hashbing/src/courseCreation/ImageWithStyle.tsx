import { Quill } from 'react-quill'

const Image = Quill.import('formats/image')
const Parchment = Quill.import('parchment')
export const DEFAULT_IMAGE_ALT = 'Image'

const Float = new Parchment.Attributor.Style('float', 'float', {
  scope: Parchment.Scope.INLINE_BLOT,
  whitelist: ['left', 'right', 'center']
})

const Height = new Parchment.Attributor.Style('height', 'height', {
  scope: Parchment.Scope.INLINE_BLOT
})

const Width = new Parchment.Attributor.Style('width', 'width', {
  scope: Parchment.Scope.INLINE_BLOT
})

class ImageWithStyle extends Image {
  static whitelist = ['float', 'height', 'width']
  static valueWhitelist = {
    float: ['left', 'right']
  }

  static create (value) {
    let node = super.create()
    node.setAttribute('data-align', 'center')

    if (typeof value === 'object') {
      value.src = value.src ? value.src : value['data-src']
    }

    node.setAttribute('contenteditable', 'false')

    let originalSrc = value.src ? value.src : value

    let image = document.createElement('img')
    image.classList.add('lazyload')
    image.setAttribute('alt', value?.alt || DEFAULT_IMAGE_ALT)
    image.setAttribute('src', originalSrc)

    let captionLabel = document.createElement('label')
    captionLabel.innerHTML = value.caption ? value.caption : 'Image caption'

    captionLabel.setAttribute('name', 'image_caption')
    captionLabel.setAttribute('id', 'image_caption')
    captionLabel.setAttribute(
      'style',
      ' color:#757575; cursor:pointer;font-size:18px; '
    )

    node.appendChild(image)
    // node.appendChild(captionLabel)

    return node
  }

  static formats (domNode) {
    // img attributes (width, height, etc)
    let labelNode = domNode.querySelector('label')
    let imgNode = domNode.querySelector('img')
    if (
      document.getElementsByClassName('ql-editor').length > 0 &&
      document
        .getElementsByClassName('ql-editor')[0]
        .getAttribute('contenteditable') === 'false' &&
      labelNode.innerHTML === 'Image caption'
    ) {
      labelNode.style.display = 'none'
    }
    const inherited = Image.formats(imgNode)
    // CSS styles (float, etc)
    const local = this.whitelist.reduce((formats, style) => {
      const value = domNode.style[style]
      if (
        value &&
        this.valueWhitelist[style] &&
        this.valueWhitelist[style].indexOf(value) >= 0
      )
        formats[style] = value
      return formats
    }, {})
    const formats = Object.assign({}, inherited, local)
    formats.caption = labelNode ? labelNode.innerHTML : ''
    return formats
  }

  format (name, value) {
    let imageNode = this.domNode.querySelector('img')
    if (ImageWithStyle.whitelist.indexOf(name) >= 0) {
      if (value) {
        imageNode.setAttribute(name, value)
      }
    } else super.format(name, value)
  }
  static value (domNode) {
    let imageNode = domNode.querySelector('img')
    let labelNode = domNode.querySelector('label')

    let captionText =
      labelNode && labelNode.innerHTML !== 'Image caption'
        ? labelNode.innerHTML
        : ''

    return {
      src: imageNode.getAttribute('src'),
      width: imageNode.getAttribute('width'),
      height: imageNode.getAttribute('height'),
      caption: captionText
    }
  }
}

ImageWithStyle.tagName = 'div'
ImageWithStyle.blotName = 'image'
ImageWithStyle.className = 'quill-upload-image'
export { Float, Width, Height, ImageWithStyle }

import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Image,
  Code,
  FormatAlignCenter,
  InsertLink,
  FormatQuote
} from '@mui/icons-material'
import React from 'react'

type Props = {
  src: string
}

const renderIcon = (src: string) => {
  switch (src) {
    case 'bold':
      return <FormatBold color='primary' />
    case 'italic':
      return <FormatItalic color='primary' />
    case 'underline':
      return <FormatUnderlined color='primary' />
    case 'link':
      return <InsertLink color='primary' />
    case 'image':
      return <Image color='primary' />
    case 'code':
      return <Code color='primary' />
    case 'quote':
      return <FormatQuote color='primary' />
    case 'indent':
      return <FormatAlignCenter color='primary' />
    case 'outdent':
      return <FormatAlignCenter color='primary' />
    case 'embed':
      return <div>External Link</div>
    case 'h1':
      return <div>h1</div>
    case 'h2':
      return <div>h2</div>
    case 'h3':
      return <div>h3</div>
    case 'h4':
      return <div>h4</div>
    default:
      return <span></span>
  }
}

function Icons ({ src }: Props) {
  return <div>{renderIcon(src)}</div>
}

export default Icons

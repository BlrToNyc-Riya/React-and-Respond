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
      return <FormatBold />
    case 'italic':
      return <FormatItalic />
    case 'underline':
      return <FormatUnderlined />
    case 'link':
      return <InsertLink />
    case 'image':
      return <Image />
    case 'code':
      return <Code />
    case 'quote':
      return <FormatQuote />
    case 'indent':
      return <FormatAlignCenter />
    case 'outdent':
      return <FormatAlignCenter />
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

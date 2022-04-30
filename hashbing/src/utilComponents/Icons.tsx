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
    default:
      return <span></span>
  }
}

function Icons ({ src }: Props) {
  return <div>{renderIcon(src)}</div>
}

export default Icons

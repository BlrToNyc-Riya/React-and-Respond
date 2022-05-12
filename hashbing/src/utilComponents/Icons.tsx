import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Image,
  Code,
  FormatAlignCenter,
  InsertLink,
  FormatQuote,
  Add,
  Remove,
  HighlightOff
} from '@mui/icons-material'
import React from 'react'

type Props = {
  src: string
  onClick?: () => void | null | JSX.Element
}

function Icons ({ src, onClick }: Props) {
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
      case 'add':
        return (
          <Add
            color='primary'
            onClick={() => {
              console.log('event clicked')
              onClick && onClick()
            }}
          />
        )
      case 'remove':
        return (
          <HighlightOff color='primary' onClick={() => onClick && onClick()} />
        )
      default:
        return <span></span>
    }
  }

  return <div>{renderIcon(src)}</div>
}

export default Icons

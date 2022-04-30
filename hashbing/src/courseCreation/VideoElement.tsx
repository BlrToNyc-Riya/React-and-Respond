import React from 'react'
import { Transforms, Element as SlateElement } from 'slate'
import { useSlateStatic, ReactEditor } from 'slate-react'

const VideoElement = ({ attributes, children, element }) => {
  const editor = useSlateStatic()
  const { url } = element
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <div
          style={{
            padding: '75% 0 0 0',
            position: 'relative'
          }}
        >
          <iframe
            src={`${url}?title=0&byline=0&portrait=0`}
            frameBorder='0'
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%'
            }}
          />
        </div>
        <UrlInput
          url={url}
          onChange={val => {
            const path = ReactEditor.findPath(editor, element)
            const newProperties: Partial<SlateElement> = {
              url: val
            }
            Transforms.setNodes<SlateElement>(editor, newProperties, {
              at: path
            })
          }}
        />
      </div>
      {children}
    </div>
  )
}

const UrlInput = ({
  url,
  onChange
}: {
  url: string
  onChange: (val: string) => void
}) => {
  const [value, setValue] = React.useState(url)
  return (
    <input
      value={value}
      onClick={e => e.stopPropagation()}
      style={{
        marginTop: '5px',
        boxSizing: 'border-box'
      }}
      onChange={e => {
        const newUrl = e.target.value
        setValue(newUrl)
        onChange(newUrl)
      }}
    />
  )
}
export default VideoElement

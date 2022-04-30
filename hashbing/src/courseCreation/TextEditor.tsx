import React, { useMemo } from 'react'
import { createEditor, Descendant, BaseEditor, Editor } from 'slate'
import { Slate, Editable, ReactEditor, withReact, useSlate } from 'slate-react'
import { HistoryEditor, withHistory } from 'slate-history'
import { CustomElement, CustomText, EditorType } from './TextEditor.types'
import Icons from '../utilComponents/Icons'
import Button from '../Components/Button'
import Buttons from '../utilComponents/Buttons'

type Props = {}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }]
  }
  // {
  //   type: 'iframe',
  //   url: '',
  //   children: [{ text: '' }]
  // }
]

const TextEditor = (props: Props) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  return (
    <Slate editor={editor} value={initialValue}>
      <>
        <MarkButton format='bold' icon='bold' />
        <MarkButton format='italic' icon='italic' />
        <MarkButton format='underline' icon='underline' />
        <MarkButton format='code' icon='code' />

        {/* <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" /> */}
      </>
      <Editable
        // readOnly
        placeholder='Enter some text...'
        renderElement={({ element, attributes, children }) => {
          console.log('element', element.type)
          switch (element.type) {
            case 'bold':
              return <strong {...attributes}>{children}</strong>
            case 'italic':
              return <em {...attributes}>{children}</em>
            case 'code':
              console.log('here rendering code')
              return (
                <pre className='bg-slate-500' {...attributes}>
                  {children}
                </pre>
              )
            case 'iframe':
              return (
                <iframe
                  frameBorder='0'
                  width='100%'
                  height='500px'
                  src='https://replit.com/@ritza/demo-embed?embed=true'
                ></iframe>
              )
            case 'link':
              return (
                <a href={element.url} {...attributes} className='bg-lime-50'>
                  {children}
                </a>
              )
            default:
              return <div {...attributes}>{children}</div>
          }
        }}
        renderLeaf={({ leaf, attributes, children }) => {
          console.log('leaf', leaf)
          if (leaf.bold) {
            children = (
              <span className='font-bold' {...attributes}>
                {children}
              </span>
            )
          }
          if (leaf.italic) {
            children = (
              <span className='italic' {...attributes}>
                {children}
              </span>
            )
          }
          if (leaf.code) {
            console.log('here rendering code')
            children = (
              <pre>
                <code className=' language-python' {...attributes}>
                  {children}
                </code>
              </pre>
            )
            return children
          }
          if (leaf.underline) {
            children = (
              <span className='underline' {...attributes}>
                {children}
              </span>
            )
          }

          return <span {...attributes}>{children}</span>
        }}
      />
    </Slate>
  )
}

const toggleMark = (editor: EditorType, format: string) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isMarkActive = (editor: EditorType, format: string) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Buttons
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icons src={icon} />
    </Buttons>
  )
}

export default TextEditor

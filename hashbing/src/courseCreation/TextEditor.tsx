import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  createEditor,
  Descendant,
  BaseEditor,
  Editor,
  Transforms,
  BaseSelection
} from 'slate'
import { Slate, Editable, ReactEditor, withReact, useSlate } from 'slate-react'
import { HistoryEditor, withHistory } from 'slate-history'
import {
  CustomElement,
  CustomText,
  EditorType,
  InlineText
} from './TextEditor.types'
import Icons from '../utilComponents/Icons'
import Button from '../Components/Button'
import Buttons from '../utilComponents/Buttons'
import VideoElement from './VideoElement'
import { Toolbar } from './ToolBar'
import { useEditorConfig } from './TextEditor.hooks'
import {
  ExampleDocument,
  getActiveStyles,
  isLinkNodeSelection,
  toggleStyle
} from './TextEditor.utils'
import MarkButton from './MarkButton'
import LinkPopOver from './LinkPopOver'
import useSelection from './Selection.hooks'

type Props = {}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: InlineText
  }
}

const initialValue: Descendant[] = [
  {
    type: 'image',
    url:
      'https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg',
    caption: 'Puppy',
    // empty text node as child for the Void element.
    children: [{ text: '' }]
  }
]

const withEmbeds = (editor: BaseEditor & ReactEditor & HistoryEditor) => {
  const { isVoid } = editor

  editor.isVoid = element =>
    element.type === 'iframe' || element.type === 'image'
      ? true
      : isVoid(element)

  editor.insertData = (data: DataTransfer) => {
    const text = data.getData('text/plain')
    if (text) {
      editor.insertData(data)
    }
  }
  return editor
}

const TextEditor = (props: Props) => {
  const editor = useMemo(() => withEmbeds(withReact(createEditor())), [])
  const editorRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(initialValue)
  const { renderElement, renderLeaf, onKeyDown } = useEditorConfig(editor)
  const [previousSelection, selection, setSelection] = useSelection(editor)

  let selectionForLink = null
  if (isLinkNodeSelection(editor, selection)) {
    selectionForLink = selection
  } else if (
    selection == null &&
    isLinkNodeSelection(editor, previousSelection)
  ) {
    selectionForLink = previousSelection
  }
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  const onChangeHandler = useCallback(
    (document: Descendant[]) => {
      setValue(document)
      setSelection(editor.selection)
    },
    [editor.selection, setSelection]
  )

  return (
    <Slate editor={editor} value={ExampleDocument} onChange={onChangeHandler}>
      <Toolbar selection={selection}>
        <MarkButton format='h1' icon='h1' />
        <MarkButton format='h2' icon='h2' />
        <MarkButton format='h3' icon='h3' />
        <MarkButton format='h4' icon='h4' />
        <MarkButton format='bold' icon='bold' />
        <MarkButton format='italic' icon='italic' />
        <MarkButton format='underline' icon='underline' />
        <MarkButton format='link' icon='link' />
        <MarkButton format='code' icon='code' />
        <MarkButton format='iframe' icon='embed' />
      </Toolbar>
      <div className='editor' ref={editorRef}>
        {selectionForLink != null ? (
          <LinkPopOver
            editorOffsets={
              editorRef.current != null
                ? {
                    x: editorRef.current.getBoundingClientRect().x,
                    y: editorRef.current.getBoundingClientRect().y
                  }
                : null
            }
            selectionForLink={selection}
          />
        ) : null}
        <Editable
          // readOnly
          placeholder='Create your course'
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
        />
      </div>
    </Slate>
  )
}

export default TextEditor

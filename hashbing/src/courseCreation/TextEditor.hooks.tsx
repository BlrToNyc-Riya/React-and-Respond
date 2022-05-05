import isHotkey from 'is-hotkey'
import _ from 'lodash'
import { useCallback, useState } from 'react'
import { BaseEditor, BaseSelection } from 'slate'
import { DefaultElement, ReactEditor } from 'slate-react'
import { CustomElement, CustomText, EditorType } from './TextEditor.types'
import { toggleStyle } from './TextEditor.utils'
import Image from './Image'

export function useEditorConfig (editor: EditorType) {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => KeyBindings.onKeyDown(editor, event),
    [editor]
  )

  editor.isInline = element => {
    return (
      element.type === 'link' ||
      element.type === 'image' ||
      element.type === 'h1' ||
      element.type === 'h2' ||
      element.type === 'h3' ||
      element.type === 'h4' ||
      element.type === 'iframe'
    )
  }

  return { renderElement, renderLeaf, onKeyDown }
}

function renderElement (props: {
  element: CustomElement
  children: CustomText[]
  attributes: any
}) {
  const { element, children, attributes } = props
  switch (element.type) {
    case 'image':
      console.log('renderElement', element)
      return (
        <Image attributes={attributes} element={element}>
          {children}
        </Image>
      )
    case 'paragraph':
      return <p {...attributes}>{children}</p>
    case 'h1':
      return <h1 {...attributes}>{children}</h1>
    case 'h2':
      return <h2 {...attributes}>{children}</h2>
    case 'h3':
      return <h3 {...attributes}>{children}</h3>
    case 'h4':
      return <h4 {...attributes}>{children}</h4>
    case 'link':
      return (
        <a {...attributes} href={element.url} className='link'>
          {children}
        </a>
      )
    default:
      // For the default case, we delegate to Slate's default rendering.
      return <DefaultElement {...props} />
  }
}

function renderLeaf ({
  attributes,
  children,
  leaf
}: {
  leaf: CustomText
  children: CustomText[]
  attributes: any
}) {
  let el = <>{children}</>

  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  const isUrl = urlRegex.test(leaf.text)
  if (isUrl) {
    el = (
      <a href={leaf.text} className='link'>
        {el}
      </a>
    )
  }

  if (leaf.h1) {
    el = (
      <p {...attributes} className='text-xl inline'>
        {el}
      </p>
    )
  }

  if (leaf.h2) {
    el = (
      <p {...attributes} className='text-lg inline'>
        {el}
      </p>
    )
  }

  if (leaf.h3) {
    el = (
      <p {...attributes} className='text-base inline'>
        {el}
      </p>
    )
  }

  if (leaf.h4) {
    el = (
      <p {...attributes} className='text-sm inline'>
        {el}
      </p>
    )
  }

  if (leaf.bold) {
    el = <strong>{el}</strong>
  }

  if (leaf.code) {
    el = (
      <pre>
        <code className='bg-slate-500 text-white'>{el}</code>
      </pre>
    )
  }

  if (leaf.italic) {
    el = <em>{el}</em>
  }

  if (leaf.underline) {
    el = <u>{el}</u>
  }

  if (leaf.link) {
    el = (
      <a {...attributes} href={leaf.text} className='link'>
        {children}
      </a>
    )
  }

  return <span {...attributes}>{el}</span>
}

export function useSelection (editor: EditorType) {
  const [selection, setSelection] = useState<BaseSelection>(editor.selection)
  const setSelectionOptimized = useCallback(
    (newSelection: BaseSelection) => {
      // don't update the component state if selection hasn't changed.
      // check if selection is the same as the current selection using lodash

      if (_.isEqual(selection, newSelection)) {
        return
      }
      setSelection(newSelection)
    },
    [setSelection, selection]
  )

  return [selection, setSelectionOptimized]
}

const KeyBindings = {
  onKeyDown: (editor: EditorType, event: KeyboardEvent) => {
    if (isHotkey('mod+b', event)) {
      toggleStyle(editor, 'bold')
      return
    }
    if (isHotkey('mod+i', event)) {
      toggleStyle(editor, 'italic')
      return
    }
    if (isHotkey('mod+c', event)) {
      toggleStyle(editor, 'code')
      return
    }
    if (isHotkey('mod+u', event)) {
      toggleStyle(editor, 'underline')
      return
    }
  }
}

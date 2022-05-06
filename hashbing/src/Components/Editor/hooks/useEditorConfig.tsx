import { DefaultElement } from 'slate-react'
import Image from '../Image'
import Link from '../Link'
import LinkEditor from '../LinkEditor'
import React from 'react'
import StyledText from '../StyledText'
import isHotkey from 'is-hotkey'
import { toggleStyle } from '../utils/EditorUtils'
import {
  CustomElement,
  CustomText,
  EditorType
} from '../../../courseCreation/TextEditor.types'

export default function useEditorConfig (editor: EditorType) {
  const { isVoid } = editor
  editor.isVoid = element => {
    return ['image'].includes(element.type) || isVoid(element)
  }

  editor.isInline = element => ['link'].includes(element.type)

  return { renderElement, renderLeaf, KeyBindings }
}

function renderElement (props: {
  element: CustomElement
  children: CustomText[]
  attributes: any
}) {
  const { element, children, attributes } = props
  switch (element.type) {
    case 'image':
      return <Image {...props} />
    case 'paragraph':
      return (
        <p {...attributes} content-editable={'true'}>
          {children}
        </p>
      )
    case 'h1':
      return (
        <h1 {...attributes} content-editable={'true'}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 {...attributes} content-editable={'true'}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 {...attributes} content-editable={'true'}>
          {children}
        </h3>
      )
    case 'h4':
      return (
        <h4 {...attributes} content-editable={'true'}>
          {children}
        </h4>
      )
    case 'link':
      return <Link {...props} url={element.url} />
    case 'link-editor':
      return <LinkEditor {...props} />
    default:
      return <DefaultElement {...props} />
  }
}

function renderLeaf (props: { leaf: CustomText; attributes: any }) {
  return <StyledText {...props} />
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

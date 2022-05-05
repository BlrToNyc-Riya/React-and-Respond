import React from 'react'
import { CustomText, EditorType } from './TextEditor.types'
import { BaseSelection, Descendant, Element } from 'slate'
import { Editor } from 'slate'

export function getActiveStyles (editor: EditorType) {
  return new Set(Object.keys(Editor.marks(editor) ?? {}))
}

export function toggleStyle (editor: EditorType, style: string) {
  const activeStyles = getActiveStyles(editor)
  if (activeStyles.has(style)) {
    Editor.removeMark(editor, style)
  } else if ([...activeStyles].some(style => style.startsWith('h'))) {
    Editor.removeMark(editor, 'h1')
    Editor.removeMark(editor, 'h2')
    Editor.removeMark(editor, 'h3')
    Editor.removeMark(editor, 'h4')
    Editor.addMark(editor, style, true)
  } else {
    Editor.addMark(editor, style, true)
  }
}

export const isLinkNodeSelection = (
  editor: EditorType,
  selection: BaseSelection
) => {
  if (selection == null) {
    return false
  }

  return (
    Editor.above(editor, {
      at: selection,
      match: (n: Descendant) => n.type === 'link'
    }) != null
  )
}

export const ExampleDocument: Descendant[] = [
  {
    type: 'h1',
    children: [{ text: 'Document Title (Heading H1)' }]
  },
  {
    type: 'h2',
    children: [{ text: 'Subtitle (Heading H2)' }]
  },

  {
    type: 'image',
    url:
      'https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg',
    caption: 'Puppy',
    children: [{ text: '' }]
  },
  {
    type: 'h3',
    children: [{ text: 'Section Title (Heading H3)' }]
  },
  {
    type: 'h4',
    children: [{ text: 'Section subtitle (Heading H4)' }]
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Cras maximus auctor congue. Sed ultrices elit quis tortor ornare, non gravida turpis feugiat. Morbi facilisis sodales sem quis feugiat. Vestibulum non urna lobortis, semper metus in, condimentum ex. Quisque est justo, egestas sit amet sem ac, auctor ultricies lacus. Pellentesque lorem justo, rhoncus ut magna sit amet, rhoncus posuere libero.'
      }
    ]
  }
]

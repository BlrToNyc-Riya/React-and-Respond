import { BaseSelection, Editor, Range, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import Buttons from '../utilComponents/Buttons'
import Icons from '../utilComponents/Icons'
import { EditorType } from './TextEditor.types'
import { getActiveStyles, toggleStyle } from './TextEditor.utils'

const MarkButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate()

  const isLinkNodeSelection = (
    editor: EditorType,
    selection: BaseSelection
  ) => {
    if (selection == null) {
      return false
    }

    return (
      Editor.above(editor, {
        at: selection,
        match: n => n.type === 'link'
      }) != null
    )
  }

  function toggleLinkAtSelection (editor: EditorType) {
    if (!isLinkNodeSelection(editor, editor.selection)) {
      const isSelectionCollapsed = Range.isCollapsed(editor.selection)
      console.log('isSelectionCollapsed', isSelectionCollapsed, editor)
      if (isSelectionCollapsed) {
        Transforms.insertNodes(
          editor,
          {
            type: 'link',
            url: '#',
            children: [{ text: 'link' }]
          },
          { at: editor.selection }
        )
      } else {
        Transforms.wrapNodes(
          editor,
          {
            type: 'link',
            url: Editor.string(editor, editor?.selection),
            children: [{ text: 'linktest' }]
          },
          { split: true, at: editor.selection }
        )
      }
    } else {
      Transforms.unwrapNodes(editor, {
        match: n => n && n.type === 'link'
      })
    }
  }

  const onMouseDownPerBlock = (editor: EditorType, format: string) => {
    if (icon === 'link') {
      toggleLinkAtSelection(editor)
    } else {
      toggleStyle(editor, format)
    }
  }

  const isActiveToolbarButton = (format: string) => {
    if (format === 'link') {
      return isLinkNodeSelection(editor, editor.selection)
    }
    return !!getActiveStyles(editor).has(format)
  }
  // console.log('icon', getActiveStyles(editor))
  return (
    <Buttons
      active={isActiveToolbarButton(format)}
      onMouseDown={event => {
        event.preventDefault()
        onMouseDownPerBlock(editor, format)
        // toggleStyle(editor, format)
      }}
    >
      <Icons src={icon} />
    </Buttons>
  )
}

export default MarkButton

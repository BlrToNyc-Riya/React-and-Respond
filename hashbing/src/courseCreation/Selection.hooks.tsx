import { useCallback, useRef, useState } from 'react'

import _ from 'lodash'
import { EditorType } from './TextEditor.types'
import { BaseSelection } from 'slate'

export default function useSelection (editor: EditorType) {
  const [selection, setSelection] = useState(editor.selection)
  const previousSelection = useRef(null)
  const setSelectionOptimized = useCallback(
    (newSelection: BaseSelection | null) => {
      if (_.isEqual(selection, newSelection)) {
        return
      }

      previousSelection.current = selection
      setSelection(newSelection)
    },
    [setSelection, selection]
  )

  return [previousSelection.current, selection, setSelectionOptimized]
}

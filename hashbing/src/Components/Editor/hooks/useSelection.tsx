import { useCallback, useRef, useState } from 'react'

import { EditorType } from '../../../courseCreation/TextEditor.types'
import { BaseSelection } from 'slate'
import _ from 'lodash'

export default function useSelection (editor: EditorType) {
  const [selection, setSelection] = useState(editor.selection)
  const previousSelection = useRef(null)
  const setSelectionOptimized = useCallback(
    (newSelection: BaseSelection) => {
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

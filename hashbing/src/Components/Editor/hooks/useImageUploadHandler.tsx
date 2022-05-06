import { BaseSelection, Editor, Transforms } from 'slate'

import axios from 'axios'
import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { EditorType } from '../../../courseCreation/TextEditor.types'
import BE_URL from '../utils/apiHelper'

export default function useImageUploadHandler (
  editor: EditorType,
  selection: BaseSelection
) {
  return useCallback(
    (event: any) => {
      event.preventDefault()
      const files = event.target.files
      if (files.length === 0) {
        return
      }
      const file = files[0]
      const fileName = file.name
      const formData = new FormData()
      formData.append('photo', file)

      const id = uuidv4()

      Transforms.insertNodes(
        editor,
        {
          id,
          type: 'image',
          caption: fileName,
          url: null,
          isUploading: true,
          children: [{ text: '' }]
        },
        { at: selection, select: true }
      )

      axios
        .post(`${BE_URL}/courses/uploadPic`, formData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
          setTimeout(() => {
            const newImageEntry = Editor.nodes(editor, {
              match: n => n.id === id
            })

            if (newImageEntry == null) {
              return
            }

            Transforms.setNodes(
              editor,
              { isUploading: false, url: `/photos/${fileName}` },
              { at: newImageEntry[1] }
            )
          }, 3000)
        })
        .catch(error => {
          // Fire another Transform.setNodes to set an upload failed state on the image
        })
    },
    [editor, selection]
  )
}

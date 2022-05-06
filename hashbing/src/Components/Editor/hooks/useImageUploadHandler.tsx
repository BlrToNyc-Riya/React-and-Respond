import { BaseSelection, Editor, Transforms } from 'slate'

import axios from 'axios'
import { useCallback } from 'react'
import BE_URL from '../utils/apiHelper'
import { ReactEditor } from 'slate-react'

export default function useImageUploadHandler (selection: BaseSelection) {
  return useCallback(
    (event: any) => {
      event.preventDefault()
      const files = event.target.files
      if (files.length === 0) {
        return
      }
      const file = files[0]
      const newFileName = `${Date.now()}-${file.name}`
      console.log('files>>', selection)
      const fileName = file.name
      const formData = new FormData()
      formData.append('photo', file, newFileName)

      const id = uuidv4()

      Transforms.insertNodes(
        editor,
        {
          id,
          type: 'image',
          caption: fileName,
          url: `/src/Components/Editor/hooks/${newFileName}`,
          isUploading: true,
          children: [{ text: '' }]
        },
        { at: selection, select: true }
      )
      console.log('>>', editor.children, selection)
      Editor.end(editor, [1])

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
              {
                isUploading: false,
                url: `/src/Components/Editor/hooks/${newFileName}`
              },
              { at: newImageEntry[1] }
            )
            ReactEditor.focus(editor)
            Transforms.select(editor, Editor.end(editor, []))
          }, 3000)
        })
        .catch(error => {
          // Fire another Transform.setNodes to set an upload failed state on the image
        })
    },
    [editor, selection]
  )
}

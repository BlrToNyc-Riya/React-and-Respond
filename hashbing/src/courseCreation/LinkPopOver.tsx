import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  MouseEventHandler
} from 'react'
import { BaseSelection, Editor, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import { useSlate } from 'slate-react'

export default function LinkPopOver ({
  editorOffsets,
  selectionForLink
}: {
  editorOffsets: { x: number; y: number } | null
  selectionForLink: BaseSelection
}) {
  const linkEditorRef = useRef<HTMLDivElement>(null)
  const editor = useSlate()

  const [linkNode, path] = Editor.above(editor, {
    at: selectionForLink,
    match: n => n.type === 'link'
  })

  const [linkURL, setLinkURL] = useState(linkNode.url)
  const [hidePopup, setHidePopup] = useState(false)

  useEffect(() => {
    console.log('fired')
    const linkEditorEl = linkEditorRef.current
    if (linkEditorEl == null) {
      return
    }

    const linkDOMNode = ReactEditor.toDOMNode(editor, linkNode)
    const {
      x: nodeX,
      height: nodeHeight,
      y: nodeY
    } = linkDOMNode.getBoundingClientRect()

    console.log({ nodeX, nodeY, nodeHeight, editorOffsets })

    linkEditorEl.style.display = 'block'

    const top = nodeY + nodeHeight - (editorOffsets?.y || 0)
    const left = nodeX - (editorOffsets?.x || 0)
    linkEditorEl.style.top = `${top}px`
    linkEditorEl.style.left = `${left}px`
    setHidePopup(false)
    // setLinkURL(linkNode.url)
  }, [
    editor,
    editorOffsets?.x,
    editorOffsets?.y,
    linkNode,
    editor.selection,
    linkURL,
    linkNode.children.url
  ])

  if (editorOffsets == null) {
    return null
  }

  useEffect(() => {
    setLinkURL(linkNode.url)
  }, [linkNode])

  const onLinkURLChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setLinkURL(event.target?.value),
    [setLinkURL]
  )

  const onApply = useCallback(
    (event: unknown): void => {
      Transforms.setNodes(editor, { url: linkURL }, { at: path })
      setHidePopup(true)
    },
    [editor, linkURL, path]
  )

  console.log('linkURL', linkURL)

  return (
    <div
      ref={linkEditorRef}
      className='flex flex-col bg-slate-300 w-1/4 shadow'
    >
      {!hidePopup && (
        <>
          <input
            type='text'
            value={`${linkURL}`}
            onChange={onLinkURLChange}
            className=' rounded text-black bg-slate-100 border-blue-300 border-2 p-2'
          />
          <button
            className='bg-blue-300 hover:bg-blue-500 text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded'
            name='Change Link'
            onClick={onApply}
          >
            Change Link URL
          </button>
        </>
      )}
    </div>
  )
}

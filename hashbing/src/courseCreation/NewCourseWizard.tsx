import React, { useState } from 'react'
import Editor from '../Components/Editor/Editor'
import TextEditor from './TextEditor'
import { ExampleDocument } from './TextEditor.utils'

type Props = {}

function NewCourseWizard ({}: Props) {
  const [document, updateDocument] = useState(ExampleDocument)
  return (
    <div className='mx-5'>
      {/* Test */}
      <Editor document={document} onChange={updateDocument} />
    </div>
  )
}

export default NewCourseWizard

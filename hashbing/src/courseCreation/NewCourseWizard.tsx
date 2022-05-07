import React, { useState } from 'react'
import Editor from '../Components/Editor/Editor'
import TextEditor from './TextEditor'
import { ExampleDocument } from '../Components/Editor/hooks/TextEditor.utils'
import Header from '../Components/Header'

type Props = {}

function NewCourseWizard ({}: Props) {
  const [document, updateDocument] = useState('')
  return (
    <div className='mx-5 flex items-center my-5 flex-col'>
      <Header selection='authored' />
      <TextEditor updateDocument={updateDocument} />
    </div>
  )
}

export default NewCourseWizard

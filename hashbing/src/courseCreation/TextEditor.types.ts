import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type CustomText = {
  text: string
  bold?: boolean
  italic?: boolean
  code?: boolean
  underline?: boolean
}
export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type HeadingElement = {
  type: 'heading'
  level: number
  children: CustomText[]
}

export type LinkElement = {
  type: 'link'
  url: string
  children?: CustomText[]
}

export type BoldElement = {
  type: 'bold'
  text: string
  children?: CustomText[]
}

export type ItalicElement = {
  type: 'italic'
  text: string
  children?: CustomText[]
}

export type CodeElement = {
  type: 'code'
  text: string
  children?: CustomText[]
}

export type IframeElement = {
  type: 'iframe'
  url: string
  children?: CustomText[]
}

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | LinkElement
  | BoldElement
  | CodeElement
  | ItalicElement
  | IframeElement

export type EditorType = BaseEditor & ReactEditor & HistoryEditor

import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type CustomText = {
  text: string
  bold?: boolean
  italic?: boolean
  code?: boolean
  underline?: boolean
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  type?: string
  children?: CustomText[]
  url?: string
  link?: string
}

export type LinkInlineText = {
  type: 'link'
  url: string
  children: CustomText[]
}

export type InlineText = LinkInlineText | CustomText

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type HeadingElement1 = {
  type: 'h1'
  level: number
  children: CustomText[]
}

export type HeadingElement2 = {
  type: 'h2'
  level: number
  children: CustomText[]
}

export type HeadingElement3 = {
  type: 'h3'
  level: number
  children: CustomText[]
}

export type HeadingElement4 = {
  type: 'h4'
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

export type ImageElement = {
  type: 'image'
  url: string
  caption: string
  children?: CustomText[]
}

export type CustomElement =
  | ParagraphElement
  | HeadingElement1
  | HeadingElement2
  | HeadingElement3
  | HeadingElement4
  | LinkElement
  | BoldElement
  | CodeElement
  | ItalicElement
  | IframeElement
  | ImageElement

export type EditorType = BaseEditor & ReactEditor & HistoryEditor

export type CustomText = { text: string; bold?: boolean; italic?: boolean }
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
export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | LinkElement
  | BoldElement

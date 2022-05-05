import { CustomElement, CustomText, ImageElement } from './TextEditor.types'

function Image (props: {
  element: ImageElement
  children: CustomText[]
  attributes: any
}) {
  const { attributes, children, element } = props
  console.log('props', props)
  console.log('renderElement', element)
  return (
    <div contentEditable={false} {...attributes}>
      <div className='flex items-center justify-center flex-col'>
        <img
          src={String(element.url)}
          alt={element.caption}
          className={'image'}
        />
        {element.caption && (
          <p className={'image-caption-read-mode'}>{element.caption}</p>
        )}
      </div>
      {children}
    </div>
  )
}

export default Image

export const isValidString = (str: string, minLength?: number): boolean => {
  if (
    str === undefined ||
    str === null ||
    str === '' ||
    typeof str !== 'string'
  ) {
    return false
  }
  if (minLength !== undefined && str.length < minLength) {
    return false
  }
  return true
}

export enum courseCreationErrors {
  TITLE = 'Title is required and must be at least 3 characters long',
  DESCRIPTION = 'Description is required and must be at least 10 characters long',
  TAGS = 'Tags is required and must be at least 3 characters long'
}

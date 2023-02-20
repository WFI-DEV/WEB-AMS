export const generateCodeAssets = (objParams) => {
  const objFormatted = Object.fromEntries(
    Object.entries(objParams).filter(([_, v]) => v != null && v !== ''),
  )
  if (Object.keys(objFormatted).length === 0) {
    return ''
  }

  const str = Object.keys(objFormatted)
    .map((key) => {
      return objFormatted[key] === '' ||
        objFormatted[key] === null ||
        typeof objFormatted[key] === 'undefined'
        ? ''
        : `${encodeURIComponent(objFormatted[key])}`
    })
    .join('/')

  return str
}

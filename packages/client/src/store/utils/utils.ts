export function isError(action) {
  return (
    !action.type.includes('changeAvatar') && action.type.endsWith('rejected')
  )
}

export function isPending(action) {
  return (
    !action.type.includes('changeAvatar') && action.type.endsWith('pending')
  )
}

export function isFulfilled(action) {
  return (
    !action.type.includes('changeAvatar') && action.type.endsWith('fulfilled')
  )
}

export const objectSorter = (
  data: Record<string, string | number>[],
  value?: string | undefined,
  order?: boolean | undefined
) => {
  if (!value) return data
  return data?.sort((a, b) => {
    if (order) {
      return a[value] < b[value] ? 1 : -1
    } else {
      return a[value] > b[value] ? 1 : -1
    }
  })
}

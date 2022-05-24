export const dateToUTC = (d: Date, dateOnly: boolean = false) => {
  const date = new Date(d)
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate() + 1,
      dateOnly ? 0 : date.getUTCHours(),
      dateOnly ? 0 : date.getUTCMinutes(),
      dateOnly ? 0 : date.getUTCSeconds()
    )
  )
}

export const dateToUTC = (d: Date, dateOnly: boolean = true) => {
  const date = new Date(d)

  return date.toISOString()
  // return new Date(
  //   Date.UTC(
  //     date.getUTCFullYear(),
  //     date.getUTCMonth(),
  //     date.getUTCDate(),
  //     dateOnly ? 0 : date.getUTCHours(),
  //     dateOnly ? 0 : date.getUTCMinutes(),
  //     dateOnly ? 0 : date.getUTCSeconds()
  //   )
  // )
}

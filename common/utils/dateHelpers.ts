import { format, isSameYear } from 'date-fns'

export const dateFormatPattern = (date: Date | string) =>
  isSameYear(new Date(), new Date(date)) ? 'E dd MMM ' : 'E dd MMM y'

export const formatDate = (date: Date | string) =>
  format(new Date(date), dateFormatPattern(date))

export const formatTime = (time: Date | string) =>
  format(new Date(time), 'KK:mm a')

export const UTCDate = (date: Date | string) => {
  const d = new Date(date)

  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
}

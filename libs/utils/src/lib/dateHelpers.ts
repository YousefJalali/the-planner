import {
  format,
  getHours,
  getMinutes,
  isSameYear,
  parse,
  parseISO,
  set,
} from 'date-fns'

export const URL_DATE_FORMAT = 'dd-MM-yyyy'

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

export const addCurrentTime = (date: Date | string) =>
  new Date(date).getHours() > 0
    ? new Date(date)
    : set(new Date(date), {
        hours: getHours(new Date()),
        minutes: getMinutes(new Date()),
      })

export const stringToDate: (date: string | Date) => Date = (date) =>
  typeof date === 'string' ? parseISO(date) : date

export const formatToUrlDate = (date: string | Date | number) =>
  format(new Date(date), URL_DATE_FORMAT)

export const parseUrlDate = (date: string) =>
  parse(date, URL_DATE_FORMAT, new Date())

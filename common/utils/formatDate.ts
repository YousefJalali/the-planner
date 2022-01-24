const formatDate = (date: string) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const format = new Date(date)

  return [
    format.toLocaleDateString('en-US'),
    format.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  ]
}

export default formatDate

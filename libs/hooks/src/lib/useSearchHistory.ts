import { KeyboardEvent } from 'react'
import { useCookies } from 'react-cookie'

const replaceAt = (array: string[], index: number, value: string) => {
  const ret = array.slice(0)
  ret[index] = value
  return ret
}

export const useSearchHistory = () => {
  const [cookie, setCookie] = useCookies(['search-history'])

  const handler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const searchHistory = cookie['search-history'] || []
      const updateSearchHistory =
        searchHistory.length < 5
          ? [...searchHistory, (e.target as HTMLInputElement).value]
          : replaceAt(searchHistory, 0, (e.target as HTMLInputElement).value)

      setCookie('search-history', JSON.stringify(updateSearchHistory), {
        path: '/',
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      })
    }
  }

  return { handler }
}

export default useSearchHistory

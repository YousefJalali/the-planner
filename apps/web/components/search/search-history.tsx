import { useCookies } from 'react-cookie'
import { FiClock, FiX } from 'react-icons/fi'

type Props = {
  onSearchItemClick: (item: string) => void
}

const SearchHistory = ({ onSearchItemClick }: Props) => {
  const [cookie, setCookie] = useCookies(['search-history'])

  const removeFromSearchHistory = (item: string) => {
    setCookie(
      'search-history',
      JSON.stringify(
        cookie['search-history'].filter((ex: string) => ex !== item)
      ),
      {
        path: '/',
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      }
    )
  }

  return (
    <section className="px-6 mt-3">
      <ul className="space-y-3">
        {cookie['search-history']?.map((item: string, i: number) => (
          <li
            key={i}
            className="flex justify-between items-center opacity-60 p-1"
          >
            <button
              className="flex items-center gap-2 flex-1 hover:underline"
              onClick={() => onSearchItemClick(item)}
            >
              <FiClock />
              <span>{item}</span>
            </button>
            <button
              className="btn btn-ghost btn-sm btn-circle -mr-3"
              onClick={() => removeFromSearchHistory(item)}
            >
              <FiX />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SearchHistory

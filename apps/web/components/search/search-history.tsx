import { x } from '@xstyled/styled-components'
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
    <x.section px={4} mt={3}>
      <x.ul spaceY={3}>
        {cookie['search-history']?.map((item: string, i: number) => (
          <x.li
            key={i}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            color="content-subtle"
          >
            <x.a
              display="flex"
              alignItems="center"
              spaceX={2}
              flex="1"
              onClick={() => onSearchItemClick(item)}
            >
              <FiClock />
              <x.span>{item}</x.span>
            </x.a>
            <x.a onClick={() => removeFromSearchHistory(item)}>
              <FiX />
            </x.a>
          </x.li>
        ))}
      </x.ul>
    </x.section>
  )
}

export default SearchHistory

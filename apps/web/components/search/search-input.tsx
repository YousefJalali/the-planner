import { Fieldset, Input } from '@the-planner/ui-web'
import Head from 'next/head'
import { InputHTMLAttributes } from 'react'
import { FiSearch } from 'react-icons/fi'

const SearchInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>

      <Fieldset
        label="search"
        hideLabel
        supportiveText="type a word from title or description"
        leftIcon={<FiSearch />}
      >
        <Input
          {...props}
          type="search"
          name="keyword"
          placeholder="Search..."
          autoComplete="off"
        />
      </Fieldset>
    </>
  )
}

export default SearchInput

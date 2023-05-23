import Head from 'next/head'
import { InputHTMLAttributes } from 'react'

const SearchInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>

      <div className="form-control w-full">
        <input
          type="search"
          name="keyword"
          placeholder="Search..."
          autoComplete="off"
          className="input input-bordered w-full"
          {...props}
        />
        <label className="label">
          <span className="label-text-alt">
            Type a word from title or description
          </span>
        </label>
      </div>
    </>
  )
}

export default SearchInput

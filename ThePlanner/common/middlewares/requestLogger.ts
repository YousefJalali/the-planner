import {
  Arguments,
  BareFetcher,
  Key,
  SWRConfiguration,
  SWRHook,
  SWRResponse,
} from 'swr'

export const requestLogger = (useSWRNext: SWRHook) => {
  return (
    key: unknown,
    fetcher: BareFetcher | null,
    config: SWRConfiguration
  ) => {
    let nextFetcher = fetcher

    if (fetcher) {
      nextFetcher = (...args: unknown[]) => {
        const started = Date.now()
        const label =
          typeof key === 'function'
            ? key()
            : Array.isArray(key)
            ? key.join(', ')
            : key
        console.info('SWR Request', label)
        const response = fetcher(...args)
        if (response instanceof Promise) {
          return response.then((result) => {
            console.info(
              'SWR Request complete',
              label,
              'elapsed',
              Date.now() - started,
              'ms'
            )
            return result
          })
        } else {
          console.info(
            'SWR Request complete',
            label,
            'elapsed',
            Date.now() - started,
            'ms'
          )
          return response
        }
      }
    }

    // Execute the hook with the new fetcher.
    return typeof key === 'function'
      ? useSWRNext(key, nextFetcher, config)
      : useSWRNext(key as Arguments, nextFetcher, config)
  }
}

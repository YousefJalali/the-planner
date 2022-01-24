import { RefObject, useEffect, useRef, useState } from 'react'

function useScroll<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
): number[] {
  const [scrollTop, setScrollTop] = useState(0)

  const onScroll = (e: Event) =>
    requestAnimationFrame(() => {
      if (!e.target) {
        return
      }
      setScrollTop((e.target as HTMLDivElement).scrollTop)
    })

  useEffect(() => {
    const scrollContainer = ref?.current

    if (!scrollContainer) {
      return
    }

    setScrollTop(scrollContainer.scrollTop)
    scrollContainer.addEventListener('scroll', onScroll)
    return () => scrollContainer.removeEventListener('scroll', onScroll)
  }, [])

  return [scrollTop]
}

export default useScroll

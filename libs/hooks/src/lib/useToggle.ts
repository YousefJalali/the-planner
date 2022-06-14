import { useCallback, useState } from 'react'

export const useToggle = (initialState = false): [boolean, any] => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState)
  // Define and memorize toggler function in case we pass down the comopnent,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(
    (setTo: boolean): void =>
      setState((state) => (typeof setTo === 'boolean' ? setTo : !state)),
    []
  )

  return [state, toggle]
}

export default useToggle

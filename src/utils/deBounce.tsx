import { useRef } from 'react'

export default function useDebounce(fn, delay) {
  const timeoutRef = useRef(null)

  const debounceFn = (...params) => {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      fn(...params);
    }, delay)
  }

  return debounceFn
}
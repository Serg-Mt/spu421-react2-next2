import { useEffect, useRef, useState } from 'react'

export function useDateInput(startDate = new Date) {
  const
    ref = useRef(null),
    [date, setDate] = useState(startDate);
  useEffect(() => {
    if (ref?.current)
      ref.current.valueAsDate = date;
  }, [date]);
  useEffect(() => {
    if (ref?.current)
      ref.current.addEventListener('change', event => setDate(event.currentTarget.valueAsDate))
  }, [ref]);

  return { ref, date, setDate }
}
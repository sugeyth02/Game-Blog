import { useEffect, useRef } from 'react';

export default function usePrevious(value: number) {
  const ref = useRef(1);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

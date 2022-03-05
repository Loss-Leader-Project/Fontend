import { useEffect, useRef } from 'react';

const useFirstRender = () => {
  const firstRef = useRef(true);

  useEffect(() => {
    firstRef.current = false;
  }, []);

  return firstRef.current;
};

export default useFirstRender;

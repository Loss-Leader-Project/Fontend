<<<<<<< HEAD
import { useEffect, useRef } from 'react';

const useFirstRender = () => {
  const firstRef = useRef(true);

  useEffect(() => {
    firstRef.current = false;
  }, []);

  return firstRef.current;
};

export default useFirstRender;
=======
<<<<<<< HEAD
import { useEffect, useRef } from 'react';

const useFirstRender = () => {
  const firstRef = useRef(true);

  useEffect(() => {
    firstRef.current = false;
  }, []);

  return firstRef.current;
};

export default useFirstRender;
=======
import { useEffect, useRef } from 'react';

const useFirstRender = () => {
  const firstRef = useRef(true);

  useEffect(() => {
    firstRef.current = false;
  }, []);

  return firstRef.current;
};

export default useFirstRender;
>>>>>>> 93bd7de (Chanage : 코맨드 반영 완료 (#22))
>>>>>>> 883be93 (Add: api공통로직 구현)

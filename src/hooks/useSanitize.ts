import { useCallback } from 'react';
import DOMPurify from 'dompurify';

const useSanitize = () => {
  const sanitize = useCallback((dirty: string): string => {
    if (typeof window !== 'undefined') {
      return DOMPurify.sanitize(dirty);
    }
    return dirty;
  }, []);

  return { sanitize };
};

export default useSanitize;

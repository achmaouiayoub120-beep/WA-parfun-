'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface CursorContextType {
  variant: string;
  text: string;
  setCursor: (variant: string, text?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  variant: 'default',
  text: '',
  setCursor: () => {},
  resetCursor: () => {},
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState('default');
  const [text, setText] = useState('');

  const setCursor = useCallback((v: string, t?: string) => {
    setVariant(v);
    setText(t || '');
  }, []);

  const resetCursor = useCallback(() => {
    setVariant('default');
    setText('');
  }, []);

  return (
    <CursorContext.Provider value={{ variant, text, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}

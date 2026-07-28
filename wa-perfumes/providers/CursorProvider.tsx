'use client';

import React, { createContext, useContext } from 'react';

type CursorContextType = {
  active: boolean;
  text: string;
  variant: string;
  setCursor: (variant: string, text?: string) => void;
  resetCursor: () => void;
};

const CursorContext = createContext<CursorContextType>({
  active: false,
  text: '',
  variant: 'default',
  setCursor: () => {},
  resetCursor: () => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  return (
    <CursorContext.Provider
      value={{
        active: false,
        text: '',
        variant: 'default',
        setCursor: () => {},
        resetCursor: () => {},
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);

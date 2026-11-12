import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useReality } from '../hooks/useReality';
import { useArchive } from '../hooks/useArchive';

type RealityContextType = ReturnType<typeof useReality> & ReturnType<typeof useArchive>;

const RealityContext = createContext<RealityContextType | null>(null);

export function RealityProvider({ children }: { children: ReactNode }) {
  const reality = useReality();
  const archive = useArchive();

  return (
    <RealityContext.Provider value={{ ...reality, ...archive }}>
      {children}
    </RealityContext.Provider>
  );
}

export function useRealityContext() {
  const context = useContext(RealityContext);
  if (!context) throw new Error('useRealityContext must be used within RealityProvider');
  return context;
}

import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { RealityProvider } from './context/RealityContext'
import { GrainOverlay } from './components/GrainOverlay'
import { Navigation } from './components/Navigation'
import { Observatory } from './pages/Observatory'
import { Explorer } from './pages/Explorer'
import { Archive } from './pages/Archive'
import { Experimental } from './pages/Experimental'

export default function App() {
  const location = useLocation()

  return (
    <RealityProvider>
      <div className="min-h-screen bg-oracle-bg text-oracle-text">
        <GrainOverlay />
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Observatory />} />
            <Route path="/explore" element={<Explorer />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/experimental" element={<Experimental />} />
          </Routes>
        </AnimatePresence>
      </div>
    </RealityProvider>
  )
}

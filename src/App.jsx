import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import GamesSection from './components/games/GamesSection.jsx'
import PlatformsSection from './components/platforms/PlatformsSection.jsx'
import GenresSection from './components/genres/GenresSection.jsx'

export default function App() {
  const [section, setSection] = useState('games')

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(79,70,229,0.18),_transparent_60%)] md:flex">
      <Sidebar active={section} onChange={setSection} />
      <main className="mx-auto w-full max-w-7xl flex-1 p-4 md:p-8">
        {section === 'games' && <GamesSection />}
        {section === 'platforms' && <PlatformsSection />}
        {section === 'genres' && <GenresSection />}
      </main>
    </div>
  )
}

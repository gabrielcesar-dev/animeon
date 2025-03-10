import { useState } from "react";
import Hero from "./components/Hero"
import NavBar from "./components/NavBar"

const App = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-900">
      <NavBar setIsSettingsOpen={setIsSettingsOpen} iconsSize={35} />
      <Hero isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} />
    </main>
  )
}

export default App
import { useState } from "react";
import Hero from "./pages/Hero";
import NavBar from "./components/NavBar";

const App = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-900">
      <NavBar
        setIsSettingsOpen={setIsSettingsOpen}
        isLoading={isLoading}
        iconsSize={35}
      />
      <Hero
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </main>
  );
};

export default App;

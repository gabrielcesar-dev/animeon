import About from "./components/About"
import Hero from "./components/Hero"

const App = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-900">
      <Hero />
      <About />
    </main>
  )
}

export default App
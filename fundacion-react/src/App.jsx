import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Donations from "./components/sections/Donations";
import Team from "./components/sections/Team";
import Causes from "./components/sections/Causes";
import Ambassadors from "./components/sections/Ambassadors";
import Alliances from "./components/sections/Alliances";
import Contact from "./components/sections/Contact";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Donations />
      <Team />
      <Causes />
      <Ambassadors />
      <Alliances />
      <Contact />
      <Footer />
    </div>
  );
}
import { useState, useEffect } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SelectedWorks } from "./components/SelectedWorks";
import { Journal } from "./components/Journal";
import { Explorations } from "./components/Explorations";
import { Stats } from "./components/Stats";
import { Contact } from "./components/Contact";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  const handleNavClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  // IntersectionObserver to dynamically highlight the current active section in the Navbar
  useEffect(() => {
    if (isLoading) return;

    const sections = ["home", "work", "resume", "explorations", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.2, rootMargin: "-10% 0px -60% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <div className="bg-bg text-text-primary min-h-screen relative font-body">
          {/* Fixed Floating Navigation Header */}
          <Navbar activeSection={activeSection} onNavClick={handleNavClick} />
          
          <main>
            {/* 1. Hero / Home */}
            <Hero onSeeWorksClick={() => handleNavClick("work")} />

            {/* 2. Selected Works Bento Grid */}
            <SelectedWorks />

            {/* 3. Journal List */}
            <Journal />

            {/* 4. Explorations Parallax Gallery */}
            <Explorations />

            {/* 5. Metrics Section */}
            <Stats />

            {/* 6. Footer / Contact Form & Marquee */}
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}

export default App;

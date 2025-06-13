import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import StarField from './components/StarField';
import IntroScene from './components/scenes/IntroScene';
import WelcomeScene from './components/scenes/WelcomeScene';
import AboutScene from './components/scenes/AboutScene';
import SkillsScene from './components/scenes/SkillsScene';
import ProjectsScene from './components/scenes/ProjectsScene';
import ContactScene from './components/scenes/ContactScene';
import AudioControls from './components/AudioControls';
import './styles/animations.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentScene, setCurrentScene] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const scene = Math.floor(scrollPosition / windowHeight);
      setCurrentScene(Math.min(scene, 5));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="relative">
      <StarField />
      <Navigation currentScene={currentScene} />
      <AudioControls enabled={audioEnabled} onToggle={setAudioEnabled} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <IntroScene />
          <WelcomeScene />
          <AboutScene />
          <SkillsScene />
          <ProjectsScene />
          <ContactScene />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControlsProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({ enabled, onToggle }) => {
  return (
    <motion.div
      className="fixed bottom-8 left-8 z-40"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      <motion.button
        onClick={() => onToggle(!enabled)}
        className={`
          p-3 rounded-full backdrop-blur-sm transition-all duration-300
          ${enabled 
            ? 'bg-purple-500/20 text-purple-300' 
            : 'bg-black/20 text-gray-400 hover:text-white hover:bg-white/10'
          }
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {enabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>
    </motion.div>
  );
};

export default AudioControls;
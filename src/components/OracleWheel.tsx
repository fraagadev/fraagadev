import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Card {
  id: string;
  name: string;
  image_url: string;
  message: string;
  ritual: string;
}

interface OracleWheelProps {
  onCardSelected: (card: Card) => void;
  cards: Card[];
}

const OracleWheel: React.FC<OracleWheelProps> = ({ onCardSelected, cards }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [availableCards, setAvailableCards] = useState<Card[]>([]);

  const spinWheel = async () => {
    setIsSpinning(true);
    
    // Simulate wheel spinning
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Select 5 random cards
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    
    setAvailableCards(selected);
    setIsSpinning(false);
    setShowCards(true);
  };

  const selectCard = (card: Card) => {
    onCardSelected(card);
    setShowCards(false);
    setAvailableCards([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <AnimatePresence mode="wait">
        {!showCards ? (
          <motion.div
            key="wheel"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
              transition={isSpinning ? { duration: 3, ease: "easeOut" } : {}}
              className="relative w-80 h-80 mx-auto mb-8"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-mystic-600 via-cosmic-500 to-mystic-600 p-1">
                <div className="w-full h-full rounded-full bg-galaxy flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2 p-8">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="w-12 h-16 bg-gradient-to-b from-mystic-800 to-mystic-900 rounded-lg border border-mystic-500/30 flex items-center justify-center"
                      >
                        <Sparkles className="text-mystic-400" size={16} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <h2 className="font-mystic text-3xl text-white mb-4">
              Oráculo Ilustrado do Amor
            </h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Concentre-se em sua pergunta sobre o amor e gire o oráculo para revelar sua mensagem divina.
            </p>

            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className={`btn-primary text-lg px-8 py-4 ${
                isSpinning ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSpinning ? 'Girando o Oráculo...' : 'Girar o Oráculo'}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-center"
          >
            <h3 className="font-mystic text-2xl text-white mb-8">
              Escolha sua carta
            </h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {availableCards.map((card, index) => (
                <motion.button
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => selectCard(card)}
                  className="group relative"
                >
                  <div className="w-24 h-32 bg-gradient-to-b from-mystic-800 to-mystic-900 rounded-lg border border-mystic-500/30 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-mystic-500/50">
                    <Sparkles className="text-mystic-400 group-hover:text-mystic-300" size={24} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-mystic-600/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              ))}
            </div>
            <p className="text-white/60 text-sm">
              Clique na carta que mais ressoa com seu coração
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OracleWheel;
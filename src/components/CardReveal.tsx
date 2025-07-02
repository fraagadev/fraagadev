import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Save } from 'lucide-react';
import Confetti from 'react-confetti';

interface Card {
  id: string;
  name: string;
  image_url: string;
  message: string;
  ritual: string;
}

interface CardRevealProps {
  card: Card;
  onSave: () => void;
  onClose: () => void;
}

const CardReveal: React.FC<CardRevealProps> = ({ card, onSave, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
        colors={['#8b47f7', '#f97316', '#ec4899', '#06b6d4']}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="card-mystic max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="text-center mb-6">
          <div className="relative w-48 h-64 mx-auto mb-4">
            <img
              src={card.image_url}
              alt={card.name}
              className="w-full h-full object-cover rounded-lg shadow-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
          </div>
          
          <h2 className="font-mystic text-2xl text-white mb-2">{card.name}</h2>
          <div className="flex items-center justify-center text-mystic-400 mb-4">
            <Heart className="mr-2" size={20} />
            <span>Mensagem do Coração</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-mystic-300 mb-2">Mensagem Canalizada:</h3>
            <p className="text-white/90 leading-relaxed italic">
              "{card.message}"
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-cosmic-300 mb-2">Ritual Sugerido:</h3>
            <p className="text-white/90 leading-relaxed">
              {card.ritual}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onSave}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            <Save size={18} />
            Salvar na Coleção
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300"
          >
            Fechar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CardReveal;
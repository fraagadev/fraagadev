import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Navigation from '../components/Navigation';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface UserCard {
  id: string;
  drawn_at: string;
  cards: {
    id: string;
    name: string;
    image_url: string;
    message: string;
    ritual: string;
  };
}

const Gallery: React.FC = () => {
  const { user } = useAuth();
  const [userCards, setUserCards] = useState<UserCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<UserCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserCards();
    }
  }, [user]);

  const loadUserCards = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_cards')
        .select(`
          id,
          drawn_at,
          cards (
            id,
            name,
            image_url,
            message,
            ritual
          )
        `)
        .eq('user_id', user.id)
        .order('drawn_at', { ascending: false });

      if (error) throw error;
      setUserCards(data || []);
    } catch (error) {
      console.error('Error loading user cards:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-mystic-500"></div>
      </div>
    );
  }

  if (userCards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-mystic text-center max-w-md"
        >
          <Sparkles className="text-mystic-400 mx-auto mb-4" size={48} />
          <h2 className="font-mystic text-2xl text-white mb-4">
            Sua Coleção Está Vazia
          </h2>
          <p className="text-white/80 mb-6">
            Você ainda não possui cartas em sua coleção. Visite o oráculo para receber sua primeira mensagem divina.
          </p>
          <button
            onClick={() => window.location.href = '/oracle'}
            className="btn-primary"
          >
            Consultar Oráculo
          </button>
        </motion.div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-mystic text-3xl text-white mb-2">
            Sua Coleção Sagrada
          </h1>
          <p className="text-white/70">
            {userCards.length} carta{userCards.length !== 1 ? 's' : ''} em sua jornada espiritual
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userCards.map((userCard, index) => (
            <motion.div
              key={userCard.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCard(userCard)}
              className="card-mystic cursor-pointer group hover:scale-105 transition-all duration-300"
            >
              <div className="relative mb-4">
                <img
                  src={userCard.cards.image_url}
                  alt={userCard.cards.name}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
              </div>

              <h3 className="font-mystic text-lg text-white mb-2 group-hover:text-mystic-300 transition-colors">
                {userCard.cards.name}
              </h3>

              <div className="flex items-center text-white/60 text-sm mb-3">
                <Calendar className="mr-2" size={14} />
                {format(new Date(userCard.drawn_at), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </div>

              <p className="text-white/80 text-sm line-clamp-3">
                {userCard.cards.message}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedCard && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-mystic max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="text-center mb-6">
              <img
                src={selectedCard.cards.image_url}
                alt={selectedCard.cards.name}
                className="w-48 h-64 object-cover rounded-lg mx-auto mb-4 shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=400';
                }}
              />
              
              <h2 className="font-mystic text-2xl text-white mb-2">
                {selectedCard.cards.name}
              </h2>
              
              <div className="flex items-center justify-center text-mystic-400 mb-4">
                <Heart className="mr-2" size={16} />
                <span className="text-sm">
                  {format(new Date(selectedCard.drawn_at), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-mystic-300 mb-2">Mensagem Canalizada:</h3>
                <p className="text-white/90 leading-relaxed italic">
                  "{selectedCard.cards.message}"
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-cosmic-300 mb-2">Ritual Sugerido:</h3>
                <p className="text-white/90 leading-relaxed">
                  {selectedCard.cards.ritual}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCard(null)}
              className="btn-primary w-full mt-8"
            >
              Fechar
            </button>
          </motion.div>
        </div>
      )}

      <Navigation />
    </div>
  );
};

export default Gallery;
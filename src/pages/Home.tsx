import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mx-auto mb-8"
          >
            <div className="w-full h-full bg-gradient-to-r from-mystic-500 to-cosmic-500 rounded-full flex items-center justify-center">
              <Crown className="text-white" size={32} />
            </div>
          </motion.div>

          <h1 className="font-mystic text-5xl md:text-6xl text-white mb-4 bg-gradient-to-r from-mystic-400 to-cosmic-400 bg-clip-text text-transparent">
            Oráculo Ilustrado do Amor
          </h1>

          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Descubra os mistérios do coração através de cartas sagradas canalizadas especialmente para você
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-mystic text-center"
            >
              <Sparkles className="text-mystic-400 mx-auto mb-3" size={32} />
              <h3 className="font-mystic text-lg text-white mb-2">Cartas Místicas</h3>
              <p className="text-white/70 text-sm">
                Ilustrações únicas canalizadas do universo
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card-mystic text-center"
            >
              <Heart className="text-cosmic-400 mx-auto mb-3" size={32} />
              <h3 className="font-mystic text-lg text-white mb-2">Mensagens do Coração</h3>
              <p className="text-white/70 text-sm">
                Orientações espirituais para o amor
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="card-mystic text-center"
            >
              <Star className="text-mystic-400 mx-auto mb-3" size={32} />
              <h3 className="font-mystic text-lg text-white mb-2">Rituais Sagrados</h3>
              <p className="text-white/70 text-sm">
                Práticas diárias para elevar sua energia
              </p>
            </motion.div>
          </div>

          <div className="space-y-4">
            {!user ? (
              <>
                <Link to="/register" className="btn-primary text-lg px-8 py-4 inline-block">
                  Começar Jornada Espiritual
                </Link>
                <div>
                  <Link 
                    to="/login" 
                    className="text-white/80 hover:text-white transition-colors underline"
                  >
                    Já tenho uma conta
                  </Link>
                </div>
              </>
            ) : (
              <Link to="/oracle" className="btn-primary text-lg px-8 py-4 inline-block">
                Acessar Oráculo
              </Link>
            )}
          </div>
        </motion.div>
      </div>

      <Navigation />
    </div>
  );
};

export default Home;
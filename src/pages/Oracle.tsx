import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import OracleWheel from '../components/OracleWheel';
import CardReveal from '../components/CardReveal';
import Navigation from '../components/Navigation';
import toast from 'react-hot-toast';

interface Card {
  id: string;
  name: string;
  image_url: string;
  message: string;
  ritual: string;
}

const Oracle: React.FC = () => {
  const { user } = useAuth();
  const { canAccessOracle, updateLastOracleDate, lastOracleDate } = useSubscription();
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('*');

      if (error) throw error;

      if (data && data.length === 0) {
        // Insert sample cards if none exist
        await insertSampleCards();
        loadCards();
        return;
      }

      setCards(data || []);
    } catch (error) {
      console.error('Error loading cards:', error);
      toast.error('Erro ao carregar cartas');
    } finally {
      setLoading(false);
    }
  };

  const insertSampleCards = async () => {
    const sampleCards = [
      {
        name: "A Chama do Amor Verdadeiro",
        image_url: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=400",
        message: "O amor verdadeiro está florescendo em sua vida. Abra seu coração para receber as bênçãos que o universo está preparando para você. A paixão que você sente é um reflexo da sua alma gêmea se aproximando.",
        ritual: "Acenda uma vela vermelha e medite por 10 minutos visualizando seu coração irradiando luz dourada. Repita: 'Eu sou digno(a) de amor verdadeiro e incondicional.'"
      },
      {
        name: "Cura do Coração Ferido",
        image_url: "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400",
        message: "É tempo de curar as feridas do passado. Seu coração está pronto para se libertar das dores antigas e se abrir para um novo ciclo de amor e felicidade. O perdão é a chave para sua libertação.",
        ritual: "Tome um banho com pétalas de rosa branca e sal grosso. Enquanto a água escorre, visualize todas as mágoas sendo lavadas. Termine dizendo: 'Eu me perdoo e perdoo quem me magoou.'"
      },
      {
        name: "O Despertar da Paixão",
        image_url: "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400",
        message: "Uma paixão intensa está despertando em sua vida. Permita-se sentir profundamente e viver cada momento com intensidade. O universo está conspirando para trazer alguém especial ao seu caminho.",
        ritual: "Escreva em um papel vermelho tudo que deseja em um relacionamento. Queime o papel sob a lua cheia e espalhe as cinzas ao vento, dizendo: 'Que meus desejos se manifestem no amor perfeito.'"
      },
      {
        name: "Harmonia nos Relacionamentos",
        image_url: "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400",
        message: "Seus relacionamentos estão entrando em uma fase de maior harmonia e compreensão. É momento de praticar a paciência e a compaixão. O diálogo sincero será sua ferramenta mais poderosa.",
        ritual: "Prepare um chá de camomila e beba lentamente enquanto reflete sobre seus relacionamentos. Envie mentalmente amor e gratidão para todas as pessoas importantes em sua vida."
      },
      {
        name: "Autoamor e Valorização",
        image_url: "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400",
        message: "Antes de amar plenamente outra pessoa, você precisa se amar completamente. Este é um momento de reconhecer seu próprio valor e beleza. Você é um ser único e especial no universo.",
        ritual: "Olhe-se no espelho por 5 minutos e diga 10 qualidades suas em voz alta. Termine com: 'Eu me amo e me aceito completamente como sou.' Faça isso por 7 dias consecutivos."
      },
      {
        name: "Renovação dos Votos do Coração",
        image_url: "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400",
        message: "É tempo de renovar seus compromissos amorosos, seja consigo mesmo ou com seu parceiro. O amor maduro requer dedicação constante e escolhas conscientes todos os dias.",
        ritual: "Escreva uma carta de amor para si mesmo ou para seu parceiro. Leia em voz alta sob as estrelas e guarde em um lugar especial. Releia sempre que precisar lembrar do poder do amor."
      }
    ];

    try {
      const { error } = await supabase
        .from('cards')
        .insert(sampleCards);

      if (error) throw error;
    } catch (error) {
      console.error('Error inserting sample cards:', error);
    }
  };

  const handleCardSelected = async (card: Card) => {
    setSelectedCard(card);
    await updateLastOracleDate();
  };

  const handleSaveCard = async () => {
    if (!selectedCard || !user) return;

    try {
      const { error } = await supabase
        .from('user_cards')
        .insert([
          {
            user_id: user.id,
            card_id: selectedCard.id,
          }
        ]);

      if (error) throw error;
      toast.success('Carta salva na sua coleção!');
    } catch (error) {
      console.error('Error saving card:', error);
      toast.error('Erro ao salvar carta');
    }
  };

  const getTimeUntilNextOracle = () => {
    if (!lastOracleDate) return null;

    const lastAccess = new Date(lastOracleDate);
    const nextAccess = new Date(lastAccess);
    nextAccess.setDate(nextAccess.getDate() + 1);
    
    const now = new Date();
    const diff = nextAccess.getTime() - now.getTime();
    
    if (diff <= 0) return null;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-mystic-500"></div>
      </div>
    );
  }

  if (!canAccessOracle) {
    const timeLeft = getTimeUntilNextOracle();
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-mystic text-center max-w-md"
        >
          <Clock className="text-mystic-400 mx-auto mb-4" size={48} />
          <h2 className="font-mystic text-2xl text-white mb-4">
            Oráculo Já Consultado Hoje
          </h2>
          <p className="text-white/80 mb-6">
            Você já recebeu sua mensagem divina hoje. O oráculo estará disponível novamente em:
          </p>
          {timeLeft && (
            <div className="text-3xl font-bold text-cosmic-400 mb-6">
              {timeLeft}
            </div>
          )}
          <p className="text-white/60 text-sm">
            Use este tempo para refletir sobre a mensagem recebida e praticar o ritual sugerido.
          </p>
        </motion.div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="relative">
      <OracleWheel cards={cards} onCardSelected={handleCardSelected} />
      
      {selectedCard && (
        <CardReveal
          card={selectedCard}
          onSave={handleSaveCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
      
      <Navigation />
    </div>
  );
};

export default Oracle;
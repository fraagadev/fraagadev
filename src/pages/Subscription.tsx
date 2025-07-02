import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import Navigation from '../components/Navigation';

const Subscription: React.FC = () => {
  const { user, refreshUserProfile } = useAuth();
  const { isSubscribed } = useSubscription();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (plan: 'monthly' | 'yearly') => {
    if (!user) return;

    setLoading(true);
    try {
      // Simulate subscription activation (replace with actual Stripe integration)
      const expiresAt = new Date();
      if (plan === 'monthly') {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      } else {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      }

      const { error } = await supabase
        .from('users')
        .update({
          subscription_active: true,
          subscription_plan: plan,
          subscription_expires_at: expiresAt.toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      await refreshUserProfile();
      toast.success('Assinatura ativada com sucesso!');
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Erro ao ativar assinatura');
    } finally {
      setLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-mystic text-center max-w-md"
        >
          <Crown className="text-cosmic-400 mx-auto mb-4" size={48} />
          <h2 className="font-mystic text-2xl text-white mb-4">
            Você já é um Membro Premium!
          </h2>
          <p className="text-white/80 mb-6">
            Sua jornada espiritual está ativa. Acesse o oráculo diariamente para receber suas mensagens divinas.
          </p>
          <button
            onClick={() => window.location.href = '/oracle'}
            className="btn-primary w-full"
          >
            Acessar Oráculo
          </button>
        </motion.div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <Crown className="text-cosmic-400 mx-auto mb-4" size={64} />
          <h1 className="font-mystic text-4xl text-white mb-4">
            Desperte Sua Espiritualidade
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Acesse diariamente cartas místicas canalizadas especialmente para você, 
            com mensagens do coração e rituais sagrados.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card-mystic relative"
          >
            <div className="text-center mb-6">
              <h3 className="font-mystic text-2xl text-white mb-2">Plano Mensal</h3>
              <div className="text-4xl font-bold text-mystic-400 mb-1">R$ 29,90</div>
              <div className="text-white/60">por mês</div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'Acesso diário ao oráculo',
                'Cartas místicas ilustradas',
                'Mensagens canalizadas',
                'Rituais espirituais',
                'Galeria de cartas pessoal',
                'Notificações diárias'
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-white/90">
                  <Check className="text-mystic-400 mr-3 flex-shrink-0" size={16} />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe('monthly')}
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Processando...' : 'Assinar Mensal'}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card-mystic relative border-2 border-cosmic-500"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-cosmic-500 to-cosmic-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                <Sparkles className="mr-1" size={14} />
                Mais Popular
              </div>
            </div>

            <div className="text-center mb-6">
              <h3 className="font-mystic text-2xl text-white mb-2">Plano Anual</h3>
              <div className="text-4xl font-bold text-cosmic-400 mb-1">R$ 299,90</div>
              <div className="text-white/60">por ano</div>
              <div className="text-sm text-cosmic-300 mt-2">
                Economize R$ 58,90 (16% de desconto)
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'Acesso diário ao oráculo',
                'Cartas místicas ilustradas',
                'Mensagens canalizadas',
                'Rituais espirituais',
                'Galeria de cartas pessoal',
                'Notificações diárias',
                '2 meses grátis',
                'Suporte prioritário'
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-white/90">
                  <Check className="text-cosmic-400 mr-3 flex-shrink-0" size={16} />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe('yearly')}
              disabled={loading}
              className="btn-secondary w-full"
            >
              {loading ? 'Processando...' : 'Assinar Anual'}
            </button>
          </motion.div>
        </div>

        <div className="text-center text-white/60 text-sm">
          <p>Cancele a qualquer momento. Sem compromisso.</p>
        </div>
      </motion.div>
      <Navigation />
    </div>
  );
};

export default Subscription;
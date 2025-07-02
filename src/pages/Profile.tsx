import React from 'react';
import { motion } from 'framer-motion';
import { User, Crown, Calendar, Mail, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import Navigation from '../components/Navigation';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Profile: React.FC = () => {
  const { user, userProfile, signOut } = useAuth();
  const { isSubscribed, subscriptionPlan, subscriptionExpiresAt } = useSubscription();

  const getSubscriptionStatus = () => {
    if (!isSubscribed) return 'Inativo';
    if (subscriptionPlan === 'monthly') return 'Mensal';
    if (subscriptionPlan === 'yearly') return 'Anual';
    return 'Ativo';
  };

  const getSubscriptionColor = () => {
    if (!isSubscribed) return 'text-red-400';
    return 'text-green-400';
  };

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-mystic-500 to-cosmic-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-white" size={32} />
          </div>
          <h1 className="font-mystic text-3xl text-white mb-2">Meu Perfil</h1>
          <p className="text-white/70">Gerencie sua conta e assinatura</p>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card-mystic"
          >
            <h2 className="font-semibold text-white mb-4 flex items-center">
              <Mail className="mr-2 text-mystic-400" size={20} />
              Informações da Conta
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-white/60 text-sm">E-mail</label>
                <p className="text-white">{user?.email}</p>
              </div>
              <div>
                <label className="text-white/60 text-sm">Membro desde</label>
                <p className="text-white">
                  {userProfile?.created_at && 
                    format(new Date(userProfile.created_at), "d 'de' MMMM 'de' yyyy", { locale: ptBR })
                  }
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card-mystic"
          >
            <h2 className="font-semibold text-white mb-4 flex items-center">
              <Crown className="mr-2 text-cosmic-400" size={20} />
              Status da Assinatura
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-white/60 text-sm">Status</label>
                <p className={`font-semibold ${getSubscriptionColor()}`}>
                  {getSubscriptionStatus()}
                </p>
              </div>
              {isSubscribed && subscriptionExpiresAt && (
                <div>
                  <label className="text-white/60 text-sm">Expira em</label>
                  <p className="text-white">
                    {format(new Date(subscriptionExpiresAt), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                </div>
              )}
              {!isSubscribed && (
                <button
                  onClick={() => window.location.href = '/subscription'}
                  className="btn-primary w-full"
                >
                  Ativar Assinatura
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card-mystic"
          >
            <h2 className="font-semibold text-white mb-4 flex items-center">
              <Calendar className="mr-2 text-mystic-400" size={20} />
              Última Consulta
            </h2>
            <div>
              {userProfile?.last_oracle_date ? (
                <p className="text-white">
                  {format(new Date(userProfile.last_oracle_date), "d 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              ) : (
                <p className="text-white/60">Nenhuma consulta realizada ainda</p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card-mystic"
          >
            <button
              onClick={signOut}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 rounded-lg transition-all duration-300"
            >
              <LogOut size={20} />
              Sair da Conta
            </button>
          </motion.div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Profile;
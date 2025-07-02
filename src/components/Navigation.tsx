import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sparkles, Image, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/oracle', icon: Sparkles, label: 'Oráculo' },
    { path: '/gallery', icon: Image, label: 'Galeria' },
    { path: '/profile', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
              location.pathname === path
                ? 'text-mystic-400 bg-mystic-500/20'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
        <button
          onClick={signOut}
          className="flex flex-col items-center p-3 rounded-lg transition-all duration-300 text-white/60 hover:text-red-400 hover:bg-red-500/20"
        >
          <LogOut size={20} />
          <span className="text-xs mt-1">Sair</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import Button from '../ui/Button';
import { LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, role, user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Filter links based on role for a clean, non-cluttered look
  const links = [
    { name: 'directory', path: '/clubs' },
    { name: 'events', path: '/events' },
    ...(role !== 'student' && role !== null ? [{ name: 'dashboard', path: '/dashboard' }] : []),
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0d0208]/70 backdrop-blur-2xl border-b border-primary/10 h-20 flex items-center justify-between px-8 transition-all">
      <div className="flex items-center gap-12">
        {/* Aesthetic Metallic Logo */}
        <Link to="/" className="font-bold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-chic">
          clubbed.
        </Link>
        
        {/* Muted, Lowercase Links for that chic look */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-[13px] font-medium tracking-wide lowercase transition-all duration-300 ${
                location.pathname === link.path ? 'text-primary' : 'text-secondary/50 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <div className="flex items-center gap-5">
            {/* User Profile Badge - Soft Rose & Champagne Theme */}
            <Link 
              to="/profile" 
              className="flex items-center gap-3 bg-white/[0.03] border border-primary/10 rounded-full pl-1.5 pr-4 py-1.5 hover:bg-white/[0.08] hover:border-primary/30 transition-all cursor-pointer group shadow-soft-glow"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform border border-primary/20">
                <UserIcon size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-secondary leading-none">{user?.name}</span>
                <span className="text-[10px] text-primary/60 font-medium uppercase tracking-tighter mt-1">{role}</span>
              </div>
            </Link>
            
            {/* Logout with soft hover */}
            <button 
              onClick={handleLogout} 
              className="text-primary/40 hover:text-primary transition-colors duration-300 p-1"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <Link to="/login">
            <Button variant="gradient" size="sm" className="rounded-full px-6 text-xs uppercase tracking-widest h-9">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
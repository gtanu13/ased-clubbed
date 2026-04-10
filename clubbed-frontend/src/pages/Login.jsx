import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // MOCK LOGIN LOGIC based on email input:
    // "admin@rvu.edu.in" -> Admin
    // "president@rvu.edu.in" -> President
    // "anythingelse@rvu.edu.in" -> Student
    
    let assignedRole = 'student';
    if (email.toLowerCase().includes('admin')) {
      assignedRole = 'admin';
    } else if (email.toLowerCase().includes('president')) {
      assignedRole = 'president';
    }
    
    login({ 
      name: email.split('@')[0], // Extracts name from email (e.g., 'tanu' from 'tanu@rvu.edu.in')
      email: email, 
      role: assignedRole 
    });
    
    // Route students to Directory, Presidents/Admins to Dashboard
    navigate(assignedRole === 'student' ? '/clubs' : '/dashboard');
  };

  return (
    <PageTransition className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md glass-panel p-8 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm">Sign in to your Clubbed account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-300 ml-1">RVU Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@rvu.edu.in"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white outline-none focus:border-primary transition-colors placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white outline-none focus:border-primary transition-colors placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs px-1">
            <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white transition-colors">
              <input type="checkbox" className="accent-primary rounded bg-transparent border-white/20" />
              Remember me
            </label>
            <a href="#" className="text-secondary hover:text-accent transition-colors">Forgot Password?</a>
          </div>

          <Button type="submit" variant="gradient" className="w-full mt-6 group">
            Sign In 
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-8">
          Don't have an account? <a href="#" className="text-primary font-medium hover:text-accent">Request access</a>
        </p>
      </div>
    </PageTransition>
  );
}
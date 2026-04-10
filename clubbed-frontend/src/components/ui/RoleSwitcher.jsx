import { useAuthStore } from '../../store/useAuthStore';
import { Shield, User, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RoleSwitcher() {
  const { role, switchRole } = useAuthStore();

  const roles = [
    { id: 'student', icon: User, label: 'Student' },
    { id: 'president', icon: Crown, label: 'President' },
    { id: 'admin', icon: Shield, label: 'Admin' }
  ];

  return (
    <div className="flex bg-black/40 border border-white/10 rounded-full p-1">
      {roles.map((r) => {
        const Icon = r.icon;
        const isActive = role === r.id;
        return (
          <button
            key={r.id}
            onClick={() => switchRole(r.id)}
            className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="role-pill"
                className="absolute inset-0 bg-primary/30 border border-primary/50 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              <Icon size={12} />
              <span className="hidden sm:inline capitalize">{r.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
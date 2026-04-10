import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Members', path: '/dashboard/members', icon: Users },
    { name: 'Events', path: '/dashboard/events', icon: Calendar },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-16 bg-[rgba(10,0,20,0.8)] backdrop-blur-xl border-r border-white/10 p-4">
      <div className="flex flex-col gap-2 mt-4">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          const Icon = link.icon;

          return (
            <Link key={link.name} to={link.path}>
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-[#8a2be2]/20 text-white border border-[#8a2be2]/30' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#00a2ff]' : ''} />
                <span className="font-medium text-sm">{link.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
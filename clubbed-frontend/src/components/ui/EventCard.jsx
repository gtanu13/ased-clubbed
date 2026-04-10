// src/components/ui/EventCard.jsx
import { Link } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EventCard({ event, role }) {
  const isFull = event.seatsLeft === 0;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-panel p-6 flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-lg text-white leading-tight">{event.title}</h3>
          <span className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded text-primary font-bold">
            {event.date}
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-white/40 mb-8">
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-primary" />
            <span className={isFull ? 'text-rose-400' : 'text-primary/80'}>
              {isFull ? 'Waitlist Only' : `${event.seatsLeft} seats available`}
            </span>
          </div>
        </div>
      </div>

      <Link 
        to={`/events/${event.id}/seating`} 
        className={`w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-widest transition-all ${
          event.isRegistered 
            ? 'bg-white/5 text-white/20 cursor-default' 
            : 'bg-gradient-chic text-background hover:shadow-soft-glow'
        }`}
      >
        {event.isRegistered ? "Registered" : (isFull ? "Join Waitlist" : "Register Now")}
      </Link>
    </motion.div>
  );
}
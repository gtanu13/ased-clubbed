import { Calendar, Users } from 'lucide-react';
import Button from './Button';
import { motion } from 'framer-motion';

export default function EventCard({ event, onRegister, role }) {
  const isFull = event.seatsLeft === 0;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-[rgba(26,11,46,0.4)] backdrop-blur-xl border border-[rgba(138,43,226,0.2)] rounded-2xl p-5 flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-white">{event.title}</h3>
          <span className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md text-secondary">
            {event.date}
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span className={isFull ? 'text-rose-400' : 'text-emerald-400'}>
              {event.seatsLeft} seats left
            </span>
          </div>
        </div>
      </div>

      {role === 'student' && (
        <Button 
          variant={event.isRegistered ? "secondary" : (isFull ? "ghost" : "primary")} 
          className="w-full"
          disabled={event.isRegistered}
          onClick={() => onRegister(event.id)}
        >
          {event.isRegistered ? "Registered" : (isFull ? "Join Waitlist" : "Register Now")}
        </Button>
      )}
      {role !== 'student' && (
        <Button variant="secondary" className="w-full">Manage Event</Button>
      )}
    </motion.div>
  );
}
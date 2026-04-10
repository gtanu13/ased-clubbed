import { motion } from 'framer-motion';
import Button from './Button';

export default function SeatPicker({ event, onRegister, onClose }) {
  const availableSeats = event.seatMap.filter(s => s === 0).length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/90 backdrop-blur-xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel max-w-2xl w-full p-10 border-primary/20">
        <div className="flex justify-between items-start mb-10">
          <h2 className="text-2xl font-bold italic tracking-tight text-white">{event.title}</h2>
          <button onClick={onClose} className="text-primary/40 hover:text-primary">✕</button>
        </div>

        {/* Cinematic Screen Label */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full mb-16 shadow-soft-glow" />

        <div className="grid grid-cols-10 gap-3 mb-10">
          {event.seatMap.map((status, index) => (
            <button
              key={index}
              disabled={status === 1 || event.isRegistered}
              onClick={() => onRegister(event.id, index)}
              className={`aspect-square rounded-md transition-all duration-300 ${
                status === 1 ? 'bg-muted/30 cursor-not-allowed' : 'bg-white/5 border border-primary/20 hover:bg-primary/40 hover:shadow-soft-glow'
              } ${event.isRegistered && status === 1 ? 'border-accent shadow-gold-glow' : ''}`}
            />
          ))}
        </div>

        <div className="flex justify-between items-center text-[11px] uppercase tracking-widest font-bold text-primary/60 pt-6 border-t border-white/5">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-white/5 border border-primary/20" /> Available</span>
            <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-muted/30" /> Taken</span>
          </div>
          <span>{availableSeats} seats left</span>
        </div>
      </motion.div>
    </div>
  );
}
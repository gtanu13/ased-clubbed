import { useParams, useNavigate } from 'react-router-dom';
import { useDataStore } from '../store/useDataStore';
import PageTransition from '../components/layout/PageTransition';
import { ArrowLeft } from 'lucide-react';

export default function EventSeating() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, registerForSeat } = useDataStore();
  const event = events.find(e => e.id === id);

  if (!event) return null;

  const handleSeatClick = (index) => {
    registerForSeat(event.id, index);
    alert("Registration Successful!");
    navigate('/events');
  };

  return (
    <PageTransition className="pt-24 max-w-5xl mx-auto px-6 pb-20">
      <button onClick={() => navigate(-1)} className="flex items-center text-[10px] font-bold tracking-widest text-primary/60 hover:text-primary mb-12 transition-colors">
        <ArrowLeft size={14} className="mr-2" /> BACK TO EVENTS
      </button>

      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold italic tracking-tighter text-white mb-2">{event.title}</h1>
        <p className="text-[10px] text-primary/40 uppercase tracking-[0.5em]">Interactive Venue Map</p>
      </div>

      {/* 3D THEATER CONTAINER */}
      <div className="relative perspective-1000">
        
        {/* CINEMATIC SCREEN / STAGE */}
        <div className="relative mb-24 flex flex-col items-center">
          <div className="w-3/4 h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full shadow-[0_-10px_30px_rgba(255,133,161,0.5)] mb-4" />
          <p className="text-[9px] text-primary/40 uppercase tracking-[1em]">Front / Stage</p>
        </div>

        {/* 3D SEATING GRID */}
        <div 
          className="glass-panel p-12 bg-black/40 border-white/5 mx-auto"
          style={{ 
            transform: 'rotateX(25deg)', // This creates the 3D tilt effect
            transformStyle: 'preserve-3d',
            maxWidth: '800px'
          }}
        >
          <div className="grid grid-cols-10 gap-4">
            {(event.seatMap || []).map((status, index) => (
              <button
                key={index}
                disabled={status === 1 || event.isRegistered}
                onClick={() => handleSeatClick(index)}
                className={`
                  aspect-square rounded-t-lg transition-all duration-300 transform hover:scale-110
                  ${status === 1 
                    ? 'bg-rose-500/20 border border-rose-500/40 cursor-not-allowed shadow-[inset_0_0_10px_rgba(244,63,94,0.2)]' 
                    : 'bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>


      {/* DYNAMIC LEGEND & STATS */}
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest mt-12 border-t border-white/5 pt-8">
        <div className="flex gap-10">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-emerald-500/20 border border-emerald-500/40" />
            <span className="text-emerald-500/80">Available</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-rose-500/20 border border-rose-500/40" />
            <span className="text-rose-500/80">Occupied</span>
          </div>
        </div>
        
        <div className="text-white/60">
          <span className="text-primary mr-2">
            {event.totalSeats - (event.seatMap?.filter(s => s === 1).length || 0)}
          </span> 
          Seats Remaining
        </div>
      </div>
    </PageTransition>
  );
}
import { useDataStore } from '../store/useDataStore';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

export default function ClubsDirectory() {
  const { clubs, searchQuery } = useDataStore();

  const filteredClubs = clubs.filter(club => 
    club.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <PageTransition>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent mb-4 uppercase tracking-widest">
          Explore Clubs
        </h1>
        <p className="text-gray-400">Discover and join amazing communities at RV University.</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
      >
        {filteredClubs.map((club) => (
          <Link to={`/club/${club.id}`} key={club.id}>
            <motion.div 
              variants={item}
              className="glass-panel p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-2 hover:border-secondary transition-all duration-300 group aspect-square"
            >
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-primary to-secondary mb-4 group-hover:shadow-[0_0_20px_rgba(0,162,255,0.4)] transition-all">
                <img 
                  src={club.src} 
                  alt={club.name} 
                  className="w-full h-full rounded-full object-cover bg-white"
                />
              </div>
              <h3 className="font-semibold text-sm capitalize text-gray-100 group-hover:text-secondary transition-colors">
                {club.name}
              </h3>
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                <Users size={12} />
                <span>{club.members}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </PageTransition>
  );
}
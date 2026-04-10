import { motion } from 'framer-motion';

export default function Card({ children, className = '', delay = 0, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ y: -5, borderColor: 'rgba(0, 162, 255, 0.5)' }}
      onClick={onClick}
      className={`bg-[rgba(26,11,46,0.4)] backdrop-blur-xl border border-[rgba(138,43,226,0.2)] rounded-2xl p-6 shadow-lg overflow-hidden relative group cursor-pointer ${className}`}
    >
      {/* Subtle hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8a2be2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
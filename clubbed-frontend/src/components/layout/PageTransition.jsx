import { motion } from 'framer-motion';

export default function PageTransition({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`pt-24 px-6 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.div>
  );
}
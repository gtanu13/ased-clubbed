import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';

export default function Home() {
  return (
    <PageTransition className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#8a2be2]/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#00a2ff]/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl">
        <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-6 backdrop-blur-md">
          ✨ Welcome to the new era of campus life
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Manage your clubs with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b388ff] to-[#00a2ff]">
            Zero Friction.
          </span>
        </h1>
        
        <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
          The future of campus life starts here
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link to="/clubs">
            <Button variant="gradient" size="lg" className="px-8">
              Explore Clubs
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg" className="px-8">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
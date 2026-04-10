import { useParams, Link } from 'react-router-dom';
import { useDataStore } from '../store/useDataStore';
import { useAuthStore } from '../store/useAuthStore';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';
import { Users, Calendar, MapPin, ArrowLeft, Share2, Instagram, CheckCircle, ExternalLink } from 'lucide-react';

export default function ClubDetail() {
  const { id } = useParams();
  const { clubs, memberships, applyForMembership } = useDataStore();
  const { user, role } = useAuthStore();
  
  const club = clubs.find((c) => c.id === id);

  if (!club) return null;

  // Check if current student has already applied or joined
  const myMembership = memberships.find(m => m.clubId === id && m.userId === user?.email);
  const hasApplied = myMembership?.status === 'pending';
  const isMember = myMembership?.status === 'approved';

const handleApply = () => {
    // Directly applies using their new Digital CV/Profile!
    applyForMembership(club.id, club.name, user);
    alert(`Application sent! Your profile has been shared with the President of ${club.name}.`);
  };

  // ... down in the return statement for the button ...
  
  {role === 'student' && (
    <Button 
      variant={isMember || hasApplied ? "secondary" : "gradient"} 
      size="md"
      disabled={isMember || hasApplied}
      onClick={handleApply}
    >
      {isMember ? (
        <span className="flex items-center gap-2"><CheckCircle size={16}/> Member</span>
      ) : hasApplied ? (
        "Application Under Review"
      ) : (
        "Send Profile to Apply"
      )}
    </Button>
  )}

  
  return (
    <PageTransition className="pb-12 pt-6 max-w-6xl mx-auto px-6">
      <Link to="/clubs" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to Directory
      </Link>

      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden mb-8 border border-white/10">
        <div className="absolute inset-0 bg-cover bg-center blur-xl opacity-30 scale-110" style={{ backgroundImage: `url(${club.src})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0014] via-[#0a0014]/80 to-transparent"></div>
        
        <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row items-end gap-6">
          <div className="w-32 h-32 rounded-full border-4 border-[#0a0014] overflow-hidden bg-white flex-shrink-0 shadow-2xl">
            <img src={club.src} alt={club.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-grow">
            <div className="inline-block px-3 py-1 bg-primary/20 text-accent text-xs font-semibold rounded-full mb-3 border border-primary/30">
              {club.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 capitalize">{club.name}</h1>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" size="md" className="px-4"><Share2 size={18} /></Button>
            
            {/* Conditional Join Button */}
            {role === 'student' && (
              <Button 
                variant={isMember || hasApplied ? "secondary" : "gradient"} 
                size="md"
                disabled={isMember || hasApplied}
                onClick={handleApply}
              >
                {isMember ? (
                  <span className="flex items-center gap-2"><CheckCircle size={16}/> Member</span>
                ) : hasApplied ? (
                  "Pending Approval"
                ) : (
                  <span className="flex items-center gap-2">Apply to Join <ExternalLink size={16} /></span>
                )}
              </Button>
            )}
            {role === 'president' && <Button variant="secondary">Edit Profile</Button>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-6">
            <h3 className="font-semibold text-white mb-4">Quick Stats</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center"><Users size={18} className="text-primary mr-3" /> {club.members} Members</div>
              <div className="flex items-center"><MapPin size={18} className="text-secondary mr-3" /> RVU Main Campus</div>
              <div className="flex items-center"><Instagram size={18} className="text-pink-500 mr-3" /> @{club.name.replace(/\s+/g, '').toLowerCase()}_rvu</div>
            </div>
        </div>
      </div>
    </PageTransition>
  );
}
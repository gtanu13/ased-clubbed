import { useParams } from 'react-router-dom';
import { useDataStore } from '../store/useDataStore';
import PageTransition from '../components/layout/PageTransition';
import { Trophy, Crown, BookOpen, Users, Calendar, Archive, Clipboard, Film, Megaphone } from 'lucide-react';

export default function ClubDetail() {
  const { id } = useParams();
  const { clubs } = useDataStore();
  const club = clubs.find(c => c.id === id);

  const bentoItems = [
    { icon: <Trophy />, title: "Club Profile", cat: "Essential", size: "large", desc: "Logo, tagline, and social links." },
    { icon: <Crown />, title: "President", cat: "Leadership", desc: "Leadership and domain heads." },
    { icon: <BookOpen />, title: "About Us", cat: "Info", desc: "Mission, vision, and club values." },
    { icon: <Users />, title: "Core Team", cat: "Team", size: "tall", desc: "Tech, Design, and PR leads." },
    { icon: <Calendar />, title: "Events", cat: "Activities", size: "wide", desc: "Upcoming workshops & meetups." },
    { icon: <Archive />, title: "Past Events", cat: "Archive", desc: "Gallery of completed milestones." },
    { icon: <Clipboard />, title: "Records", cat: "Records", desc: "Official event logs and attendance." },
    { icon: <Film />, title: "Media", cat: "Gallery", size: "tall", desc: "Instagram reels & event highlights." },
    { icon: <Megaphone />, title: "Announcements", cat: "Updates", size: "wide", desc: "Recruitments and general news." },
  ];

  return (
    <PageTransition className="pt-24 max-w-7xl mx-auto px-6 pb-20">
      <h1 className="text-5xl font-bold text-center mb-12 tracking-tighter italic bg-gradient-chic bg-clip-text text-transparent">
        {club?.name || 'club detail.'}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {bentoItems.map((item, i) => (
          <div key={i} className={`glass-panel p-8 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-500 ${
            item.size === 'large' ? 'md:col-span-2 md:row-span-2' : 
            item.size === 'wide' ? 'md:col-span-2' : 
            item.size === 'tall' ? 'md:row-span-2' : ''
          }`}>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold opacity-60">{item.cat}</span>
              <div className="text-4xl my-6 text-primary group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed font-light">{item.desc}</p>
            </div>
            <button className="mt-8 text-[10px] font-bold uppercase tracking-widest text-accent flex items-center gap-2 hover:gap-4 transition-all">
              explore <span>→</span>
            </button>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
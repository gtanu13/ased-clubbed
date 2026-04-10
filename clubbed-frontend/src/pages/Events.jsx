import { useDataStore } from '../store/useDataStore';
import { useAuthStore } from '../store/useAuthStore';
import PageTransition from '../components/layout/PageTransition';
import EventCard from '../components/ui/EventCard';
import Button from '../components/ui/Button';

export default function Events() {
  const { events, registerForEvent } = useDataStore();
  const { role } = useAuthStore();

  return (
    <PageTransition className="pt-24 max-w-6xl mx-auto px-6">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#b388ff] to-[#00a2ff] bg-clip-text text-transparent mb-2">
            Campus Events
          </h1>
          <p className="text-gray-400">Discover and register for upcoming activities.</p>
        </div>
        {role !== 'student' && (
          <Button variant="gradient">+ Create Event</Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            role={role}
            onRegister={registerForEvent} 
          />
        ))}
      </div>
    </PageTransition>
  );
}
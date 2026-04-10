import { useDataStore } from '../store/useDataStore';
import { useAuthStore } from '../store/useAuthStore';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';
import { MapPin } from 'lucide-react';

export default function Venues() {
  const { venues, bookVenue, approveVenue } = useDataStore();
  const { role } = useAuthStore();

  return (
    <PageTransition className="pt-24 max-w-5xl mx-auto px-6">
      <h1 className="text-4xl font-bold text-white mb-8">Venue Booking</h1>
      
      <div className="space-y-4">
        {venues.map((venue) => (
          <div key={venue.id} className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <MapPin />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">{venue.name}</h3>
                <p className="text-sm text-gray-400">Capacity: {venue.capacity} people</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`text-xs px-3 py-1 rounded-full border ${
                venue.status === 'available' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                venue.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}>
                {venue.status.toUpperCase()}
              </span>

              {role === 'president' && venue.status === 'available' && (
                <Button size="sm" onClick={() => bookVenue(venue.id)}>Request Booking</Button>
              )}

              {role === 'admin' && venue.status === 'pending' && (
                <div className="flex gap-2">
                  <Button size="sm" variant="gradient" onClick={() => approveVenue(venue.id, true)}>Approve</Button>
                  <Button size="sm" variant="secondary" onClick={() => approveVenue(venue.id, false)}>Reject</Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
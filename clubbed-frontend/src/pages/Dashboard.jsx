import { useAuthStore } from '../store/useAuthStore';
import { useDataStore } from '../store/useDataStore';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';
import { Users, Calendar, CheckCircle, MapPin } from 'lucide-react';

export default function Dashboard() {
  const { user, role } = useAuthStore();
  const { memberships, venues, updateMembershipStatus, approveVenue } = useDataStore();
  
  // President specific data
  const pendingMembers = memberships.filter(m => m.status === 'pending');
  
  // Admin specific data
  const pendingVenues = venues.filter(v => v.status === 'pending');

  return (
    <PageTransition className="pt-24 max-w-6xl mx-auto px-6">
      <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name}</h1>
          <p className="text-primary font-medium uppercase tracking-wider text-sm">{role} Portal</p>
        </div>
        {role === 'president' && <Button variant="gradient">+ Create Event</Button>}
      </div>

      {/* ----------------- PRESIDENT VIEW ----------------- */}
      {role === 'president' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<Users />} title="Total Members" value="120" trend="+12% this month" />
            <StatCard icon={<Calendar />} title="Active Events" value="2" trend="Next event in 4 days" />
            <StatCard icon={<CheckCircle />} title="Pending Applications" value={pendingMembers.length} trend="Needs review" urgent={pendingMembers.length > 0} />
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-xl font-semibold text-white mb-6">New Membership Applications</h3>
            {pendingMembers.length === 0 ? (
              <p className="text-gray-400">No pending applications at the moment.</p>
            ) : (
              <div className="space-y-3">
                {pendingMembers.map(m => (
                  <div key={m.id} className="flex items-center justify-between bg-black/20 border border-white/5 rounded-xl p-4">
                    <div>
                      <p className="font-medium text-white">{m.userName}</p>
                      <p className="text-xs text-gray-400">{m.userId} • Applying for {m.clubName}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="gradient" onClick={() => updateMembershipStatus(m.id, 'approved')}>Approve</Button>
                      <Button size="sm" variant="ghost" onClick={() => updateMembershipStatus(m.id, 'rejected')}>Reject</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------- ADMIN VIEW ----------------- */}
      {role === 'admin' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<MapPin />} title="Total Venues" value={venues.length} trend="System Wide" />
            <StatCard icon={<Users />} title="Total System Users" value="842" trend="Active this week" />
            <StatCard icon={<CheckCircle />} title="Venue Requests" value={pendingVenues.length} trend="Awaiting Approval" urgent={pendingVenues.length > 0} />
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Pending Venue Bookings</h3>
            {pendingVenues.length === 0 ? (
              <p className="text-gray-400">All venue requests have been resolved.</p>
            ) : (
              <div className="space-y-3">
                {pendingVenues.map(v => (
                  <div key={v.id} className="flex items-center justify-between bg-black/20 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center"><MapPin size={18}/></div>
                      <div>
                        <p className="font-medium text-white">{v.name}</p>
                        <p className="text-xs text-amber-400">Requested by Club President</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="gradient" onClick={() => approveVenue(v.id, true)}>Approve</Button>
                      <Button size="sm" variant="secondary" onClick={() => approveVenue(v.id, false)}>Deny</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </PageTransition>
  );
}

function StatCard({ icon, title, value, trend, urgent }) {
  return (
    <div className="glass-panel p-6 relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 text-white/[0.02] transform scale-[2] group-hover:scale-[2.2] transition-transform duration-500">
        {icon}
      </div>
      <div className="text-primary mb-3">{icon}</div>
      <h4 className="text-gray-400 text-sm font-medium">{title}</h4>
      <p className="text-3xl font-bold text-white my-1">{value}</p>
      <p className={`text-xs ${urgent ? 'text-amber-400' : 'text-emerald-400'}`}>{trend}</p>
    </div>
  );
}
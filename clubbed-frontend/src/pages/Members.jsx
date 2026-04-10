import { useDataStore } from '../store/useDataStore';
import { useAuthStore } from '../store/useAuthStore';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';

export default function Members() {
  const { memberships, updateMembershipStatus } = useDataStore();
  const { role } = useAuthStore();

  return (
    <PageTransition className="pt-24 max-w-5xl mx-auto px-6">
      <h1 className="text-4xl font-bold text-white mb-2">Membership Directory</h1>
      <p className="text-gray-400 mb-8">Manage applications and active members.</p>

      {role === 'student' ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Your Applications</h2>
          <p className="text-gray-400">You currently have no pending club applications.</p>
          <Button className="mt-4" variant="secondary">Explore Clubs</Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-white/5 text-xs uppercase text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Target Club</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {memberships.map((m) => (
                <tr key={m.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{m.userName}</td>
                  <td className="px-6 py-4">{m.clubName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${m.status === 'pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    {m.status === 'pending' && (
                      <>
                        <Button size="sm" variant="gradient" onClick={() => updateMembershipStatus(m.id, 'approved')}>Accept</Button>
                        <Button size="sm" variant="ghost" onClick={() => updateMembershipStatus(m.id, 'rejected')}>Deny</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageTransition>
  );
}
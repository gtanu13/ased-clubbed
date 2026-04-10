import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';
import { User, Code, Trophy, Link as LinkIcon, Edit2, Save, Mail, Github } from 'lucide-react';

export default function Profile() {
  const { user, role, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  // Synchronize local edit form when user data loads
  useEffect(() => {
    if (user) setEditForm(user);
  }, [user]);

  if (!user) {
    return (
      <PageTransition className="pt-32 text-center">
        <h2 className="text-2xl font-bold text-white">Please log in to view your profile.</h2>
      </PageTransition>
    );
  }

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  return (
    <PageTransition className="pt-24 max-w-5xl mx-auto px-6">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#b388ff] to-[#00a2ff] bg-clip-text text-transparent">
            Digital CV
          </h1>
          <p className="text-gray-400 mt-2">Showcase your talents and achievements to club presidents.</p>
        </div>
        <Button 
          variant={isEditing ? "gradient" : "secondary"} 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="gap-2"
        >
          {isEditing ? <><Save size={16} /> Save CV</> : <><Edit2 size={16} /> Edit Profile</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-[rgba(26,11,46,0.4)] backdrop-blur-xl border border-[rgba(138,43,226,0.2)] rounded-3xl p-8 flex flex-col items-center text-center shadow-xl">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-secondary p-1 mb-6">
              <div className="w-full h-full rounded-full bg-[#0a0014] flex items-center justify-center border-4 border-[#0a0014]">
                <User size={48} className="text-gray-500" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white capitalize">{user.name}</h2>
            <p className="text-primary font-semibold text-sm mb-6 uppercase tracking-widest">{role}</p>
            
            <div className="w-full space-y-4 pt-6 border-t border-white/10 text-sm">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={16} className="text-secondary" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Github size={16} className="text-secondary" />
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editForm.portfolio || ''} 
                    onChange={(e) => setEditForm({...editForm, portfolio: e.target.value})}
                    className="bg-black/40 border border-white/20 rounded px-2 py-1 w-full text-white outline-none"
                  />
                ) : (
                  <span>{user.portfolio}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-[rgba(26,11,46,0.4)] backdrop-blur-xl border border-[rgba(138,43,226,0.2)] rounded-3xl p-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User size={18} className="text-primary" /> Professional Bio
            </h3>
            {isEditing ? (
              <textarea 
                value={editForm.bio || ''}
                onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-sm text-white outline-none h-32"
              />
            ) : (
              <p className="text-gray-300 leading-relaxed">{user.bio}</p>
            )}
          </div>

          <div className="bg-[rgba(26,11,46,0.4)] backdrop-blur-xl border border-[rgba(138,43,226,0.2)] rounded-3xl p-8">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Code size={18} className="text-secondary" /> Technical Stack
            </h3>
            {isEditing ? (
              <input 
                type="text" 
                value={(editForm.skills || []).join(', ')}
                onChange={(e) => setEditForm({...editForm, skills: e.target.value.split(',').map(s => s.trim())})}
                className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-sm text-white outline-none"
                placeholder="React, Figma, Python..."
              />
            ) : (
              <div className="flex flex-wrap gap-3">
                {(user.skills || []).map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-accent">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[rgba(26,11,46,0.4)] backdrop-blur-xl border border-[rgba(138,43,226,0.2)] rounded-3xl p-8">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Trophy size={18} className="text-amber-400" /> Key Achievements
            </h3>
            {isEditing ? (
              <textarea 
                value={(editForm.achievements || []).join('\n')}
                onChange={(e) => setEditForm({...editForm, achievements: e.target.value.split('\n')})}
                className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-sm text-white outline-none h-32"
                placeholder="List your wins here..."
              />
            ) : (
              <div className="space-y-4">
                {(user.achievements || []).map((ach, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 shadow-[0_0_10px_rgba(0,162,255,0.5)]"></div>
                    <p className="text-gray-300 text-sm">{ach}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
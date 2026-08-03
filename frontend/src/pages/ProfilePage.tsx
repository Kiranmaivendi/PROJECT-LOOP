import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [role, setRole] = useState(user?.role ?? 'Agent');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    window.localStorage.setItem('project-loop-profile-name', name);
    window.localStorage.setItem('project-loop-profile-email', email);
    window.localStorage.setItem('project-loop-profile-role', role);
    setMessage('Profile details updated locally for this browser.');
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
      <h2 className="text-xl font-semibold">Profile</h2>
      <p className="mt-2 text-sm text-slate-400">Update your profile and account preferences.</p>

      <form onSubmit={handleSave} className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Name</label>
          <input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Email</label>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Role</label>
          <select value={role} onChange={(event) => setRole(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none">
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Agent">Agent</option>
          </select>
        </div>
        <button type="submit" className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white">Save profile</button>
        {message ? <p className="text-sm text-emerald-400">{message}</p> : null}
      </form>
    </div>
  );
};

export default ProfilePage;

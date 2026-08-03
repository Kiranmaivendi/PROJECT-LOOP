import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

const OrganizationPage = () => {
  const queryClient = useQueryClient();
  const [inviteEmail, setInviteEmail] = useState('');

  const orgQuery = useQuery<{ name: string; slug: string; members: Array<{ _id: string; name: string; email: string; role: string }> }, Error>({
    queryKey: ['organization'],
    queryFn: async () => {
      const response = await api.get('/organizations');
      return response.data;
    },
  });

  const inviteMutation = useMutation({
    mutationFn: async (email: string) => api.post('/organizations/invite', { email, role: 'Agent' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['organization'] }),
  });

  const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    await inviteMutation.mutateAsync(inviteEmail);
    setInviteEmail('');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
        <h2 className="text-xl font-semibold">Organization Management</h2>
        <p className="mt-2 text-sm text-slate-400">Manage tenants, invite users, and control team access.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="text-lg font-semibold">Team members</h3>
          <div className="mt-4 space-y-3 text-slate-200">
            {orgQuery.data?.members?.map((member: any) => (
              <div key={member._id} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>{member.name}</span>
                  <span>{member.role}</span>
                </div>
                <div className="mt-2 text-slate-400">{member.email}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="text-lg font-semibold">Invite user</h3>
          <form onSubmit={handleInvite} className="mt-4 space-y-4">
            <input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="Email address" className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-slate-100 outline-none" />
            <button type="submit" className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white">Send Invite</button>
          </form>
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-slate-300">
            <div className="text-sm text-slate-400">Organization</div>
            <div className="mt-2 text-lg font-semibold">{orgQuery.data?.name || 'Loading...'}</div>
            <div className="text-sm text-slate-400">{orgQuery.data?.slug}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;

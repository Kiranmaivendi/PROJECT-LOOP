import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

const initialForm = {
  customerName: '',
  email: '',
  product: '',
  source: 'Email',
  feedbackText: '',
  rating: 4,
  date: new Date().toISOString().slice(0, 10),
  category: 'Product',
  status: 'new',
};

const FeedbackPage = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initialForm);

  const feedbackQuery = useQuery<{ _id: string; customerName: string; feedbackText: string; category: string; sentiment: string; rating: number; date: string }[], Error>({
    queryKey: ['feedback'],
    queryFn: async () => {
      const response = await api.get('/feedback?limit=20');
      return response.data.feedback;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (payload: typeof initialForm) => api.post('/feedback', payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['feedback'] }),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createMutation.mutateAsync(form);
    setForm(initialForm);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Feedback Center</h2>
            <p className="text-sm text-slate-400">Capture, search, filter and manage customer feedback.</p>
          </div>
          <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm text-blue-200">Submit new feedback</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="text-lg font-semibold">Add new feedback</h3>
          <div className="mt-5 space-y-4 text-sm text-slate-200">
            {['customerName', 'email', 'product', 'feedbackText'].map((field) => (
              <div key={field}>
                <label className="mb-2 block text-slate-300">{field === 'feedbackText' ? 'Feedback' : field}</label>
                {field === 'feedbackText' ? (
                  <textarea rows={4} value={(form as any)[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none" />
                ) : (
                  <input value={(form as any)[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none" />
                )}
              </div>
            ))}
            <div>
              <label className="mb-2 block text-slate-300">Source</label>
              <select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none">
                <option>Email</option>
                <option>Web</option>
                <option>App</option>
                <option>Chat</option>
              </select>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-slate-300">Rating</label>
                <input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none" />
              </div>
              <div>
                <label className="mb-2 block text-slate-300">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none">
                  <option>Product</option>
                  <option>Billing</option>
                  <option>Support</option>
                  <option>Performance</option>
                </select>
              </div>
            </div>
            <button type="submit" className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white">Submit Feedback</button>
          </div>
        </form>

        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-slate-950/70 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Submitted feedback</h3>
            <span className="text-sm text-slate-400">{feedbackQuery.data?.length ?? 0} items</span>
          </div>
          <div className="mt-5 space-y-4">
            {feedbackQuery.isLoading ? (
              <div className="text-slate-400">Loading feedback...</div>
            ) : (
              feedbackQuery.data?.map((item: any) => (
                <div key={item._id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
                    <span>{item.customerName}</span>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-2 text-slate-100">{item.feedbackText}</div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                    <span className="rounded-full bg-slate-950/80 px-2 py-1">{item.category}</span>
                    <span className="rounded-full bg-slate-950/80 px-2 py-1">{item.sentiment}</span>
                    <span className="rounded-full bg-slate-950/80 px-2 py-1">{item.rating} ★</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;

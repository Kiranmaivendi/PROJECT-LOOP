import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import api from '../lib/api';

const AnalyticsPage = () => {
  const feedbackQuery = useQuery<{ _id: string; category: string; status: string; sentiment: string }[], Error>({
    queryKey: ['feedbackAnalytics'],
    queryFn: async () => {
      const response = await api.get('/feedback?limit=50');
      return response.data.feedback;
    },
  });

  const countsByCategory = useMemo(() => {
    if (!feedbackQuery.data) return [];
    const buckets: Record<string, number> = {};
    feedbackQuery.data.forEach((item) => {
      buckets[item.category] = (buckets[item.category] || 0) + 1;
    });
    return Object.entries(buckets).map(([category, value]) => ({ category, value }));
  }, [feedbackQuery.data]);

  const countsByStatus = useMemo(() => {
    if (!feedbackQuery.data) return [];
    const buckets: Record<string, number> = {};
    feedbackQuery.data.forEach((item) => {
      buckets[item.status] = (buckets[item.status] || 0) + 1;
    });
    return Object.entries(buckets).map(([status, value]) => ({ status, value }));
  }, [feedbackQuery.data]);

  const sentimentData = useMemo(() => {
    if (!feedbackQuery.data) return [];
    const buckets: Record<string, number> = {};
    feedbackQuery.data.forEach((item) => {
      buckets[item.sentiment] = (buckets[item.sentiment] || 0) + 1;
    });
    return Object.entries(buckets).map(([sentiment, value]) => ({ sentiment, value }));
  }, [feedbackQuery.data]);

  const COLORS = ['#22c55e', '#38bdf8', '#f97316'];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
        <h2 className="text-xl font-semibold">Analytics & Insights</h2>
        <p className="mt-2 text-sm text-slate-400">View distributions, trends, and themes with live feedback data.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="text-lg font-semibold">Category Distribution</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countsByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="category" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#1e293b' }} />
                <Bar dataKey="value" fill="#38bdf8">
                  {countsByCategory.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="text-lg font-semibold">Status Breakdown</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={countsByStatus} dataKey="value" nameKey="status" innerRadius={50} outerRadius={90} fill="#22c55e" label />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#1e293b' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="text-lg font-semibold">Sentiment Mix</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sentimentData} dataKey="value" nameKey="sentiment" innerRadius={50} outerRadius={90} fill="#f97316" label />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#1e293b' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="text-lg font-semibold">Word cloud preview</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <span className="rounded-2xl bg-slate-800 px-4 py-3">Billing</span>
            <span className="rounded-2xl bg-slate-800 px-4 py-3">Onboarding</span>
            <span className="rounded-2xl bg-slate-800 px-4 py-3">Export</span>
            <span className="rounded-2xl bg-slate-800 px-4 py-3">Dashboard</span>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-slate-300">
          <h3 className="text-lg font-semibold">Insights</h3>
          <p className="mt-4 text-sm">Use the feedback analytics to spot trends, identify improvement opportunities, and prepare executive summaries for your team.</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>• Review product categories with the highest volume.</li>
            <li>• Track urgency and sentiment across recent submissions.</li>
            <li>• Use reporting exports for distribution.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

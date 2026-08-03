import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import api from '../lib/api';

const DashboardPage = () => {
  const analyticsQuery = useQuery<{ total: number; positivePercent: number; negativePercent: number; averageRating: number }, Error>({
    queryKey: ['analytics'],
    queryFn: async () => {
      const response = await api.get('/feedback/analytics');
      return response.data;
    },
  });

  const feedbackQuery = useQuery<{ _id: string; category: string; sentiment: string; customerName: string; rating: number; date: string; feedbackText: string }[], Error>({
    queryKey: ['recentFeedback'],
    queryFn: async () => {
      const response = await api.get('/feedback?limit=6');
      return response.data.feedback;
    },
  });

  const chartData = useMemo(() => {
    if (!feedbackQuery.data) return [];
    const grouped: Record<string, number> = {};
    feedbackQuery.data.forEach((item: any) => {
      grouped[item.category] = (grouped[item.category] || 0) + 1;
    });
    return Object.entries(grouped).map(([category, count]) => ({ category, count }));
  }, [feedbackQuery.data]);

  const sentimentData = useMemo(() => {
    if (!feedbackQuery.data) return [];
    const result: Record<string, number> = { positive: 0, neutral: 0, negative: 0 };
    feedbackQuery.data.forEach((item) => {
      result[item.sentiment] = (result[item.sentiment] || 0) + 1;
    });
    return Object.entries(result).map(([name, value]) => ({ name, value }));
  }, [feedbackQuery.data]);

  const COLORS = ['#2DD4BF', '#60A5FA', '#F97316'];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
          <div className="text-sm text-slate-400">Total Feedback</div>
          <div className="mt-2 text-3xl font-semibold">{analyticsQuery.data?.total ?? '—'}</div>
          <div className="mt-2 text-slate-400">Live volume from your organization.</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
          <div className="text-sm text-slate-400">Positive %</div>
          <div className="mt-2 text-3xl font-semibold">{analyticsQuery.data?.positivePercent ?? '—'}%</div>
          <div className="mt-2 text-slate-400">Positive sentiment share.</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
          <div className="text-sm text-slate-400">Negative %</div>
          <div className="mt-2 text-3xl font-semibold">{analyticsQuery.data?.negativePercent ?? '—'}%</div>
          <div className="mt-2 text-slate-400">Negative sentiment share.</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
          <div className="text-sm text-slate-400">Average Rating</div>
          <div className="mt-2 text-3xl font-semibold">{analyticsQuery.data?.averageRating ?? '—'}</div>
          <div className="mt-2 text-slate-400">Customer satisfaction mean.</div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Product category trend</h2>
            <span className="text-sm text-slate-400">Latest feedback buckets</span>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="category" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#1e293b' }} />
                <Line type="monotone" dataKey="count" stroke="#38bdf8" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
          <h2 className="text-lg font-semibold">Sentiment mix</h2>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sentimentData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} fill="#2563eb" label>
                  {sentimentData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#1e293b' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur lg:col-span-2">
          <h2 className="text-lg font-semibold">Recent feedback</h2>
          <div className="mt-4 space-y-3">
            {feedbackQuery.data?.slice(0, 5).map((item: any) => (
              <div key={item._id} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>{item.customerName}</span>
                  <span>{item.rating} ★</span>
                </div>
                <div className="mt-2 text-slate-200">{item.feedbackText}</div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                  <span className="rounded-full bg-slate-900 px-2 py-1">{item.category}</span>
                  <span className="rounded-full bg-slate-900 px-2 py-1">{item.sentiment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
          <h2 className="text-lg font-semibold">Top keywords</h2>
          <div className="mt-4 space-y-3 text-slate-300">
            <div className="rounded-2xl bg-slate-950/70 p-3">Billing</div>
            <div className="rounded-2xl bg-slate-950/70 p-3">Support</div>
            <div className="rounded-2xl bg-slate-950/70 p-3">Onboarding</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

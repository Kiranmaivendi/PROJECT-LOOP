import { Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent_60%)] p-6 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-slate-900/70 px-6 py-4 backdrop-blur">
          <div className="text-xl font-semibold">Project LOOP</div>
          <div className="flex gap-3">
            <Link to="/login" className="rounded-full px-4 py-2 text-sm text-slate-300">Login</Link>
            <Link to="/register" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">Get Started</Link>
          </div>
        </header>
        <section className="grid items-center gap-10 rounded-[32px] border border-white/10 bg-slate-900/60 p-10 shadow-2xl md:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-600/20 px-3 py-1 text-sm text-blue-300">
              <Sparkles size={16} /> AI Customer Feedback Intelligence Platform
            </div>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">Turn customer feedback into action with AI.</h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400">Project LOOP helps modern teams analyze feedback, uncover urgency, and deliver product insights faster than ever.</p>
            <div className="mt-8 flex gap-4">
              <Link to="/register" className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white">Start Free</Link>
              <Link to="/dashboard" className="rounded-full border border-white/10 px-6 py-3 font-medium text-slate-200">View Demo</Link>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <div className="flex items-center gap-2 text-blue-300"><Zap size={18} /> Real-time AI insights</div>
              <p className="mt-2 text-sm text-slate-400">Sentiment detection, keyword extraction, urgency scoring, and business actions powered by OpenAI.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <div className="flex items-center gap-2 text-emerald-300"><ShieldCheck size={18} /> Enterprise-ready</div>
              <p className="mt-2 text-sm text-slate-400">JWT auth, role-based access, tenant isolation, secure exports, and deployment-ready architecture.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;

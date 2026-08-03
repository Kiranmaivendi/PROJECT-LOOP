import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { BarChart3, Bot, LayoutDashboard, MessageSquareText, Settings, Users, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/feedback', label: 'Feedback', icon: MessageSquareText },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/ai', label: 'AI Assistant', icon: Bot },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/organization', label: 'Organization', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const Layout = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950/90 text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-white/10 bg-slate-900/70 p-6 md:flex">
          <div className="mb-8">
            <div className="text-2xl font-semibold">Project LOOP</div>
            <p className="text-sm text-slate-400">AI Customer Feedback Intelligence</p>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${isActive ? 'bg-blue-600/20 text-blue-300' : 'text-slate-300 hover:bg-white/10'}`}>
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="font-medium">{user?.name}</div>
            <div className="text-sm text-slate-400">{user?.role}</div>
            <button className="mt-4 flex items-center gap-2 text-sm text-slate-300" onClick={() => { logout(); navigate('/login'); }}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-8">
          <header className="mb-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur">
            <div>
              <div className="text-sm text-slate-400">Customer Intelligence Workspace</div>
              <div className="text-xl font-semibold">Welcome back, {user?.name}</div>
            </div>
            <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white" onClick={() => navigate('/feedback')}>Add Feedback</button>
          </header>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

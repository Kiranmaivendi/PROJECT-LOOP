import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const SettingsPage = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const savedAlerts = window.localStorage.getItem('project-loop-email-alerts');
    const savedApiKey = window.localStorage.getItem('project-loop-api-key');

    if (savedAlerts) {
      setEmailAlerts(savedAlerts === 'true');
    }

    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const saveSettings = () => {
    window.localStorage.setItem('project-loop-email-alerts', String(emailAlerts));
    window.localStorage.setItem('project-loop-api-key', apiKey);
    setStatusMessage('Settings saved locally for this browser.');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
        <h2 className="text-xl font-semibold">Settings</h2>
        <p className="mt-2 text-sm text-slate-400">Manage profile, organization, API keys, and theme preferences.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="text-lg font-semibold">Theme</h3>
          <p className="mt-2 text-sm text-slate-400">Toggle between dark and light mode to match your preference.</p>
          <button onClick={toggleTheme} className="mt-4 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white">
            {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
          </button>
          <p className="mt-3 text-sm text-slate-300">Current theme: {theme === 'dark' ? 'Dark' : 'Light'}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="text-lg font-semibold">API Keys</h3>
          <p className="mt-2 text-sm text-slate-400">Store and rotate custom keys for integrations and automation.</p>
          <input
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            placeholder="Enter API key"
            className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none"
          />
          <button onClick={saveSettings} className="mt-3 rounded-2xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100">
            Save API key
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <p className="mt-2 text-sm text-slate-400">Enable or disable alerts for new feedback and priority issues.</p>
          <div className="mt-4 flex items-center gap-3">
            <span className="rounded-full bg-slate-900/80 px-3 py-2 text-sm text-slate-200">Email alerts</span>
            <button
              onClick={() => {
                const nextValue = !emailAlerts;
                setEmailAlerts(nextValue);
                window.localStorage.setItem('project-loop-email-alerts', String(nextValue));
              }}
              className={`rounded-full px-3 py-2 text-sm font-medium ${emailAlerts ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-200'}`}
            >
              {emailAlerts ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="text-lg font-semibold">Profile</h3>
          <p className="mt-2 text-sm text-slate-400">Update your organization settings, profile, and access controls.</p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-300">
            <div className="font-medium text-slate-100">Signed in as {user?.name ?? 'guest'}</div>
            <div className="mt-2">Email: {user?.email ?? 'Not available'}</div>
            <div className="mt-2">Role: {user?.role ?? 'Unknown'}</div>
          </div>
          {statusMessage ? <p className="mt-3 text-sm text-emerald-400">{statusMessage}</p> : null}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

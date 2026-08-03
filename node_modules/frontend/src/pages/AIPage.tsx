import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';

const prompts = [
  'What are customers complaining about?',
  'Show payment issues.',
  'Summarize last month.',
  'Which feature is requested most?',
];

const AIPage = () => {
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState('');

  const mutation = useMutation<string, Error, string>({
    mutationFn: async (text: string) => {
      const response = await api.post('/chats', { message: text });
      return response.data.answer;
    },
    onSuccess: (data) => setAnswer(data),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    mutation.mutate(message);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
        <h2 className="text-xl font-semibold">AI Assistant</h2>
        <p className="mt-2 text-sm text-slate-400">Ask questions over your feedback corpus using RAG-powered insights.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="text-lg font-semibold">Suggested prompts</h3>
          <div className="mt-4 space-y-3">
            {prompts.map((prompt) => (
              <button key={prompt} type="button" onClick={() => setMessage(prompt)} className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-left text-sm text-slate-200 hover:bg-slate-800">
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-slate-950/70 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm text-slate-300">Ask the assistant</label>
            <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-slate-100 outline-none" />
            <button type="submit" className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-medium text-white">
              {mutation.status === 'pending' ? 'Thinking...' : 'Get answer'}
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <h3 className="text-lg font-semibold">AI Response</h3>
            <p className="mt-3 min-h-[120px] text-slate-200">{answer || 'Ask a question to receive an intelligent summary and insight.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPage;

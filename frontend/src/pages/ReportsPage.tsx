const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
        <h2 className="text-xl font-semibold">Reports & Exports</h2>
        <p className="mt-2 text-sm text-slate-400">Generate PDFs, CSVs, executive summaries and VOC reports.</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <a href="/api/reports/pdf" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-white transition hover:border-blue-500">
          <h3 className="text-lg font-semibold">PDF Report</h3>
          <p className="mt-3 text-sm text-slate-400">Download a summary report of customer feedback and sentiment trends.</p>
        </a>
        <a href="/api/reports/csv" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-white transition hover:border-blue-500">
          <h3 className="text-lg font-semibold">CSV Export</h3>
          <p className="mt-3 text-sm text-slate-400">Export feedback records for offline analysis and reporting.</p>
        </a>
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-white">
          <h3 className="text-lg font-semibold">Voice of Customer Report</h3>
          <p className="mt-3 text-sm text-slate-400">Use the AI assistant and export tools to build VOC insights for leadership.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-white">
          <h3 className="text-lg font-semibold">Monthly AI Summary</h3>
          <p className="mt-3 text-sm text-slate-400">Summarize monthly customer feedback and share actionable next steps.</p>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;

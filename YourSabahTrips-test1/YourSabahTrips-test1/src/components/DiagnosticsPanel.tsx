import { useState } from 'react';
import { runDiagnostics } from '../services/authService';

export function DiagnosticsPanel() {
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRunDiagnostics = async () => {
    setLoading(true);
    try {
      const result = await runDiagnostics();
      setDiagnostics(result);
    } catch (err) {
      setDiagnostics({ error: 'Failed to run diagnostics', details: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        onClick={handleRunDiagnostics}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 text-sm"
      >
        {loading ? 'Running...' : 'Run Diagnostics'}
      </button>

      {diagnostics && (
        <div className="mt-2 p-4 bg-black text-white rounded-lg max-w-md max-h-96 overflow-auto text-xs font-mono">
          <pre>{JSON.stringify(diagnostics, null, 2)}</pre>
          <button
            onClick={() => setDiagnostics(null)}
            className="mt-2 px-2 py-1 bg-red-500 text-white rounded text-xs"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

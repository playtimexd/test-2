import React, { useEffect, useState, useRef } from 'react';
import { RefreshCw, Maximize2, MonitorPlay, Code } from 'lucide-react';
import { Button } from './Button';

interface GamePreviewProps {
  code: string | null;
  status: 'idle' | 'generating' | 'ready' | 'error';
}

export const GamePreview: React.FC<GamePreviewProps> = ({ code, status }) => {
  const [key, setKey] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // When code changes, refresh the iframe
    setKey(prev => prev + 1);
  }, [code]);

  const handleReload = () => {
    setKey(prev => prev + 1);
  };

  const focusIframe = () => {
     iframeRef.current?.focus();
  };

  if (!code && status !== 'generating') {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 bg-slate-900/50">
        <MonitorPlay className="w-16 h-16 mb-4 opacity-20" />
        <p>No game generated yet.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-950">
      {/* Toolbar */}
      <div className="h-12 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-900/80">
        <div className="flex items-center gap-2">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preview</span>
           {status === 'ready' && (
             <span className="flex h-2 w-2 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
           )}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="icon" size="sm" onClick={() => setShowCode(!showCode)} title="Toggle Code View">
            <Code className={`w-4 h-4 ${showCode ? 'text-indigo-400' : ''}`} />
          </Button>
          <Button variant="icon" size="sm" onClick={handleReload} title="Restart Game">
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="icon" size="sm" onClick={() => iframeRef.current?.requestFullscreen()} title="Fullscreen">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative w-full overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
        {status === 'generating' && (
          <div className="absolute inset-0 z-10 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="loader mb-4">
               <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-indigo-300 font-mono text-sm animate-pulse">Compiling Game Assets...</p>
          </div>
        )}

        {showCode ? (
          <div className="absolute inset-0 overflow-auto bg-[#0d1117] p-4 text-xs font-mono text-slate-300">
            <pre className="whitespace-pre-wrap">{code}</pre>
          </div>
        ) : (
           <div className="w-full h-full flex items-center justify-center p-4" onClick={focusIframe}>
            {code && (
              <iframe
                ref={iframeRef}
                key={key}
                srcDoc={code}
                title="Game Preview"
                className="w-full h-full bg-black rounded-lg shadow-2xl shadow-black border border-slate-800"
                sandbox="allow-scripts allow-pointer-lock allow-same-origin allow-forms"
              />
            )}
           </div>
        )}
      </div>
    </div>
  );
};
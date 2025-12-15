import React, { useRef, useEffect } from 'react';
import { Send, Bot, User, Code2 } from 'lucide-react';
import { Message } from '../types';
import { Button } from './Button';

interface ChatAreaProps {
  messages: Message[];
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSelectSample: (prompt: string) => void;
}

const SAMPLE_PROMPTS = [
  "Create a classic Snake game with neon visuals.",
  "Make a space shooter where I dodge asteroids.",
  "Build a Breakout clone with particle effects.",
  "Design a clicker game about mining crypto.",
];

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  input,
  isLoading,
  onInputChange,
  onSubmit,
  onSelectSample
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-slate-900/30 border-r border-slate-800">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
              <Code2 className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-200 mb-2">Start Building</h3>
            <p className="text-sm text-slate-400 max-w-xs mb-8">
              Describe a game you want to play, and I'll write the code for you instantly.
            </p>
            <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
              {SAMPLE_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => onSelectSample(prompt)}
                  className="text-left text-sm p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 transition-all text-slate-300"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-indigo-600' : 'bg-emerald-600'
              }`}
            >
              {msg.role === 'user' ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600/20 text-indigo-100 rounded-tr-none border border-indigo-500/30'
                  : 'bg-slate-800/50 text-slate-200 rounded-tl-none border border-slate-700/50'
              }`}
            >
              {msg.content.split('\n').map((line, i) => (
                <p key={i} className="mb-1 last:mb-0">
                  {line}
                </p>
              ))}
              {msg.hasCode && (
                <div className="mt-2 text-xs flex items-center gap-1 text-emerald-400 font-medium">
                   <Code2 className="w-3 h-3" /> Code generated and updated
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-5 h-5 text-white" />
             </div>
             <div className="bg-slate-800/50 rounded-2xl rounded-tl-none px-4 py-3 border border-slate-700/50 flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Describe your game..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            disabled={isLoading}
          />
          <Button type="submit" disabled={!input.trim() || isLoading} className="rounded-xl aspect-square px-0 w-12 flex items-center justify-center">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};
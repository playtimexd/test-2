import React, { useState } from 'react';
import { 
  Menu, User, Video, Box, Palette, Music, Layout, ArrowLeft, 
  Settings, Plus, Save, MonitorPlay 
} from 'lucide-react';
import { Tool } from '../types';
import { ToolPanel } from './ToolPanel';

interface WorkspaceProps {
  onBack: () => void;
  initialToolId?: string;
}

const SIDEBAR_ITEMS = [
  { id: 'character', icon: User, label: 'Character Lab' },
  { id: 'material', icon: Palette, label: 'Material Lab' },
  { id: 'video', icon: Video, label: 'Video Lab' },
  { id: 'sound', icon: Music, label: 'Sound Lab' },
  { id: 'design', icon: Layout, label: 'Design Lab' },
  { id: '3d', icon: Box, label: '3D Lab' },
];

export const Workspace: React.FC<WorkspaceProps> = ({ onBack, initialToolId }) => {
  const [activeTool, setActiveTool] = useState<string | null>(initialToolId || null);

  // Mock lookup for tool details based on ID
  const getToolDetails = (id: string): Tool => ({
    id,
    name: 'Character Designer', // Simplification: In a real app we'd look this up properly
    description: 'Create characters',
    category: 'Character'
  });

  return (
    <div className="h-screen flex flex-col bg-[#050505] overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-[#222] bg-[#0a0a0a] flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-[#333]"></div>
          <div className="flex items-center gap-2">
             <span className="font-bold text-slate-200">AI GameWorks</span>
             <span className="px-2 py-0.5 rounded bg-[#333] text-[10px] text-slate-400 font-mono">BETA</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500 mr-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#ccff00] rounded-full"></span>
            250 CR
          </div>
          <button className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded hover:bg-[#222]">
            My Library
          </button>
          <button className="bg-[#ccff00] hover:bg-[#b2e600] text-black text-xs font-bold px-4 py-2 rounded flex items-center gap-2">
            Save Workflow As...
          </button>
        </div>
      </header>

      <div className="flex-1 flex relative">
        {/* Sidebar */}
        <div className="w-64 bg-[#0a0a0a] border-r border-[#222] flex flex-col z-20">
           <div className="p-4 border-b border-[#222]">
              <span className="text-xs font-bold text-slate-500 uppercase">Tools</span>
           </div>
           <div className="flex-1 overflow-y-auto">
             {SIDEBAR_ITEMS.map((item) => (
               <div key={item.id}>
                 <button 
                   onClick={() => setActiveTool(activeTool === 'char-designer' ? null : 'char-designer')} // Simplified toggle
                   className="w-full flex items-center justify-between p-4 hover:bg-[#111] text-slate-400 hover:text-slate-200 transition-colors border-b border-[#181818]"
                 >
                   <div className="flex items-center gap-3">
                     <item.icon className="w-4 h-4" />
                     <span className="text-sm font-medium">{item.label}</span>
                   </div>
                   <span className="text-[10px]">▼</span>
                 </button>
                 {/* Expanded state example for Character Lab */}
                 {item.id === 'character' && (
                    <div className="bg-[#0f0f0f]">
                       <button 
                         onClick={() => setActiveTool('char-designer')}
                         className={`w-full text-left pl-11 pr-4 py-2 text-xs transition-colors ${activeTool === 'char-designer' ? 'text-[#ccff00] bg-[#ccff00]/5' : 'text-slate-500 hover:text-slate-300'}`}
                       >
                         Character Designer
                       </button>
                       <button className="w-full text-left pl-11 pr-4 py-2 text-xs text-slate-500 hover:text-slate-300">Multi-View Gen</button>
                       <button className="w-full text-left pl-11 pr-4 py-2 text-xs text-slate-500 hover:text-slate-300">Pose Variants</button>
                    </div>
                 )}
               </div>
             ))}
           </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-[#050505] relative overflow-hidden cursor-crosshair">
          {/* Dot Grid Background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          ></div>

          {/* Empty State */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
            <SparklesIcon className="w-12 h-12 text-[#222] mb-4" />
            <h3 className="text-lg font-bold text-[#333]">Infinite Canvas</h3>
            <p className="text-sm text-[#333]">Select a tool from the sidebar to start.</p>
          </div>
          
          {/* Tool Panels Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {activeTool && (
              <div className="pointer-events-auto w-full h-full relative">
                <ToolPanel 
                  tool={getToolDetails(activeTool)} 
                  onClose={() => setActiveTool(null)} 
                />
              </div>
            )}
          </div>

          {/* Canvas Controls */}
          <div className="absolute bottom-6 left-6 flex flex-col gap-2 pointer-events-auto">
             <div className="flex flex-col bg-[#111] border border-[#222] rounded-lg overflow-hidden">
                <button className="p-2 hover:bg-[#222] text-slate-400 border-b border-[#222]">+</button>
                <button className="p-2 hover:bg-[#222] text-slate-400">-</button>
                <button className="p-2 hover:bg-[#222] text-slate-400 border-t border-[#222]">⛶</button>
             </div>
          </div>
          
          {/* Mini map placeholder */}
          <div className="absolute bottom-6 right-6 w-48 h-32 bg-[#111] border border-[#222] rounded-lg opacity-50 hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
    </div>
  );
};

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.595 9.405L24 12L14.595 14.595L12 24L9.405 14.595L0 12L9.405 9.405L12 0Z" />
    <path d="M6 3L7.2975 7.7025L12 9L7.2975 10.2975L6 15L4.7025 10.2975L0 9L4.7025 7.7025L6 3Z" className="origin-center scale-50 translate-x-[-100%]" />
  </svg>
);

import React from 'react';
import { Sparkles, Box, Video, Palette, User, Music } from 'lucide-react';
import { Tool } from '../types';

interface DashboardProps {
  onOpenTool: (toolId: string) => void;
  onNewProject: () => void;
}

const TOOLS: Tool[] = [
  // Character Lab
  { id: 'char-designer', name: 'Character Designer', description: 'Generate unique characters from text.', category: 'Character', badge: 'NEW' },
  { id: 'multi-view', name: 'Multi-View Gen', description: 'Front/Side/Back reference sheet.', category: 'Character', badge: 'HOT' },
  { id: 'pose', name: 'Pose Variants', description: 'Retarget character to dynamic poses.', category: 'Character' },
  { id: 'skin', name: 'Skin & Outfit', description: 'Reskin/Recolor variants.', category: 'Character' },
  { id: 'expression', name: 'Expression Sheet', description: 'Full emotional range generation.', category: 'Character' },
  { id: 'lipsync', name: 'Lip Sync', description: 'Audio-driven facial animation.', category: 'Character' },
  { id: 'face-swap', name: 'Facial Swap', description: 'Replace identity on any character.', category: 'Character', badge: 'NEW' },
  
  // Material Lab
  { id: 'pbr', name: 'PBR Maps', description: 'Albedo, Normal, Roughness, AO.', category: 'Material', badge: 'HOT' },
  { id: 'tiling', name: 'Seamless Tiling', description: 'Make any photo perfectly tileable.', category: 'Material' },
  { id: 'smart-lib', name: 'Smart Library', description: 'Generate color/wear variants.', category: 'Material', badge: 'NEW' },
  
  // Video Lab
  { id: 'img-cine', name: 'Image → Cinematic', description: 'Walk, Attack, Camera Pan/Tilt.', category: 'Video', badge: 'HOT' },
  { id: 'pv-gen', name: 'Game PV Gen', description: 'Auto-edit trailers from assets.', category: 'Video', badge: 'BETA' },
  
  // 3D Lab
  { id: 'meshy', name: 'Meshy 3D Workshop', description: 'Text/Image to 3D, Rigging.', category: '3D', badge: 'HOT' },
  { id: 'photo-prop', name: 'Photo → 3D Prop', description: 'Single image to 3D asset.', category: '3D' },
];

export const Dashboard: React.FC<DashboardProps> = ({ onOpenTool, onNewProject }) => {
  return (
    <div className="min-h-screen bg-black text-white p-8 overflow-y-auto">
      {/* Hero */}
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center mt-12 mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          The Complete <span className="text-[#ccff00]">Game Studio</span>
        </h1>
        <p className="text-slate-400 text-lg mb-8 max-w-2xl">
          Integrated AI pipeline for Characters, Environments, Sound, and Narrative.
        </p>
        <button 
          onClick={onNewProject}
          className="bg-[#ccff00] hover:bg-[#b2e600] text-black font-bold text-lg px-8 py-3 rounded-lg shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all transform hover:scale-105"
        >
          + New Whiteboard Project
        </button>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto mb-10 flex justify-center flex-wrap gap-2">
        {['All Labs', 'Character Lab', 'Material Lab', 'Video Lab', '3D Lab'].map((tab, i) => (
          <button 
            key={tab}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
              i === 0 
                ? 'bg-white text-black border-white' 
                : 'bg-[#111] text-slate-400 border-slate-800 hover:border-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto space-y-12 pb-20">
        {['Character', 'Material', 'Video', '3D'].map((cat) => {
          const catTools = TOOLS.filter(t => t.category.includes(cat));
          if (catTools.length === 0) return null;

          return (
            <div key={cat}>
              <h3 className="text-[#f472b6] font-bold uppercase tracking-wider text-sm mb-4 pl-1">
                {cat} Lab
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {catTools.map(tool => (
                  <div 
                    key={tool.id}
                    onClick={() => onOpenTool(tool.id)}
                    className="group bg-[#111] border border-slate-800 hover:border-slate-600 rounded-xl p-5 cursor-pointer transition-all hover:bg-[#161616] relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-slate-100 group-hover:text-white">{tool.name}</h4>
                      {tool.badge && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                          tool.badge === 'HOT' ? 'text-orange-400 border-orange-400/30 bg-orange-400/10' :
                          tool.badge === 'NEW' ? 'text-[#ccff00] border-[#ccff00]/30 bg-[#ccff00]/10' :
                          'text-blue-400 border-blue-400/30 bg-blue-400/10'
                        }`}>
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 group-hover:text-slate-400">{tool.description}</p>
                    <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-[#333] w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
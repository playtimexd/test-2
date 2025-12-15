import React, { useState } from 'react';
import { X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Tool } from '../types';
import { generateCharacterImage } from '../services/geminiService';

interface ToolPanelProps {
  tool: Tool;
  onClose: () => void;
}

const STYLES = [
  { id: 'anime', name: 'Anime', icon: '🌸' },
  { id: 'realistic', name: 'Realistic', icon: '📷' },
  { id: 'cyberpunk', name: 'Cyberpunk', icon: '🤖' },
  { id: 'fantasy', name: 'Dark Fantasy', icon: '⚔️' },
  { id: 'pixel', name: 'Pixel Art', icon: '👾' },
  { id: 'clay', name: 'Claymation', icon: '🧱' },
];

export const ToolPanel: React.FC<ToolPanelProps> = ({ tool, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('anime');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGeneratedImage(null);
    
    try {
      const imageBase64 = await generateCharacterImage(prompt, selectedStyle);
      setGeneratedImage(imageBase64);
    } catch (e) {
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="absolute left-8 top-8 w-[380px] bg-[#111] border border-slate-700 rounded-xl shadow-2xl shadow-black overflow-hidden flex flex-col z-50 animate-in slide-in-from-left-4 fade-in duration-200">
      {/* Header */}
      <div className="h-12 bg-[#2a1b26] border-b border-[#f472b6]/20 flex items-center justify-between px-4">
        <span className="font-bold text-slate-100 uppercase tracking-wide text-xs">
          {tool.name}
        </span>
        <button onClick={onClose} className="text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
        {/* Prompt Input */}
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe character..."
            className="w-full h-24 bg-black border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-[#f472b6] placeholder-slate-600 resize-none"
          />
        </div>

        {/* Art Style */}
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">2. Art Style</label>
          <div className="grid grid-cols-2 gap-2">
            {STYLES.map(style => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`flex items-center gap-2 p-2 rounded-lg border text-sm transition-all text-left ${
                  selectedStyle === style.id
                    ? 'bg-[#ccff00]/10 border-[#ccff00] text-[#ccff00]'
                    : 'bg-[#18181b] border-slate-800 text-slate-400 hover:border-slate-600'
                }`}
              >
                <span>{style.icon}</span>
                <span>{style.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Configuration */}
        <div>
           <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">3. Configuration</label>
           <div className="flex gap-4">
              <div className="flex-1">
                <span className="text-xs text-slate-400 mb-1 block">Quality</span>
                <div className="flex bg-[#18181b] rounded-lg p-1 border border-slate-800">
                  <button className="flex-1 py-1 text-xs font-medium rounded bg-[#333] text-white">Standard</button>
                  <button className="flex-1 py-1 text-xs font-medium text-slate-500 hover:text-slate-300">Ultra</button>
                </div>
              </div>
              <div className="flex-1">
                <span className="text-xs text-slate-400 mb-1 block">Quantity</span>
                <div className="flex bg-[#18181b] rounded-lg p-1 border border-slate-800">
                  <button className="flex-1 py-1 text-xs font-medium rounded bg-[#333] text-white">1</button>
                  <button className="flex-1 py-1 text-xs font-medium text-slate-500 hover:text-slate-300">4</button>
                  <button className="flex-1 py-1 text-xs font-medium text-slate-500 hover:text-slate-300">8</button>
                </div>
              </div>
           </div>
        </div>

        {/* Optional Reference */}
        <div>
           <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">4. Style/Pose Reference (Optional)</label>
           <div className="h-20 border border-dashed border-slate-800 rounded-lg flex flex-col items-center justify-center bg-[#0d0d0d] hover:border-slate-600 transition-colors cursor-pointer">
              <ImageIcon className="w-5 h-5 text-slate-600 mb-1" />
              <span className="text-xs text-slate-600">Drop reference image</span>
           </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full py-3 bg-[#65a30d] hover:bg-[#4d7c0f] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg shadow-lime-900/20 transition-all flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Generating...
            </>
          ) : (
            'Generate (1 Credits)'
          )}
        </button>

        {/* Result */}
        {generatedImage && (
          <div className="mt-4 rounded-lg overflow-hidden border border-slate-700 animate-in fade-in zoom-in duration-300">
             <img src={generatedImage} alt="Generated Asset" className="w-full h-auto" />
             <div className="p-2 bg-[#18181b] flex justify-end gap-2">
                <button className="text-xs text-slate-400 hover:text-white">Discard</button>
                <button className="text-xs bg-[#ccff00] text-black px-3 py-1 rounded font-bold hover:bg-[#b2e600]">Save to Canvas</button>
             </div>
          </div>
        )}
      </div>
      
      {/* Pagination/Footer */}
      <div className="h-4 bg-[#111] border-t border-slate-800 flex justify-center items-center">
        <div className="w-2 h-2 rounded-full bg-[#ccff00]"></div>
      </div>
    </div>
  );
};
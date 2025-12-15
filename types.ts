export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'Character' | 'Material' | 'Video' | '3D' | 'Sound' | 'Design';
  badge?: 'NEW' | 'HOT' | 'BETA';
  icon?: string;
}

export interface GeneratedAsset {
  id: string;
  type: 'image' | 'text' | 'code';
  content: string; // Base64 or text
  timestamp: number;
}

export type ViewState = 'dashboard' | 'workspace';

export interface GenerationConfig {
  prompt: string;
  style: string;
  quality: 'Standard' | 'Ultra';
  quantity: number;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  hasCode?: boolean;
}
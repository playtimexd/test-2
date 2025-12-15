import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Workspace } from './components/Workspace';
import { ViewState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedToolId, setSelectedToolId] = useState<string | undefined>(undefined);

  const handleOpenTool = (toolId: string) => {
    setSelectedToolId(toolId);
    setCurrentView('workspace');
  };

  const handleNewProject = () => {
    setSelectedToolId(undefined);
    setCurrentView('workspace');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  if (currentView === 'workspace') {
    return (
      <Workspace 
        onBack={handleBackToDashboard} 
        initialToolId={selectedToolId}
      />
    );
  }

  return (
    <Dashboard 
      onOpenTool={handleOpenTool} 
      onNewProject={handleNewProject} 
    />
  );
}
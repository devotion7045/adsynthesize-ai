import React, { useState } from 'react';
import { TabType, CompetitorAd } from './types';
import { Navbar } from './components/Navbar';
import { CompetitorAuditView } from './components/CompetitorAuditView';
import { AdCopyGeneratorView } from './components/AdCopyGeneratorView';
import { BannerStudioView } from './components/BannerStudioView';
import { VideoCreatorView } from './components/VideoCreatorView';
import { BudgetOptimizerView } from './components/BudgetOptimizerView';
import { WorkspaceModal } from './components/WorkspaceModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('competitor-audit');
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [selectedCompetitorAdForCopy, setSelectedCompetitorAdForCopy] = useState<CompetitorAd | null>(null);

  const handleSendToCopyGenerator = (ad: CompetitorAd) => {
    setSelectedCompetitorAdForCopy(ad);
    setActiveTab('ad-copy-generator');
  };

  return (
    <div className="min-h-screen bg-[#131315] text-[#e5e1e4] flex flex-col font-body-md selection:bg-[#8083ff] selection:text-[#0d0096]">
      {/* Shared Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenWorkspace={() => setIsWorkspaceOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1 flex flex-col overflow-x-hidden">
        {activeTab === 'competitor-audit' && (
          <CompetitorAuditView onSendToCopyGenerator={handleSendToCopyGenerator} />
        )}

        {activeTab === 'ad-copy-generator' && (
          <AdCopyGeneratorView initialCompetitorAd={selectedCompetitorAdForCopy} />
        )}

        {activeTab === 'banner-studio' && <BannerStudioView />}

        {activeTab === 'video-creator' && <VideoCreatorView />}

        {activeTab === 'budget-optimizer' && <BudgetOptimizerView />}
      </main>

      {/* Workspace Modal */}
      <WorkspaceModal
        isOpen={isWorkspaceOpen}
        onClose={() => setIsWorkspaceOpen(false)}
        onSelectTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}


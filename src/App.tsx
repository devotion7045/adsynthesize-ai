import React, { useState, useEffect } from 'react';
import { TabType, CompetitorAd } from './types';
import { Navbar } from './components/Navbar';
import { LandingPageView } from './components/LandingPageView';
import { CompetitorAuditView } from './components/CompetitorAuditView';
import { AdCopyGeneratorView } from './components/AdCopyGeneratorView';
import { BannerStudioView } from './components/BannerStudioView';
import { VideoCreatorView } from './components/VideoCreatorView';
import { BudgetOptimizerView } from './components/BudgetOptimizerView';
import { WorkspaceModal } from './components/WorkspaceModal';
import { AuthModal, UserProfile } from './components/AuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('landing');
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'signup'>('signup');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedCompetitorAdForCopy, setSelectedCompetitorAdForCopy] = useState<CompetitorAd | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('adsynthesize_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse user profile', e);
      }
    }
  }, []);

  const handleOpenAuth = (mode: 'login' | 'signup' = 'signup') => {
    setAuthInitialMode(mode);
    setIsAuthOpen(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('adsynthesize_user');
    setUser(null);
  };

  const handleLoginSuccess = (userProfile: UserProfile) => {
    setUser(userProfile);
    if (activeTab === 'landing') {
      setActiveTab('competitor-audit');
    }
  };

  const handleSendToCopyGenerator = (ad: CompetitorAd) => {
    setSelectedCompetitorAdForCopy(ad);
    setActiveTab('ad-copy-generator');
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FFFFFF] flex flex-col font-sans selection:bg-[#6366F1] selection:text-[#FFFFFF]">
      {/* Shared Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenWorkspace={() => setIsWorkspaceOpen(true)}
        user={user}
        onOpenAuth={handleOpenAuth}
        onSignOut={handleSignOut}
      />

      {/* Main View Container */}
      <main className="flex-1 flex flex-col overflow-x-hidden">
        {activeTab === 'landing' && (
          <LandingPageView
            onSelectTab={(tab) => setActiveTab(tab)}
            onOpenAuth={handleOpenAuth}
            userLoggedIn={!!user}
          />
        )}

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

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authInitialMode}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

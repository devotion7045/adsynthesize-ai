import React, { useState } from 'react';
import { TabType } from '../types';
import { UserProfile } from './AuthModal';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenWorkspace: () => void;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenWorkspace,
  user,
  onOpenAuth,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const tabs: { id: TabType; label: string; shortLabel: string; icon: string }[] = [
    { id: 'competitor-audit', label: 'Competitor Audit', shortLabel: 'Audit', icon: 'analytics' },
    { id: 'ad-copy-generator', label: 'Ad Copy Generator', shortLabel: 'Ad Copy', icon: 'auto_awesome' },
    { id: 'banner-studio', label: 'Banner Studio', shortLabel: 'Banner', icon: 'aspect_ratio' },
    { id: 'video-creator', label: 'Video Creator', shortLabel: 'Video', icon: 'auto_videocam' },
    { id: 'budget-optimizer', label: 'Budget Optimizer', shortLabel: 'Budget', icon: 'database' },
  ];

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 bg-[#131315]/90 border-b border-[#464554]/40 backdrop-blur-md">
        <nav className="flex justify-between items-center w-full px-3 sm:px-6 h-14 sm:h-16 max-w-full mx-auto">
          <div className="flex items-center gap-4 sm:gap-8">
            {/* Brand Logo */}
            <button 
              onClick={() => setActiveTab('competitor-audit')} 
              className="text-lg sm:text-xl font-bold text-[#e5e1e4] flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <span className="material-symbols-filled text-[#c0c1ff] text-xl sm:text-2xl">dataset</span>
              <span className="tracking-tight">AdSynthesize AI</span>
              <span className="hidden lg:inline-flex items-center gap-1 font-mono text-[10px] text-[#4edea3] bg-[#00a572]/15 px-2 py-0.5 rounded border border-[#4edea3]/30">
                <span className="w-1.5 h-1.5 bg-[#4edea3] rounded-full animate-ping"></span>
                Render Live Backend
              </span>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex gap-6 items-center h-16 pt-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`font-mono text-xs tracking-wider pb-4 transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'text-[#c0c1ff] border-b-2 border-[#c0c1ff] font-semibold'
                        : 'text-[#c7c4d7] hover:text-[#c0c1ff]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenWorkspace}
              className="bg-[#201f22] border border-[#464554] hover:border-[#908fa0] px-2.5 sm:px-3 py-1.5 rounded-lg font-mono text-xs text-[#e5e1e4] hover:bg-[#353437] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px] text-[#c0c1ff]">folder_open</span>
              <span className="hidden sm:inline">Workspace</span>
            </button>

            {/* Auth State & User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 bg-[#201f22] border border-[#464554] hover:border-[#8083ff] px-2 py-1 rounded-lg cursor-pointer transition-all"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#8083ff] text-[#1000a9] font-bold text-xs flex items-center justify-center shrink-0">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden sm:inline text-xs font-mono font-medium text-[#e5e1e4] truncate max-w-[110px]">
                    {user.name}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-[#908fa0]">arrow_drop_down</span>
                </button>

                {/* User Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#1e1d21] border border-[#464554] rounded-xl shadow-2xl p-3 space-y-3 z-50 animate-fade-in">
                    <div className="border-b border-[#464554]/60 pb-2">
                      <div className="font-bold text-xs text-[#e5e1e4] truncate">{user.name}</div>
                      <div className="font-mono text-[11px] text-[#908fa0] truncate">{user.email}</div>
                      <div className="mt-1.5 inline-block font-mono text-[10px] text-[#4edea3] bg-[#00a572]/15 px-2 py-0.5 rounded border border-[#4edea3]/30">
                        {user.plan || 'Pro Member'}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full text-left font-mono text-xs text-[#ffb4ab] hover:bg-[#201f22] p-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">logout</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenAuth}
                  className="bg-[#8083ff] text-[#1000a9] hover:bg-[#c0c1ff] px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Sign In / Register
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-[#c7c4d7] hover:text-[#e5e1e4] focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[22px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#131315] border-b border-[#464554] px-3 py-3 space-y-1.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2.5 px-3 rounded-lg font-mono text-xs transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#8083ff]/20 text-[#c0c1ff] font-semibold border-l-2 border-[#c0c1ff]'
                      : 'text-[#c7c4d7] hover:bg-[#201f22]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </div>
                  {isActive && <span className="material-symbols-outlined text-[16px]">chevron_right</span>}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Mobile Sticky Bottom Tab Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#131315]/95 backdrop-blur-lg border-t border-[#464554]/60 px-1 py-1 flex justify-around items-center shadow-2xl">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all ${
                isActive
                  ? 'text-[#c0c1ff] font-bold scale-105'
                  : 'text-[#908fa0] hover:text-[#c7c4d7]'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#c0c1ff]' : ''}`}>
                {tab.icon}
              </span>
              <span className="font-mono text-[9px] mt-0.5 tracking-tight truncate max-w-[62px]">
                {tab.shortLabel}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

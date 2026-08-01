import React, { useState } from 'react';
import { TabType } from '../types';
import { UserProfile } from './AuthModal';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenWorkspace: () => void;
  user: UserProfile | null;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
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
    { id: 'landing', label: 'Home', shortLabel: 'Home', icon: 'home' },
    { id: 'competitor-audit', label: 'Competitor Spy', shortLabel: 'Audit', icon: 'analytics' },
    { id: 'ad-copy-generator', label: 'Ad Copy', shortLabel: 'Ad Copy', icon: 'auto_awesome' },
    { id: 'banner-studio', label: 'Banner Studio', shortLabel: 'Banner', icon: 'aspect_ratio' },
    { id: 'video-creator', label: 'Video Creator', shortLabel: 'Video', icon: 'auto_videocam' },
    { id: 'budget-optimizer', label: 'Budget Engine', shortLabel: 'Budget', icon: 'database' },
  ];

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 bg-[#09090B]/90 border-b border-[#27272A] backdrop-blur-md">
        <nav className="flex justify-between items-center w-full px-3 sm:px-6 h-14 sm:h-16 max-w-full mx-auto">
          <div className="flex items-center gap-4 sm:gap-8">
            {/* Brand Logo */}
            <button 
              onClick={() => setActiveTab('landing')} 
              className="text-lg sm:text-xl font-bold text-[#FFFFFF] flex items-center gap-2 cursor-pointer focus:outline-none group"
            >
              <span className="material-symbols-filled text-[#6366F1] text-xl sm:text-2xl group-hover:scale-110 transition-transform">dataset</span>
              <span className="tracking-tight">AdSynthesize AI</span>
              <span className="hidden lg:inline-flex items-center gap-1 font-mono text-[10px] text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded border border-[#10B981]/30">
                <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-ping"></span>
                Render Live Backend
              </span>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex gap-5 lg:gap-6 items-center h-16 pt-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`font-mono text-xs tracking-wider pb-4 transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'text-[#6366F1] border-b-2 border-[#6366F1] font-semibold'
                        : 'text-[#A1A1AA] hover:text-[#FFFFFF]'
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
              className="bg-[#18181B] border border-[#27272A] hover:border-[#A1A1AA] px-2.5 sm:px-3 py-1.5 rounded-lg font-mono text-xs text-[#FFFFFF] hover:bg-[#27272A] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px] text-[#6366F1]">folder_open</span>
              <span className="hidden sm:inline">Workspace</span>
            </button>

            {/* Auth State & User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 bg-[#18181B] border border-[#27272A] hover:border-[#6366F1] px-2.5 py-1 rounded-lg cursor-pointer transition-all"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#6366F1] text-[#FFFFFF] font-bold text-xs flex items-center justify-center shrink-0">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden sm:inline text-xs font-mono font-medium text-[#FFFFFF] truncate max-w-[110px]">
                    {user.name}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-[#A1A1AA]">arrow_drop_down</span>
                </button>

                {/* User Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#18181B] border border-[#27272A] rounded-xl shadow-2xl p-3 space-y-3 z-50 animate-fade-in">
                    <div className="border-b border-[#27272A] pb-2">
                      <div className="font-bold text-xs text-[#FFFFFF] truncate">{user.name}</div>
                      <div className="font-mono text-[11px] text-[#A1A1AA] truncate">{user.email}</div>
                      <div className="mt-1.5 inline-block font-mono text-[10px] text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded border border-[#10B981]/30">
                        {user.plan || 'Pro Growth Member'}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full text-left font-mono text-xs text-[#EF4444] hover:bg-[#27272A] p-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
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
                  onClick={() => onOpenAuth('login')}
                  className="hidden sm:inline-block font-mono text-xs text-[#A1A1AA] hover:text-[#FFFFFF] px-2.5 py-1.5 cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="bg-[#6366F1] text-[#FFFFFF] hover:bg-[#4F46E5] px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Start Free Trial
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-[#A1A1AA] hover:text-[#FFFFFF] focus:outline-none cursor-pointer"
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
          <div className="md:hidden bg-[#09090B] border-b border-[#27272A] px-3 py-3 space-y-1.5">
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
                      ? 'bg-[#6366F1]/20 text-[#6366F1] font-semibold border-l-2 border-[#6366F1]'
                      : 'text-[#A1A1AA] hover:bg-[#18181B]'
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#09090B]/95 backdrop-blur-lg border-t border-[#27272A] px-1 py-1 flex justify-around items-center shadow-2xl">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg transition-all ${
                isActive
                  ? 'text-[#6366F1] font-bold scale-105'
                  : 'text-[#71717A] hover:text-[#A1A1AA]'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-[#6366F1]' : ''}`}>
                {tab.icon}
              </span>
              <span className="font-mono text-[9px] mt-0.5 tracking-tight truncate max-w-[55px]">
                {tab.shortLabel}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

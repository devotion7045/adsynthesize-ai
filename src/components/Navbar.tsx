import React from 'react';
import { TabType } from '../types';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenWorkspace: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenWorkspace,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'competitor-audit', label: 'Competitor Audit' },
    { id: 'ad-copy-generator', label: 'Ad Copy Generator' },
    { id: 'banner-studio', label: 'Banner Studio' },
    { id: 'video-creator', label: 'Video Creator' },
    { id: 'budget-optimizer', label: 'Budget Optimizer' },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#131315] border-b border-[#464554]/40 backdrop-blur-md">
      <nav className="flex justify-between items-center w-full px-4 sm:px-6 h-16 max-w-full mx-auto">
        <div className="flex items-center gap-8">
          {/* Brand Logo */}
          <button 
            onClick={() => setActiveTab('competitor-audit')} 
            className="text-xl font-bold text-[#e5e1e4] flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            AdSynthesize AI
            <span className="w-2 h-2 bg-[#4edea3] rounded-full inline-block animate-pulse"></span>
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
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenWorkspace}
            className="bg-[#201f22] border border-[#464554] hover:border-[#908fa0] px-3.5 py-1.5 rounded-lg font-mono text-xs text-[#e5e1e4] hover:bg-[#353437] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px] text-[#c0c1ff]">folder_open</span>
            <span>Workspace</span>
          </button>

          {/* User Profile Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#464554] shrink-0 bg-[#353437]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOF4ZmIeIgsXo3RmM3zVtcKmrwVAXSJcvJztIauis8xQjtX6O79vIME61BWtfY-VgCaHOILslYUdEpfpPoIb0Vt73Yjs58NUaSndlIIeJisMG7P3cRpH9NuiPkEhKMohxQiNUQuSTNfPUMy_Akd7tQqiVxgSSfOnwVQ2sLOIi6L_QG1smmIKu_XRGa3QbIH_uT3vCWMGrHkStnBxj_umiEnhKCAZPJPd-vdeWvIpfA39a5BIORkiDo"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#c7c4d7] hover:text-[#e5e1e4] focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#131315] border-b border-[#464554] px-4 py-3 space-y-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left py-2 px-3 rounded-md font-mono text-xs transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-[#8083ff]/20 text-[#c0c1ff] font-semibold border-l-2 border-[#c0c1ff]'
                    : 'text-[#c7c4d7] hover:bg-[#201f22]'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && <span className="material-symbols-outlined text-[16px]">chevron_right</span>}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

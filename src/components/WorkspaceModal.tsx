import React from 'react';
import { TabType } from '../types';

interface WorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: TabType) => void;
}

export const WorkspaceModal: React.FC<WorkspaceModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  if (!isOpen) return null;

  const campaigns = [
    {
      id: 'c1',
      name: 'Lumina Pro Q3 Launch',
      updatedAt: '10 mins ago',
      tab: 'ad-copy-generator' as TabType,
      type: 'Ad Copy Suite',
      variantsCount: 6,
    },
    {
      id: 'c2',
      name: 'Fintech Market Positioning Audit',
      updatedAt: '2 hours ago',
      tab: 'competitor-audit' as TabType,
      type: 'Competitor Intelligence',
      variantsCount: 42,
    },
    {
      id: 'c3',
      name: 'SaaS Black Friday Banners',
      updatedAt: 'Yesterday',
      tab: 'banner-studio' as TabType,
      type: 'Banner Collection',
      variantsCount: 12,
    },
    {
      id: 'c4',
      name: 'Omni-channel Video Motion Sequence',
      updatedAt: '3 days ago',
      tab: 'video-creator' as TabType,
      type: 'Video Sequence',
      variantsCount: 4,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="bg-[#1c1b1d] border border-[#464554] rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative">
        <div className="flex justify-between items-center border-b border-[#464554] pb-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-filled text-[#c0c1ff] text-2xl">
              workspaces
            </span>
            <div>
              <h2 className="text-xl font-bold text-[#e5e1e4]">Workspace Manager</h2>
              <p className="font-mono text-xs text-[#c7c4d7]">
                Manage saved campaigns, exports, and active AI strategy sessions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#c7c4d7] hover:text-[#e5e1e4] p-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs text-[#908fa0] uppercase tracking-wider font-bold">
            Recent Campaigns & Sessions
          </h3>

          <div className="space-y-2">
            {campaigns.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  onSelectTab(c.tab);
                  onClose();
                }}
                className="bg-[#201f22] border border-[#464554] hover:border-[#8083ff] p-4 rounded-xl flex items-center justify-between gap-4 cursor-pointer transition-all hover:bg-[#2a2a2c]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#353437] border border-[#464554] flex items-center justify-center text-[#c0c1ff]">
                    <span className="material-symbols-outlined text-[20px]">
                      {c.tab === 'competitor-audit'
                        ? 'analytics'
                        : c.tab === 'ad-copy-generator'
                        ? 'auto_awesome'
                        : c.tab === 'banner-studio'
                        ? 'aspect_ratio'
                        : 'auto_videocam'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#e5e1e4]">{c.name}</h4>
                    <p className="font-mono text-[11px] text-[#c7c4d7]">
                      {c.type} • {c.variantsCount} assets
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-[#908fa0]">{c.updatedAt}</span>
                  <span className="material-symbols-outlined text-[18px] text-[#c0c1ff]">
                    chevron_right
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-between items-center border-t border-[#464554]">
          <span className="font-mono text-xs text-[#4edea3] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            Cloud Workspace Synchronized
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#8083ff] text-[#0d0096] font-mono text-xs font-semibold rounded-lg hover:bg-[#c0c1ff] transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

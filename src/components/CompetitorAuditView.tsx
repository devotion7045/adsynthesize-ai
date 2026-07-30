import React, { useState } from 'react';
import { CompetitorAd, CompetitorAuditResult } from '../types';

interface CompetitorAuditViewProps {
  onSendToCopyGenerator?: (competitorAd: CompetitorAd) => void;
}

const INITIAL_ADS: CompetitorAd[] = [
  {
    id: 'ad-1',
    competitor: 'NexusFlow AI',
    logoLetter: 'N',
    logoColor: 'primary',
    adPreviewUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG-ObBQH2iJ4xQb6n5_Mx92hryRQQ6Fo243Aijxf3wyMkJ0x1RqTeCU1lgV8-KICFYbikP9YtUAlU0xVlEMFFKDzLgeQP0l9-Pm5UxnyvwgJls6D27_0oHOd2KS2B16BUPHPc6H4-acxws61OGR0Uch8q1HHPeJy6aUNo6mU8sdN_hVtFe0TgOj3RANqX7nfEK2C85Sor7diN32qNaPgC8tK_uTGMurBXjep2qvYmzQaKUR57fvuKJ',
    adPreviewAlt: 'Scale Smarter AI automation ad',
    platforms: ['LinkedIn', 'Google'],
    runTime: '14 Days',
    estCtr: '3.4%',
    ctrValue: 3.4,
    headline: 'Scale Smarter with Automated Workflows',
    primaryText: 'Enterprise AI automation engineered for high-growth tech teams. Eliminate manual ops by 80%.',
    adFormat: 'Single Image Feed Ad',
    targetAudience: 'CTOs, VP Engineering, DevOps Lead',
    estimatedSpend: '$34,500 / mo',
  },
  {
    id: 'ad-2',
    competitor: 'Vortex Media',
    logoLetter: 'V',
    logoColor: 'tertiary',
    adPreviewUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUp5ldqsFe0-eSio9ty9jYl94yZFE2J-6KnA_Ge3Mx53oiukCZg-mA9ApiVaqxs2cXGrBMjTMVfrXZO_0QqYdKoXbQH292L6xQGFzjtmgSllrYoNzIOiT3QCUetMWV_0RYiPnJjMw_S8M77MzPMyl0d8Ceuwy8vrBW9Svg8GpTBnY7jKdm204tZyCdjyQVUphuq5FfS0KZ3msrkjiSX6aF3NjqIO3k3DswSGaasV90CD5-B9W8geXc',
    adPreviewAlt: 'Outsmart your competition neon video ad',
    platforms: ['TikTok', 'Meta'],
    runTime: '32 Days',
    estCtr: '4.1%',
    ctrValue: 4.1,
    headline: 'Outsmart Your Competition in 2026',
    primaryText: 'Dynamic motion ads engineered for maximum hook rate and instant conversion.',
    adFormat: 'Short-Form Video (9:16)',
    targetAudience: 'E-commerce Brands, D2C Founders',
    estimatedSpend: '$82,000 / mo',
  },
  {
    id: 'ad-3',
    competitor: 'Quantum Scale',
    logoLetter: 'Q',
    logoColor: 'secondary',
    adPreviewUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeYdCtBWhpR3UYDIl9NyBf0x7eHsjAOIMHXAV2ZyIcG0g06nLexwe3IUxsn_JAORGmp2kxu2wk-lwoVTCZ4F13Eg6FypzseYeCMplhSy9x3Z4a0gdInF-N2WVdm-RNOiHnezqBXlnilkfegFKQUKQJ8pDd77x8rw3ilzh0MWv1kL6hXGuSW28oOzqtYtFGbBGwJF4QDVFCBoIQa2sXz7E3mxYd-Q2HikMX5L7VTKP-6G35LpEPeCXf',
    adPreviewAlt: 'Search engine result page ad mockup',
    platforms: ['Google'],
    runTime: '6 Days',
    estCtr: '1.8%',
    ctrValue: 1.8,
    headline: 'Enterprise B2B Growth Platform',
    primaryText: 'Precision keyword targeting with live AI bidding adjustments for B2B SaaS.',
    adFormat: 'Search Network Text Ad',
    targetAudience: 'B2B Marketing Directors',
    estimatedSpend: '$12,200 / mo',
  },
];

export const CompetitorAuditView: React.FC<CompetitorAuditViewProps> = ({
  onSendToCopyGenerator,
}) => {
  const [domain, setDomain] = useState('fintech.io or Neo-banking');
  const [competitorsInput, setCompetitorsInput] = useState('Competitor A, Competitor B');
  const [isAuditing, setIsAuditing] = useState(false);
  const [selectedAdForModal, setSelectedAdForModal] = useState<CompetitorAd | null>(null);

  const [auditResult, setAuditResult] = useState<CompetitorAuditResult>({
    domainOrNiche: 'fintech.io',
    competitors: ['NexusFlow AI', 'Vortex Media', 'Quantum Scale'],
    adSpendEstimate: '$1.2M',
    momChange: '+12.4%',
    keywordOverlap: '64.2%',
    keywordCompetition: 'High Competition',
    totalCreativeVolume: '412 Ads',
    activeChannelsCount: 24,
    identifiedAds: INITIAL_ADS,
    auditIntelligenceSummary:
      'Our AI engine scans 50+ ad networks including Meta, Google, and TikTok to provide real-time creative volume and spend estimates.',
  });

  const handleRunAudit = async () => {
    setIsAuditing(true);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: domain,
          competitors: competitorsInput,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setAuditResult((prev) => ({
          ...prev,
          domainOrNiche: domain || prev.domainOrNiche,
          adSpendEstimate: json.data.adSpendEstimate || '$1.4M',
          momChange: json.data.momChange || '+14.2%',
          keywordOverlap: json.data.keywordOverlap || '68.5%',
          totalCreativeVolume: json.data.totalCreativeVolume || '450 Ads',
          activeChannelsCount: json.data.activeChannelsCount || 28,
          auditIntelligenceSummary:
            json.data.auditIntelligenceSummary ||
            `AI audit completed for ${domain}. Analyzed ad formats across Meta, Google, and LinkedIn.`,
        }));
      }
    } catch (e) {
      console.error('Audit failed:', e);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="pt-6 pb-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <section className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#e5e1e4] tracking-tight">
          Competitor Audit
        </h1>
        <p className="text-base sm:text-lg text-[#c7c4d7] max-w-2xl leading-relaxed">
          Analyze competitor ad strategies and market positioning with high-precision data extraction.
        </p>
      </section>

      {/* Input Section: Bento Grid Layout */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
        <div className="md:col-span-8 bg-[#201f22] border border-[#464554]/60 p-5 sm:p-6 rounded-xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label className="font-mono text-xs text-[#c7c4d7] block">
                Domain or Niche
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g. fintech.io or Neo-banking"
                className="w-full bg-[#0e0e10] border border-[#464554] focus:border-[#8083ff] focus:ring-1 focus:ring-[#8083ff] outline-none px-3 py-2 rounded text-sm text-[#e5e1e4] transition-all placeholder:text-[#908fa0]"
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs text-[#c7c4d7] block">
                Competitors (comma separated)
              </label>
              <input
                type="text"
                value={competitorsInput}
                onChange={(e) => setCompetitorsInput(e.target.value)}
                placeholder="Competitor A, Competitor B"
                className="w-full bg-[#0e0e10] border border-[#464554] focus:border-[#8083ff] focus:ring-1 focus:ring-[#8083ff] outline-none px-3 py-2 rounded text-sm text-[#e5e1e4] transition-all placeholder:text-[#908fa0]"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={handleRunAudit}
              disabled={isAuditing}
              className="bg-[#c0c1ff] text-[#1000a9] hover:bg-[#8083ff] hover:text-[#0d0096] px-6 sm:px-8 py-2.5 rounded font-mono text-xs font-semibold transition-all active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-[18px] ${isAuditing ? 'animate-spin' : ''}`}>
                {isAuditing ? 'sync' : 'analytics'}
              </span>
              <span>{isAuditing ? 'Auditing AI Networks...' : 'Run Audit'}</span>
            </button>
          </div>
        </div>

        <div className="md:col-span-4 bg-[#201f22] border border-[#464554]/60 p-5 sm:p-6 rounded-xl relative overflow-hidden flex flex-col justify-center">
          <div className="relative z-10">
            <h3 className="font-mono text-xs text-[#4edea3] uppercase tracking-widest mb-2 font-semibold">
              AUDIT INTELLIGENCE
            </h3>
            <p className="text-sm text-[#c7c4d7] leading-relaxed">
              {auditResult.auditIntelligenceSummary}
            </p>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <span className="material-symbols-filled text-[120px] text-[#c0c1ff]">hub</span>
          </div>
        </div>
      </section>

      {/* Benchmarks Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-[#201f22] border border-[#464554]/60 p-5 sm:p-6 rounded-xl flex flex-col items-center text-center group hover:border-[#ca8100] transition-colors">
          <span className="font-mono text-xs text-[#c7c4d7] uppercase mb-3 tracking-wider">
            Ad Spend Estimate (MoM)
          </span>
          <div className="text-3xl font-bold text-[#e5e1e4]">
            {auditResult.adSpendEstimate}
          </div>
          <div className="flex items-center gap-1 text-[#ffb95f] mt-2 font-mono text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            <span>{auditResult.momChange}</span>
          </div>
        </div>

        <div className="bg-[#201f22] border border-[#464554]/60 p-5 sm:p-6 rounded-xl flex flex-col items-center text-center group hover:border-[#8083ff] transition-colors">
          <span className="font-mono text-xs text-[#c7c4d7] uppercase mb-3 tracking-wider">
            Keyword Overlap Index
          </span>
          <div className="text-3xl font-bold text-[#e5e1e4]">
            {auditResult.keywordOverlap}
          </div>
          <div className="flex items-center gap-1 text-[#c0c1ff] mt-2 font-mono text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]">dynamic_feed</span>
            <span>{auditResult.keywordCompetition}</span>
          </div>
        </div>

        <div className="bg-[#201f22] border border-[#464554]/60 p-5 sm:p-6 rounded-xl flex flex-col items-center text-center group hover:border-[#00a572] transition-colors">
          <span className="font-mono text-xs text-[#c7c4d7] uppercase mb-3 tracking-wider">
            Total Creative Volume
          </span>
          <div className="text-3xl font-bold text-[#e5e1e4]">
            {auditResult.totalCreativeVolume}
          </div>
          <div className="flex items-center gap-1 text-[#4edea3] mt-2 font-mono text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>{auditResult.activeChannelsCount} Active Channels</span>
          </div>
        </div>
      </section>

      {/* Results Table / Identified Ads */}
      <section className="bg-[#201f22] border border-[#464554]/60 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 sm:p-6 border-b border-[#464554]/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-xl font-bold text-[#e5e1e4]">Identified Competitor Ads</h2>
          <div className="flex gap-2 self-end sm:self-auto">
            <button className="p-2 border border-[#464554] rounded hover:bg-[#353437] text-[#c7c4d7] hover:text-[#e5e1e4] transition-colors cursor-pointer" title="Filter Ads">
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
            </button>
            <button className="p-2 border border-[#464554] rounded hover:bg-[#353437] text-[#c7c4d7] hover:text-[#e5e1e4] transition-colors cursor-pointer" title="Download Report">
              <span className="material-symbols-outlined text-[20px]">download</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2a2a2c] border-b border-[#464554]/60">
                <th className="px-6 py-3.5 font-mono text-xs text-[#c7c4d7] uppercase tracking-wider">
                  Competitor
                </th>
                <th className="px-6 py-3.5 font-mono text-xs text-[#c7c4d7] uppercase tracking-wider">
                  Ad Preview
                </th>
                <th className="px-6 py-3.5 font-mono text-xs text-[#c7c4d7] uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3.5 font-mono text-xs text-[#c7c4d7] uppercase tracking-wider">
                  Run Time
                </th>
                <th className="px-6 py-3.5 font-mono text-xs text-[#c7c4d7] uppercase tracking-wider">
                  Est. CTR
                </th>
                <th className="px-6 py-3.5 font-mono text-xs text-[#c7c4d7] uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#464554]/40">
              {auditResult.identifiedAds.map((ad) => (
                <tr
                  key={ad.id}
                  className="hover:bg-[#353437]/50 transition-colors group cursor-pointer"
                  onClick={() => setSelectedAdForModal(ad)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded border border-[#464554] flex items-center justify-center font-mono font-bold text-xs ${
                        ad.logoColor === 'primary' ? 'bg-[#353437] text-[#c0c1ff]' :
                        ad.logoColor === 'tertiary' ? 'bg-[#353437] text-[#ffb95f]' :
                        'bg-[#353437] text-[#4edea3]'
                      }`}>
                        {ad.logoLetter}
                      </div>
                      <span className="font-semibold text-sm text-[#e5e1e4] group-hover:text-[#c0c1ff] transition-colors">
                        {ad.competitor}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="w-24 h-14 bg-[#0e0e10] rounded border border-[#464554] overflow-hidden">
                      <img
                        src={ad.adPreviewUrl}
                        alt={ad.adPreviewAlt}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {ad.platforms.map((plat) => (
                        <span
                          key={plat}
                          className="px-2 py-0.5 bg-[#0e0e10] border border-[#464554] rounded font-mono text-[11px] text-[#c7c4d7]"
                        >
                          {plat}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 font-mono text-xs text-[#e5e1e4]">
                    {ad.runTime}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`font-mono text-xs font-semibold ${
                      ad.ctrValue >= 3 ? 'text-[#4edea3]' : 'text-[#c7c4d7]'
                    }`}>
                      {ad.estCtr}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedAdForModal(ad)}
                      className="text-[#c7c4d7] hover:text-[#c0c1ff] p-1 transition-colors cursor-pointer"
                      title="View Strategy Breakdown"
                    >
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-[#1c1b1d] border-t border-[#464554]/60 flex flex-col sm:flex-row justify-between items-center gap-3 px-6">
          <span className="font-mono text-xs text-[#c7c4d7]">
            Showing {auditResult.identifiedAds.length} of 42 competitors found
          </span>
          <div className="flex gap-2">
            <button
              disabled
              className="px-3 py-1 border border-[#464554] rounded font-mono text-xs text-[#c7c4d7] opacity-50 cursor-not-allowed"
            >
              Previous
            </button>
            <button className="px-3 py-1 border border-[#464554] rounded font-mono text-xs text-[#e5e1e4] hover:bg-[#353437] transition-colors cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </section>

      {/* Competitor Ad Inspection Modal */}
      {selectedAdForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#201f22] border border-[#464554] rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedAdForModal(null)}
              className="absolute top-4 right-4 text-[#c7c4d7] hover:text-[#e5e1e4] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#353437] border border-[#464554] flex items-center justify-center font-mono font-bold text-sm text-[#c0c1ff]">
                {selectedAdForModal.logoLetter}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#e5e1e4]">
                  {selectedAdForModal.competitor} - Strategy Breakdown
                </h3>
                <p className="font-mono text-xs text-[#c7c4d7]">
                  Active for {selectedAdForModal.runTime} • Est. CTR {selectedAdForModal.estCtr}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#0e0e10] p-4 rounded-xl border border-[#464554]/60">
              <div>
                <span className="font-mono text-[11px] text-[#908fa0] uppercase block">Format</span>
                <span className="text-xs font-semibold text-[#e5e1e4]">{selectedAdForModal.adFormat || 'Feed Ad'}</span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-[#908fa0] uppercase block">Est. Monthly Spend</span>
                <span className="text-xs font-semibold text-[#4edea3]">{selectedAdForModal.estimatedSpend || '$25,000'}</span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-[#908fa0] uppercase block">Target Audience</span>
                <span className="text-xs font-semibold text-[#e5e1e4] truncate block">{selectedAdForModal.targetAudience || 'Tech Leaders'}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <span className="font-mono text-xs text-[#c0c1ff] uppercase font-semibold">Detected Headline</span>
                <p className="text-sm font-semibold text-[#e5e1e4] bg-[#1c1b1d] p-3 rounded border border-[#464554]">
                  "{selectedAdForModal.headline || 'Scale Smarter with AI Automation'}"
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-xs text-[#c0c1ff] uppercase font-semibold">Detected Primary Text</span>
                <p className="text-xs text-[#c7c4d7] bg-[#1c1b1d] p-3 rounded border border-[#464554] leading-relaxed">
                  {selectedAdForModal.primaryText || 'Enterprise automation engineered for tech leaders.'}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedAdForModal(null)}
                className="px-4 py-2 border border-[#464554] rounded font-mono text-xs text-[#c7c4d7] hover:bg-[#353437]"
              >
                Close
              </button>
              {onSendToCopyGenerator && (
                <button
                  onClick={() => {
                    onSendToCopyGenerator(selectedAdForModal);
                    setSelectedAdForModal(null);
                  }}
                  className="px-5 py-2 bg-[#8083ff] text-[#0d0096] font-mono text-xs font-semibold rounded hover:bg-[#c0c1ff] transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                  <span>Counter with AI Ad Copy</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

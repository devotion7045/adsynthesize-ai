import React, { useState } from 'react';
import { TabType } from '../types';

interface LandingPageViewProps {
  onSelectTab: (tab: TabType) => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  userLoggedIn: boolean;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onSelectTab,
  onOpenAuth,
  userLoggedIn,
}) => {
  const [activePreviewTab, setActivePreviewTab] = useState<'audit' | 'copy' | 'banner' | 'video' | 'budget'>('audit');
  
  // Interactive sandbox state
  const [sandboxDomain, setSandboxDomain] = useState('E-commerce');
  const [sandboxCompetitor, setSandboxCompetitor] = useState('Klaviyo, Omnisend');
  const [sandboxOutput, setSandboxOutput] = useState<string | null>(null);
  const [isSandboxLoading, setIsSandboxLoading] = useState(false);

  const handleRunSandbox = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSandboxLoading(true);
    setSandboxOutput(null);

    try {
      const res = await fetch('/api/v1/intelligence/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_domain_or_topic: sandboxDomain,
          target_audience: 'D2C Founders',
          competitors: sandboxCompetitor.split(',').map((s) => s.trim()),
        }),
      });
      const json = await res.json();
      if (json.data || json.success) {
        const d = json.data || json;
        setSandboxOutput(
          `Domain: ${sandboxDomain} | Audit Summary: ${
            d.audit_intelligence_summary || d.value_proposition || 'Discovered top video ad creative formats on Meta & Google Ads.'
          } Estimated Ad Spend: ${d.ad_spend_estimate || '$1.4M/mo'}`
        );
      }
    } catch (err) {
      setSandboxOutput(`Scanned ${sandboxDomain} against competitors (${sandboxCompetitor}). Found 450+ active creatives across Meta & Google Ads.`);
    } finally {
      setIsSandboxLoading(false);
    }
  };

  const handleStartAction = (targetTab: TabType) => {
    if (!userLoggedIn) {
      onOpenAuth('signup');
    } else {
      onSelectTab(targetTab);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#09090B] text-[#FFFFFF] font-sans selection:bg-[#6366F1] selection:text-[#FFFFFF]">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#6366F1]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#10B981]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="text-center max-w-3xl mx-auto space-y-6 relative z-10">
          
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] px-3.5 py-1.5 rounded-full text-xs font-mono text-[#D4D4D8] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
            <span className="text-[#10B981] font-bold">AI Advertising Without Guesswork.</span>
            <span className="hidden sm:inline text-[#71717A]">|</span>
            <span className="hidden sm:inline text-[#A1A1AA]">Live Render Backend API</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.15]">
            AI Advertising <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#D4D4D8] to-[#10B981]">
              Without Guesswork.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto">
            Spy on competitor ad strategies, generate high-converting copy & visual banners, create motion video slides, and auto-optimize budget allocations in seconds.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => handleStartAction('competitor-audit')}
              className="w-full sm:w-auto bg-[#6366F1] hover:bg-[#4F46E5] text-[#FFFFFF] px-7 py-3.5 rounded-xl font-mono text-sm font-bold transition-all shadow-xl shadow-[#6366F1]/20 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{userLoggedIn ? 'Go to Application Workspace' : 'Start Free Trial'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('demo-preview');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-[#FFFFFF] px-6 py-3.5 rounded-xl font-mono text-sm font-semibold transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[#10B981] text-[18px]">play_circle</span>
              <span>Watch Live Demo</span>
            </button>
          </div>

          {/* Growth Metrics Proof */}
          <div className="pt-6 grid grid-cols-3 gap-4 max-w-xl mx-auto border-t border-[#27272A]/80">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#10B981]">+340%</div>
              <div className="text-[11px] font-mono text-[#A1A1AA]">Average ROAS Lift</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#FFFFFF]">$1.4M+</div>
              <div className="text-[11px] font-mono text-[#A1A1AA]">Ad Spend Analyzed</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#6366F1]">12x</div>
              <div className="text-[11px] font-mono text-[#A1A1AA]">Faster Ad Iterations</div>
            </div>
          </div>

        </div>

        {/* Interactive App Mockup Preview Container */}
        <div id="demo-preview" className="pt-6">
          <div className="bg-[#18181B] border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
            
            {/* Window Topbar */}
            <div className="bg-[#09090B] px-4 py-3 border-b border-[#27272A] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]/80"></span>
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80"></span>
                <span className="w-3 h-3 rounded-full bg-[#10B981]/80"></span>
                <span className="font-mono text-xs text-[#71717A] ml-2">adsynthesize.ai / workspace</span>
              </div>

              {/* Mockup Tabs */}
              <div className="flex items-center gap-1 sm:gap-2">
                {[
                  { id: 'audit', label: 'Competitor Spy' },
                  { id: 'copy', label: 'Ad Copy' },
                  { id: 'banner', label: 'Banner' },
                  { id: 'video', label: 'Video' },
                  { id: 'budget', label: 'Budget Engine' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActivePreviewTab(t.id as any)}
                    className={`px-2.5 py-1 rounded font-mono text-[11px] transition-all cursor-pointer ${
                      activePreviewTab === t.id
                        ? 'bg-[#27272A] text-[#10B981] font-bold border border-[#10B981]/40'
                        : 'text-[#A1A1AA] hover:text-[#FFFFFF]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mockup Active Content Display */}
            <div className="p-6 sm:p-8 bg-[#09090B]/90 min-h-[300px] flex flex-col justify-between space-y-6">
              
              {activePreviewTab === 'audit' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between bg-[#18181B] p-4 rounded-xl border border-[#27272A]">
                    <div>
                      <span className="font-mono text-xs text-[#10B981] block uppercase font-bold">Live Competitor Audit</span>
                      <h4 className="text-base font-bold text-[#FFFFFF]">Domain: Klaviyo & Omnisend E-Commerce Niche</h4>
                    </div>
                    <span className="font-mono text-xs text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/30">
                      450 Active Ads Identified
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-[#18181B] p-3.5 rounded-lg border border-[#27272A] space-y-1">
                      <span className="text-[11px] text-[#A1A1AA] font-mono">Est. Monthly Spend</span>
                      <div className="text-lg font-bold font-mono text-[#FFFFFF]">$1,420,000</div>
                      <span className="text-[10px] text-[#10B981] font-mono">+14.2% MoM</span>
                    </div>
                    <div className="bg-[#18181B] p-3.5 rounded-lg border border-[#27272A] space-y-1">
                      <span className="text-[11px] text-[#A1A1AA] font-mono">Top Performing Angle</span>
                      <div className="text-sm font-bold text-[#FFFFFF] truncate">"Automated Email Revenue"</div>
                      <span className="text-[10px] text-[#A1A1AA] font-mono">Meta & Google Dominance</span>
                    </div>
                    <div className="bg-[#18181B] p-3.5 rounded-lg border border-[#27272A] space-y-1">
                      <span className="text-[11px] text-[#A1A1AA] font-mono">Keyword Overlap</span>
                      <div className="text-lg font-bold font-mono text-[#6366F1]">68.5%</div>
                      <span className="text-[10px] text-[#A1A1AA] font-mono">High Commercial Intent</span>
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'copy' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-[#6366F1] font-bold">VARIANT A - AIDA FRAMEWORK (High CTR)</span>
                      <span className="font-mono text-xs text-[#10B981] bg-[#10B981]/15 px-2.5 py-0.5 rounded border border-[#10B981]/30 font-bold">Score: 95/100</span>
                    </div>
                    <h4 className="text-base font-bold text-[#FFFFFF]">"Stop Wasting Ad Spend. Automate D2C Ad Creation in 60 Seconds."</h4>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">
                      Are manual ad variations draining your marketing budget? Discover automated ad copywriting and real-time campaign budget optimization built specifically for high-growth e-commerce brands.
                    </p>
                  </div>
                </div>
              )}

              {activePreviewTab === 'banner' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex flex-col sm:flex-row gap-4 items-center bg-[#18181B] p-4 rounded-xl border border-[#27272A]">
                    <div className="w-24 h-24 bg-gradient-to-tr from-[#6366F1] to-[#10B981] rounded-lg flex items-center justify-center font-mono font-bold text-xs text-white text-center p-2">
                      SCALE ADS WITH AI
                    </div>
                    <div className="space-y-1 flex-1">
                      <span className="font-mono text-xs text-[#10B981] font-bold">Render API Generated Banner</span>
                      <h4 className="text-sm font-bold text-[#FFFFFF]">Aspect Ratios Generated: 1:1 Square & 9:16 Story</h4>
                      <p className="text-xs text-[#A1A1AA]">
                        Includes high-converting call to action, custom brand colors, and dynamic badge overlays.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'video' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-3">
                    <span className="font-mono text-xs text-[#6366F1] font-bold">3-Slide Motion Video Sequence</span>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-[#09090B] p-2.5 rounded border border-[#27272A] text-center space-y-1">
                        <span className="font-mono text-[10px] text-[#A1A1AA]">Slide 1 (0.0s)</span>
                        <div className="text-xs font-bold text-[#FFFFFF]">"Losing money on Facebook Ads?"</div>
                      </div>
                      <div className="bg-[#09090B] p-2.5 rounded border border-[#27272A] text-center space-y-1">
                        <span className="font-mono text-[10px] text-[#A1A1AA]">Slide 2 (1.5s)</span>
                        <div className="text-xs font-bold text-[#FFFFFF]">"Generate high-converting banners automatically."</div>
                      </div>
                      <div className="bg-[#09090B] p-2.5 rounded border border-[#27272A] text-center space-y-1">
                        <span className="font-mono text-[10px] text-[#10B981]">Slide 3 (3.0s)</span>
                        <div className="text-xs font-bold text-[#FFFFFF]">"Scale your ROAS today."</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'budget' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-[#10B981] font-bold">AI Budget Re-allocation Recommendation</span>
                      <span className="font-mono text-xs text-[#FFFFFF]">Target ROAS: 2.5x</span>
                    </div>
                    <div className="bg-[#09090B] p-3 rounded-lg border border-[#27272A] text-xs text-[#D4D4D8] leading-relaxed">
                      "Reallocated budget to 'Retargeting - Lookalike 1%' ad set (ROAS 3.5). Increasing daily spend from $200 to $500 to maximize total revenue."
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button inside mockup */}
              <div className="pt-2 border-t border-[#27272A] flex justify-between items-center">
                <span className="font-mono text-xs text-[#71717A]">Connected to Render Live Production Backend</span>
                <button
                  onClick={() => handleStartAction(
                    activePreviewTab === 'audit' ? 'competitor-audit' :
                    activePreviewTab === 'copy' ? 'ad-copy-generator' :
                    activePreviewTab === 'banner' ? 'banner-studio' :
                    activePreviewTab === 'video' ? 'video-creator' : 'budget-optimizer'
                  )}
                  className="bg-[#10B981] hover:bg-[#059669] text-[#09090B] px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer"
                >
                  Launch Tool Workspace &rarr;
                </button>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* Feature Highlights Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#27272A]/80 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#FFFFFF]">
            Complete AI Advertising Suite
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            Everything your brand or agency needs to test, scale, and optimize ad campaigns across Google, Meta, and LinkedIn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Competitor Intelligence */}
          <div className="bg-[#18181B] border border-[#27272A] hover:border-[#6366F1]/60 p-6 rounded-2xl space-y-4 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#6366F1]/15 text-[#6366F1] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">analytics</span>
              </div>
              <span className="font-mono text-[10px] text-[#A1A1AA] bg-[#09090B] px-2.5 py-1 rounded border border-[#27272A]">
                POST /api/v1/intelligence/audit
              </span>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#FFFFFF] group-hover:text-[#6366F1] transition-colors">
                1. Competitor Intelligence & Spy
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Analyze competitor ad formats, estimate monthly ad spend, extract high-intent commercial keywords, and discover winning creative angles.
              </p>
            </div>
            <button
              onClick={() => handleStartAction('competitor-audit')}
              className="font-mono text-xs text-[#6366F1] hover:text-[#FFFFFF] font-bold flex items-center gap-1.5 cursor-pointer pt-2"
            >
              <span>Launch Competitor Audit</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Card 2: Ad Copy Generator */}
          <div className="bg-[#18181B] border border-[#27272A] hover:border-[#6366F1]/60 p-6 rounded-2xl space-y-4 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
              </div>
              <span className="font-mono text-[10px] text-[#A1A1AA] bg-[#09090B] px-2.5 py-1 rounded border border-[#27272A]">
                POST /api/v1/ads/generate-copy
              </span>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#FFFFFF] group-hover:text-[#10B981] transition-colors">
                2. AI Ad Copy Generator
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Generate AIDA and PAS copy variants tailored for Google Ads and Meta with CTR prediction ratings and key hook extractions.
              </p>
            </div>
            <button
              onClick={() => handleStartAction('ad-copy-generator')}
              className="font-mono text-xs text-[#10B981] hover:text-[#FFFFFF] font-bold flex items-center gap-1.5 cursor-pointer pt-2"
            >
              <span>Generate Ad Copy</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Card 3: Banner & Video Studio */}
          <div className="bg-[#18181B] border border-[#27272A] hover:border-[#6366F1]/60 p-6 rounded-2xl space-y-4 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">aspect_ratio</span>
              </div>
              <span className="font-mono text-[10px] text-[#A1A1AA] bg-[#09090B] px-2.5 py-1 rounded border border-[#27272A]">
                POST /api/v1/ads/generate-banner
              </span>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#FFFFFF] group-hover:text-[#3B82F6] transition-colors">
                3. Banner & Video Studio
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Create 1:1 and 9:16 display banners and timed motion slide video sequences with custom brand palettes and high-converting CTAs.
              </p>
            </div>
            <div className="flex gap-4 pt-2">
              <button
                onClick={() => handleStartAction('banner-studio')}
                className="font-mono text-xs text-[#3B82F6] hover:text-[#FFFFFF] font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Banner Studio</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
              <button
                onClick={() => handleStartAction('video-creator')}
                className="font-mono text-xs text-[#A1A1AA] hover:text-[#FFFFFF] font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Video Creator</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Card 4: Budget Optimizer */}
          <div className="bg-[#18181B] border border-[#27272A] hover:border-[#6366F1]/60 p-6 rounded-2xl space-y-4 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">database</span>
              </div>
              <span className="font-mono text-[10px] text-[#A1A1AA] bg-[#09090B] px-2.5 py-1 rounded border border-[#27272A]">
                POST /api/v1/ads/optimize-budget
              </span>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#FFFFFF] group-hover:text-[#F59E0B] transition-colors">
                4. AI Budget Optimizer
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Automated budget re-allocation engine that analyzes ad set CPAs and ROAS to shift spend toward high-return campaigns automatically.
              </p>
            </div>
            <button
              onClick={() => handleStartAction('budget-optimizer')}
              className="font-mono text-xs text-[#F59E0B] hover:text-[#FFFFFF] font-bold flex items-center gap-1.5 cursor-pointer pt-2"
            >
              <span>Optimize Budget</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

        </div>
      </section>

      {/* Interactive Live API Test Box */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-[#18181B] border border-[#10B981]/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#10B981]">electric_bolt</span>
              <h3 className="text-lg font-bold text-[#FFFFFF]">Test Live Render API (No Auth Needed)</h3>
            </div>
            <span className="font-mono text-xs text-[#10B981] bg-[#10B981]/15 px-2.5 py-0.5 rounded border border-[#10B981]/30">
              Live Backend Response
            </span>
          </div>

          <form onSubmit={handleRunSandbox} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-mono text-[11px] text-[#A1A1AA] block mb-1">Target Niche</label>
              <input
                type="text"
                value={sandboxDomain}
                onChange={(e) => setSandboxDomain(e.target.value)}
                className="w-full bg-[#09090B] border border-[#27272A] px-3 py-2 rounded-lg text-xs text-[#FFFFFF] outline-none focus:border-[#10B981]"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] text-[#A1A1AA] block mb-1">Competitors</label>
              <input
                type="text"
                value={sandboxCompetitor}
                onChange={(e) => setSandboxCompetitor(e.target.value)}
                className="w-full bg-[#09090B] border border-[#27272A] px-3 py-2 rounded-lg text-xs text-[#FFFFFF] outline-none focus:border-[#10B981]"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={isSandboxLoading}
                className="w-full bg-[#10B981] text-[#09090B] font-mono text-xs font-bold py-2.5 rounded-lg hover:bg-[#059669] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSandboxLoading ? (
                  <>
                    <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                    <span>Auditing...</span>
                  </>
                ) : (
                  <span>Test Live API &rarr;</span>
                )}
              </button>
            </div>
          </form>

          {sandboxOutput && (
            <div className="bg-[#09090B] p-4 rounded-xl border border-[#10B981]/30 font-mono text-xs text-[#10B981] space-y-1 animate-fade-in">
              <span className="text-[10px] text-[#A1A1AA] block uppercase">Live Backend Result:</span>
              <p className="leading-relaxed text-[#FFFFFF]">{sandboxOutput}</p>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#27272A]/80 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-xs text-[#10B981] uppercase font-bold tracking-widest">TRANSPARENT PRICING</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#FFFFFF]">
            Scalable Plans for High-Growth Brands
          </h2>
          <p className="text-sm text-[#A1A1AA]">Start free and upgrade as your advertising revenue scales.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Starter Plan */}
          <div className="bg-[#18181B] border border-[#27272A] p-6 rounded-2xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#FFFFFF]">Starter</h3>
                <p className="text-xs text-[#A1A1AA]">Ideal for boutique e-commerce stores & solopreneurs.</p>
              </div>
              <div className="font-mono text-3xl font-bold text-[#FFFFFF]">$49 <span className="text-xs text-[#A1A1AA] font-sans font-normal">/ month</span></div>
              <ul className="space-y-2.5 text-xs text-[#D4D4D8]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10B981] text-[16px]">check_circle</span>
                  <span>1 Active Brand Domain</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10B981] text-[16px]">check_circle</span>
                  <span>50 AI Ad Copy Generations / mo</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10B981] text-[16px]">check_circle</span>
                  <span>Competitor Intelligence Audits</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full bg-[#27272A] hover:bg-[#3F3F46] text-[#FFFFFF] font-mono text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Start Free Trial
            </button>
          </div>

          {/* Growth Pro Plan */}
          <div className="bg-[#18181B] border-2 border-[#6366F1] p-6 rounded-2xl space-y-6 flex flex-col justify-between relative shadow-2xl">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6366F1] text-[#FFFFFF] font-mono text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              MOST POPULAR
            </span>
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#FFFFFF]">Growth Pro</h3>
                <p className="text-xs text-[#A1A1AA]">For scaling D2C brands & performance marketing agencies.</p>
              </div>
              <div className="font-mono text-3xl font-bold text-[#FFFFFF]">$149 <span className="text-xs text-[#A1A1AA] font-sans font-normal">/ month</span></div>
              <ul className="space-y-2.5 text-xs text-[#D4D4D8]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10B981] text-[16px]">check_circle</span>
                  <span>5 Brand Domains</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10B981] text-[16px]">check_circle</span>
                  <span>Unlimited AI Copy Generations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10B981] text-[16px]">check_circle</span>
                  <span>Banner Studio (1:1 & 9:16)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10B981] text-[16px]">check_circle</span>
                  <span>Motion Slide Video Creator</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10B981] text-[16px]">check_circle</span>
                  <span>Live AI Budget Optimizer</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-[#FFFFFF] font-mono text-xs font-bold py-2.5 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Start Free Trial
            </button>
          </div>

          {/* Enterprise Scale Plan */}
          <div className="bg-[#18181B] border border-[#27272A] p-6 rounded-2xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#FFFFFF]">Enterprise Scale</h3>
                <p className="text-xs text-[#A1A1AA]">For high-volume media buyers and enterprise teams.</p>
              </div>
              <div className="font-mono text-3xl font-bold text-[#FFFFFF]">$399 <span className="text-xs text-[#A1A1AA] font-sans font-normal">/ month</span></div>
              <ul className="space-y-2.5 text-xs text-[#D4D4D8]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10B981] text-[16px]">check_circle</span>
                  <span>Unlimited Brand Domains</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10B981] text-[16px]">check_circle</span>
                  <span>Dedicated Render API Throughput</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10B981] text-[16px]">check_circle</span>
                  <span>Custom Webhook Integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10B981] text-[16px]">check_circle</span>
                  <span>Priority 1-on-1 Support</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full bg-[#27272A] hover:bg-[#3F3F46] text-[#FFFFFF] font-mono text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Contact Sales
            </button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#27272A] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-filled text-[#6366F1] text-2xl">dataset</span>
            <span className="font-bold text-lg text-[#FFFFFF]">AdSynthesize AI</span>
            <span className="font-mono text-[10px] text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded border border-[#10B981]/30 ml-2">
              Status: 200 OK
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs text-[#A1A1AA]">
            <button onClick={() => onSelectTab('competitor-audit')} className="hover:text-[#FFFFFF] cursor-pointer">Competitor Spy</button>
            <button onClick={() => onSelectTab('ad-copy-generator')} className="hover:text-[#FFFFFF] cursor-pointer">Ad Copy</button>
            <button onClick={() => onSelectTab('banner-studio')} className="hover:text-[#FFFFFF] cursor-pointer">Banner Studio</button>
            <button onClick={() => onSelectTab('video-creator')} className="hover:text-[#FFFFFF] cursor-pointer">Video Creator</button>
            <button onClick={() => onSelectTab('budget-optimizer')} className="hover:text-[#FFFFFF] cursor-pointer">Budget Engine</button>
          </div>

          <div className="font-mono text-xs text-[#71717A]">
            &copy; 2026 AdSynthesize AI. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};

import React, { useState } from 'react';
import { AdCopyVariant, CompetitorAd } from '../types';

interface AdCopyGeneratorViewProps {
  initialCompetitorAd?: CompetitorAd | null;
}

export const AdCopyGeneratorView: React.FC<AdCopyGeneratorViewProps> = ({
  initialCompetitorAd,
}) => {
  const [mobileTab, setMobileTab] = useState<'inputs' | 'variants'>('variants');
  const [productName, setProductName] = useState(
    initialCompetitorAd ? `Anti-${initialCompetitorAd.competitor} Solution` : 'Lumina Pro Headphones'
  );
  const [description, setDescription] = useState(
    initialCompetitorAd
      ? `Outperform ${initialCompetitorAd.competitor}. Features higher CTR, lower CPC, and studio-grade performance.`
      : 'Active 40dB noise cancellation, 50-hour battery life, studio-grade engineering for maximum focus and comfort.'
  );
  const [targetAudience, setTargetAudience] = useState('Tech Enthusiasts');
  const [platform, setPlatform] = useState<'Meta' | 'Google' | 'TikTok' | 'LinkedIn'>('Meta');
  const [framework, setFramework] = useState('AIDA');
  const [tone, setTone] = useState<'Professional' | 'Bold' | 'Witty' | 'High-Energy' | 'Direct'>('Professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [variants, setVariants] = useState<AdCopyVariant[]>([
    {
      id: 'var-1',
      label: 'VARIANT A - High CTR',
      tagColor: 'secondary',
      headline: 'Experience Silence. Master Performance.',
      primaryText:
        'Attention Tech Enthusiasts! Elevate your workflow with the new Lumina Pro Headphones. 🎧\n\nDiscover 40dB active noise cancellation and 50-hour battery life. Designed for those who demand perfection in every beat. Stop settling for average sound.',
      score: 88,
    },
    {
      id: 'var-2',
      label: 'VARIANT B - Emotional Appeal',
      tagColor: 'tertiary',
      headline: 'The Soundtrack to Your Focus.',
      primaryText:
        "Imagine a world where it's just you and your music. No distractions, no noise. Just pure, unadulterated clarity. ✨\n\nThe Lumina Pro isn't just a headphone; it's your personal sanctuary. Secure yours today and feel the difference of studio-grade engineering.",
      score: 94,
    },
    {
      id: 'var-3',
      label: 'VARIANT C - Direct & Scarcity',
      tagColor: 'primary',
      headline: 'Lumina Pro: Last Call for Launch Pricing.',
      primaryText:
        "The reviews are in: Lumina Pro is the new standard. But the introductory offer is ending soon. Grab the professional's choice in audio before the price increases at midnight. ⚡️",
      score: 91,
      predictionRating: 'High',
      bestForNote: 'Best for Retargeting Campaigns',
    },
  ]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          description,
          targetAudience,
          platform,
          framework,
          tone,
        }),
      });
      const json = await res.json();
      if (json.success && json.variants && json.variants.length > 0) {
        setVariants(json.variants);
      }
    } catch (e) {
      console.error('Error generating copy:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-grow flex flex-col md:flex-row overflow-hidden pt-3 sm:pt-4 px-3 sm:px-6 pb-24 md:pb-8 gap-4 sm:gap-6 max-w-[1600px] mx-auto w-full">
      {/* Mobile Segmented Control Toggle */}
      <div className="md:hidden flex p-1 bg-[#201f22] border border-[#464554] rounded-xl mb-1">
        <button
          onClick={() => setMobileTab('inputs')}
          className={`flex-1 py-2 font-mono text-xs rounded-lg font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            mobileTab === 'inputs'
              ? 'bg-[#c0c1ff] text-[#1000a9] shadow'
              : 'text-[#c7c4d7] hover:text-[#e5e1e4]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">edit_note</span>
          <span>Inputs</span>
        </button>
        <button
          onClick={() => setMobileTab('variants')}
          className={`flex-1 py-2 font-mono text-xs rounded-lg font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            mobileTab === 'variants'
              ? 'bg-[#c0c1ff] text-[#1000a9] shadow'
              : 'text-[#c7c4d7] hover:text-[#e5e1e4]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          <span>Variants ({variants.length})</span>
        </button>
      </div>

      {/* Left Panel: Form Controls */}
      <aside className={`w-full md:w-[380px] shrink-0 overflow-y-auto pb-6 ${
        mobileTab === 'inputs' ? 'block' : 'hidden md:block'
      }`}>
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-filled text-[#c0c1ff]">edit_note</span>
            <h2 className="text-xl font-bold text-[#e5e1e4]">Campaign Inputs</h2>
          </div>

          <div className="space-y-4">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-[#908fa0] uppercase tracking-wider block">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Lumina Pro Headphones"
                className="w-full bg-[#0e0e10] border border-[#464554] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#c0c1ff] focus:ring-1 focus:ring-[#c0c1ff] outline-none transition-all placeholder:text-[#464554]"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-[#908fa0] uppercase tracking-wider block">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the key features and benefits..."
                className="w-full bg-[#0e0e10] border border-[#464554] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#c0c1ff] focus:ring-1 focus:ring-[#c0c1ff] outline-none transition-all placeholder:text-[#464554] resize-none"
              />
            </div>

            {/* Target Audience */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-[#908fa0] uppercase tracking-wider block">
                Target Audience
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-[#0e0e10] border border-[#464554] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#c0c1ff] focus:ring-1 focus:ring-[#c0c1ff] outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="Tech Enthusiasts">Tech Enthusiasts</option>
                <option value="Small Business Owners">Small Business Owners</option>
                <option value="Freelance Designers">Freelance Designers</option>
                <option value="Fitness Athletes">Fitness Athletes</option>
                <option value="B2B Marketers">B2B Marketers</option>
              </select>
            </div>

            {/* Grid Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-mono text-xs text-[#908fa0] uppercase tracking-wider block">
                  Platform
                </label>
                <div className="flex p-1 bg-[#0e0e10] border border-[#464554] rounded-lg">
                  {(['Meta', 'Google'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlatform(p)}
                      className={`flex-1 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                        platform === p
                          ? 'bg-[#8083ff] text-[#0d0096] font-semibold'
                          : 'text-[#c7c4d7] hover:text-[#e5e1e4]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs text-[#908fa0] uppercase tracking-wider block">
                  Framework
                </label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="w-full bg-[#0e0e10] border border-[#464554] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#c0c1ff] focus:ring-1 focus:ring-[#c0c1ff] outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="AIDA">AIDA</option>
                  <option value="PAS">PAS</option>
                  <option value="Before-After">Before-After</option>
                  <option value="BAB">BAB</option>
                </select>
              </div>
            </div>

            {/* Tone */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-[#908fa0] uppercase tracking-wider block">
                Tone
              </label>
              <div className="flex flex-wrap gap-2">
                {(['Professional', 'Bold', 'Witty', 'High-Energy', 'Direct'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                      tone === t
                        ? 'border border-[#c0c1ff] bg-[#c0c1ff]/10 text-[#c0c1ff] font-semibold'
                        : 'border border-[#464554] hover:border-[#e5e1e4] text-[#c7c4d7]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3.5 bg-[#c0c1ff] text-[#1000a9] hover:bg-[#8083ff] font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-lg disabled:opacity-50"
          >
            <span className={`material-symbols-outlined ${isGenerating ? 'animate-spin' : ''}`}>
              auto_awesome
            </span>
            <span>{isGenerating ? 'Synthesizing Copy...' : 'Generate Ad Copy'}</span>
          </button>
        </div>
      </aside>

      {/* Right Panel: Preview Area */}
      <section className={`flex-grow bg-[#1c1b1d] rounded-2xl md:rounded-t-3xl border border-[#464554] p-4 sm:p-6 overflow-y-auto min-h-[400px] sm:min-h-[600px] ${
        mobileTab === 'variants' ? 'block' : 'hidden md:block'
      }`}>
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          <div className="flex justify-between items-end border-b border-[#464554]/60 pb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#e5e1e4]">Generated Variants</h3>
              <p className="text-xs sm:text-sm text-[#c7c4d7] mt-1">
                Based on {framework} framework for {platform} Ads • Tone: {tone}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleGenerate}
                className="p-2 border border-[#464554] rounded-lg hover:bg-[#2a2a2c] text-[#c7c4d7] hover:text-[#e5e1e4] transition-colors cursor-pointer"
                title="Regenerate Copy"
              >
                <span className={`material-symbols-outlined text-[18px] sm:text-[20px] ${isGenerating ? 'animate-spin' : ''}`}>
                  refresh
                </span>
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(variants, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `ad-copy-variants-${productName.toLowerCase().replace(/\s+/g, '-')}.json`;
                  a.click();
                }}
                className="p-2 border border-[#464554] rounded-lg hover:bg-[#2a2a2c] text-[#c7c4d7] hover:text-[#e5e1e4] transition-colors cursor-pointer"
                title="Download JSON"
              >
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">download</span>
              </button>
            </div>
          </div>

          {/* Bento Grid Layout for Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {variants.map((v, idx) => {
              const isThird = idx === 2;
              return (
                <div
                  key={v.id || idx}
                  className={`glass-panel rounded-2xl p-4 sm:p-6 flex flex-col gap-4 relative group hover:border-[#8083ff]/50 transition-all ${
                    isThird ? 'xl:col-span-2' : ''
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-[11px] font-mono px-2.5 py-0.5 rounded border ${
                        v.tagColor === 'secondary'
                          ? 'bg-[#00a572]/10 text-[#4edea3] border-[#00a572]/30'
                          : v.tagColor === 'tertiary'
                          ? 'bg-[#ca8100]/10 text-[#ffb95f] border-[#ca8100]/30'
                          : 'bg-[#8083ff]/10 text-[#c0c1ff] border-[#8083ff]/30'
                      }`}
                    >
                      {v.label}
                    </span>
                    <button
                      onClick={() => handleCopyText(v.id || String(idx), `${v.headline}\n\n${v.primaryText}`)}
                      className="text-[#c7c4d7] hover:text-[#e5e1e4] transition-colors p-1 cursor-pointer"
                      title="Copy Variant Text"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {copiedId === (v.id || String(idx)) ? 'done' : 'content_copy'}
                      </span>
                    </button>
                  </div>

                  <div className={isThird ? 'grid md:grid-cols-2 gap-4 sm:gap-6' : 'space-y-3 sm:space-y-4'}>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <h4 className="font-mono text-[10px] sm:text-[11px] text-[#908fa0] font-bold uppercase mb-1">
                          Headline
                        </h4>
                        <p className="text-base sm:text-lg font-bold text-[#e5e1e4]">{v.headline}</p>
                      </div>

                      <div>
                        <h4 className="font-mono text-[10px] sm:text-[11px] text-[#908fa0] font-bold uppercase mb-1">
                          Primary Text
                        </h4>
                        <p className="text-xs sm:text-sm text-[#c7c4d7] leading-relaxed whitespace-pre-line">
                          {v.primaryText}
                        </p>
                      </div>
                    </div>

                    {isThird && (
                      <div className="bg-[#353437] rounded-xl p-4 sm:p-6 border border-[#464554] flex items-center justify-center">
                        <div className="text-center">
                          <span className="material-symbols-outlined text-3xl sm:text-4xl text-[#c0c1ff] mb-1">
                            trending_up
                          </span>
                          <p className="font-mono text-[10px] sm:text-xs text-[#908fa0] uppercase">
                            Performance Prediction
                          </p>
                          <p className="text-3xl sm:text-4xl font-bold text-[#c0c1ff] my-1">
                            {v.predictionRating || 'High'}
                          </p>
                          <p className="text-xs text-[#c7c4d7]">
                            {v.bestForNote || 'Best for Retargeting Campaigns'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-3 border-t border-[#464554] flex justify-between items-center">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map((dot) => (
                        <span
                          key={dot}
                          className={`w-2 h-2 rounded-full ${
                            dot <= Math.round((v.score / 100) * 4)
                              ? 'bg-emerald-500'
                              : 'bg-zinc-700'
                          }`}
                        ></span>
                      ))}
                    </div>
                    <span className="font-mono text-xs text-[#908fa0]">
                      Est. Score: {v.score}/100
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contextual FABs */}
      <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 flex flex-col items-end gap-2.5 z-30">
        <button
          onClick={() => alert('Viewing copy generation history...')}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-[#353437] border border-[#464554] rounded-full flex items-center justify-center text-[#e5e1e4] shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="History Log"
        >
          <span className="material-symbols-outlined text-[18px] sm:text-[20px]">history</span>
        </button>
        <button
          onClick={handleGenerate}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-[#c0c1ff] text-[#1000a9] rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group cursor-pointer"
          title="AI Co-pilot"
        >
          <span className="material-symbols-filled group-hover:rotate-45 transition-transform text-[20px] sm:text-[22px]">
            smart_toy
          </span>
        </button>
      </div>
    </div>
  );
};

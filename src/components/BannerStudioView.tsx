import React, { useState } from 'react';
import { BannerConfig } from '../types';

export const BannerStudioView: React.FC = () => {
  const [config, setConfig] = useState<BannerConfig>({
    headline: 'Synthesize Future',
    subheadline: 'Scale your high-performance ad creative with production-grade AI.',
    ctaText: 'Get Early Access',
    brandHex: '#0F172A',
    accentHex: '#6366F1',
    aspectRatio: '1:1',
    badgeText: 'EXCLUSIVE ACCESS',
    memberCount: '+2K',
    bgStyle: 'gradient',
  });

  const [zoomLevel, setZoomLevel] = useState(85);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = (y - centerY) / 25;
    const ry = (centerX - x) / 25;
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const handleGenerateBanners = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  };

  const handleDownloadBanner = () => {
    alert(`Exporting Banner (${config.aspectRatio}) in high resolution PNG...`);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden w-full h-[calc(100vh-64px)]">
      {/* Left Panel: Controls */}
      <aside className="w-full md:w-[340px] shrink-0 bg-[#131315] border-r border-[#464554]/60 flex flex-col h-full overflow-y-auto">
        <div className="p-6 space-y-8">
          {/* Content Strategy */}
          <div>
            <h2 className="font-mono text-xs text-[#908fa0] mb-4 flex items-center gap-2 font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] text-[#c0c1ff]">edit_note</span>
              CONTENT STRATEGY
            </h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#c7c4d7]">HEADLINE</label>
                <input
                  type="text"
                  value={config.headline}
                  onChange={(e) => setConfig({ ...config, headline: e.target.value })}
                  className="w-full bg-[#0e0e10] border border-[#464554] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#c0c1ff] focus:ring-1 focus:ring-[#c0c1ff] outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#c7c4d7]">SUBHEADLINE</label>
                <textarea
                  rows={2}
                  value={config.subheadline}
                  onChange={(e) => setConfig({ ...config, subheadline: e.target.value })}
                  className="w-full bg-[#0e0e10] border border-[#464554] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#c0c1ff] focus:ring-1 focus:ring-[#c0c1ff] outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#c7c4d7]">CTA TEXT</label>
                <input
                  type="text"
                  value={config.ctaText}
                  onChange={(e) => setConfig({ ...config, ctaText: e.target.value })}
                  className="w-full bg-[#0e0e10] border border-[#464554] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:border-[#c0c1ff] focus:ring-1 focus:ring-[#c0c1ff] outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Visual Tokens */}
          <div>
            <h2 className="font-mono text-xs text-[#908fa0] mb-4 flex items-center gap-2 font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] text-[#c0c1ff]">palette</span>
              VISUAL TOKENS
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#c7c4d7]">BRAND HEX</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={config.brandHex}
                    onChange={(e) => setConfig({ ...config, brandHex: e.target.value })}
                    className="w-9 h-9 rounded border border-[#464554] bg-transparent cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={config.brandHex}
                    onChange={(e) => setConfig({ ...config, brandHex: e.target.value })}
                    className="flex-1 bg-[#0e0e10] border border-[#464554] rounded-lg px-2 py-1.5 font-mono text-xs text-[#e5e1e4] focus:border-[#c0c1ff] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#c7c4d7]">ACCENT HEX</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={config.accentHex}
                    onChange={(e) => setConfig({ ...config, accentHex: e.target.value })}
                    className="w-9 h-9 rounded border border-[#464554] bg-transparent cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={config.accentHex}
                    onChange={(e) => setConfig({ ...config, accentHex: e.target.value })}
                    className="flex-1 bg-[#0e0e10] border border-[#464554] rounded-lg px-2 py-1.5 font-mono text-xs text-[#e5e1e4] focus:border-[#c0c1ff] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Output Format */}
          <div>
            <h2 className="font-mono text-xs text-[#908fa0] mb-4 flex items-center gap-2 font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] text-[#c0c1ff]">aspect_ratio</span>
              OUTPUT FORMAT
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfig({ ...config, aspectRatio: '1:1' })}
                className={`flex-1 h-12 border rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  config.aspectRatio === '1:1'
                    ? 'border-[#c0c1ff] bg-[#8083ff]/20 text-[#c0c1ff] font-semibold'
                    : 'border-[#464554] text-[#c7c4d7] hover:border-[#c0c1ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">crop_square</span>
                <span className="font-mono text-xs">1:1</span>
              </button>

              <button
                type="button"
                onClick={() => setConfig({ ...config, aspectRatio: '9:16' })}
                className={`flex-1 h-12 border rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  config.aspectRatio === '9:16'
                    ? 'border-[#c0c1ff] bg-[#8083ff]/20 text-[#c0c1ff] font-semibold'
                    : 'border-[#464554] text-[#c7c4d7] hover:border-[#c0c1ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">crop_portrait</span>
                <span className="font-mono text-xs">9:16</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-[#464554]">
            <button
              onClick={handleGenerateBanners}
              disabled={isGenerating}
              className="w-full bg-[#c0c1ff] text-[#1000a9] hover:bg-[#8083ff] py-3.5 rounded-xl font-bold font-mono text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <span className={`material-symbols-outlined ${isGenerating ? 'animate-spin' : ''}`}>
                auto_awesome
              </span>
              <span>{isGenerating ? 'Synthesizing Banners...' : 'GENERATE BANNERS'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Right Panel: Preview Canvas */}
      <section className="flex-1 bg-[#131315] relative flex flex-col overflow-hidden h-full">
        {/* Canvas Toolbar */}
        <div className="h-14 border-b border-[#464554]/60 px-6 flex items-center justify-between bg-[#1c1b1d]/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#908fa0] flex items-center gap-2">
              PREVIEW CANVAS
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping"></span>
              LIVE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
              className="p-2 hover:bg-[#353437] rounded-lg text-[#c7c4d7] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">zoom_out</span>
            </button>
            <span className="font-mono text-xs text-[#c7c4d7] w-12 text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
              className="p-2 hover:bg-[#353437] rounded-lg text-[#c7c4d7] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">zoom_in</span>
            </button>
            <div className="w-px h-4 bg-[#464554] mx-1"></div>
            <button
              onClick={handleDownloadBanner}
              className="p-2 hover:bg-[#353437] rounded-lg text-[#c7c4d7] cursor-pointer"
              title="Export Banner"
            >
              <span className="material-symbols-outlined text-[20px]">file_download</span>
            </button>
          </div>
        </div>

        {/* Preview Canvas Area */}
        <div className="flex-1 preview-canvas flex items-center justify-center p-8 sm:p-12 overflow-auto custom-scrollbar">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              width: config.aspectRatio === '1:1' ? '480px' : '340px',
              height: config.aspectRatio === '1:1' ? '480px' : '580px',
              backgroundColor: config.brandHex,
              transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${zoomLevel / 100})`,
              transition: 'width 0.4s ease, height 0.4s ease, transform 0.1s ease-out',
            }}
            className="relative rounded-xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.6)] border border-[#464554]/40 flex flex-col justify-between p-8 sm:p-10 shrink-0"
          >
            {/* Dynamic Ambient Background Glow */}
            <div
              className="absolute bottom-0 right-0 w-72 h-72 blur-[120px] opacity-30 pointer-events-none"
              style={{ backgroundColor: config.accentHex }}
            />
            <div
              className="absolute -top-10 -left-10 w-48 h-48 blur-[100px] opacity-20 pointer-events-none"
              style={{ backgroundColor: '#4edea3' }}
            />

            {/* Banner Header */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="text-white font-bold text-xl tracking-tighter flex items-center gap-1.5">
                <span
                  className="material-symbols-filled text-2xl"
                  style={{ color: '#4edea3' }}
                >
                  dataset
                </span>
                <span>SYNTH.AI</span>
              </div>
              <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 font-mono text-[10px] text-white/80 uppercase tracking-widest">
                {config.badgeText}
              </div>
            </div>

            {/* Banner Body Content */}
            <div className="relative z-10 space-y-5 my-auto">
              <div className="space-y-2">
                <h1
                  className={`font-bold text-white tracking-tight leading-[0.95] ${
                    config.aspectRatio === '1:1' ? 'text-4xl sm:text-[46px]' : 'text-3xl sm:text-[38px]'
                  }`}
                >
                  {config.headline}
                </h1>
                <p className="text-zinc-300 text-sm sm:text-base max-w-[85%] leading-relaxed">
                  {config.subheadline}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  style={{ backgroundColor: config.accentHex }}
                  className="px-6 py-3.5 text-white font-bold font-mono text-xs rounded-lg shadow-lg flex items-center gap-2 group hover:opacity-90 transition-all cursor-pointer"
                >
                  <span>{config.ctaText}</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                {/* Avatar Stack */}
                <div className="flex -space-x-2.5 items-center">
                  <div className="w-9 h-9 rounded-full border-2 border-[#0F172A] overflow-hidden bg-zinc-800">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-di8Yu2P0POiH_2ZITJwPVYY-s91zx41pAO2cupltupKMfzgqkQCK1Pw9ZRXxsYs2C9G0iU6IzMrj1C-Io1plYSvHmNByxUAxjm-M1iNvdq7Ic1ioRnOr6iFYdYPworfdjHYtp9RRnWkTueG9GgGeHx_Wmu00aiM8qhgXkFGWJKr7rMm8Cm7IDgCHAFwXo2jYgTe_BcCj4KyY3w8UQBpKkvKmCUSOibOcmSwMmKfmjr0lad_GA4A1"
                      alt="Avatar 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-9 h-9 rounded-full border-2 border-[#0F172A] overflow-hidden bg-zinc-700">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCViHK9J5LYsqKI0x2EpcomQ1SDqjZJ2unGWmhTYlryldWjDwqynGjaaE7GPZyGJh9WV_otA7kUb4vyuz6XyTBx93FJ_zlJSUWOdVBDDvBwtqVWOd_Z1mbmxFqakT7L4uY64PjNKPbWXwPGAhCibkfgebZ44uMe6hHkBanf2oizzvOrtWXBjt7miiSWT99_fvjTkvlNsksEYgbFbnhoBJlVa3M0nD_VQWYvb9pam_d7-87SgnqGpkSB"
                      alt="Avatar 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-9 h-9 rounded-full border-2 border-[#0F172A] overflow-hidden bg-zinc-600">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAowyvkIqHUNEAZRm5Kb18FzvM4RjgBhk2dtIU5HJl6rQ84ewebrMsdG1x0L6v67zOd7l7wHtG-cAjhCQFMs1ew8TrPsnM5d_7FTUO7mfxSBrDE59ey7VJNnJZQRIxKAKCqTYldYWHRPcsKscPDm9cgsGUvZz-LOMQ6xw00t2Xutw2HSlsLX10pP8PgZjFVtv-P9ZwZvUpRfRSY1sgxy04eVk-qI4e44Hvlo2NxTbUiZlrPk1DuqwHK"
                      alt="Avatar 3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-9 h-9 rounded-full border-2 border-[#0F172A] bg-[#6366F1] flex items-center justify-center text-[10px] font-bold text-white">
                    {config.memberCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="h-10 border-t border-[#464554]/60 px-6 flex items-center justify-between bg-[#131315]">
          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] text-[#908fa0] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">speed</span> Rendering: 12ms
            </span>
            <span className="font-mono text-[11px] text-[#908fa0] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#4edea3]">done_all</span> All changes saved
            </span>
          </div>
          <div className="font-mono text-[11px] text-[#908fa0]">v2.4.0-production</div>
        </div>
      </section>
    </div>
  );
};

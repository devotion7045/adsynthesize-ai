import React, { useState, useEffect } from 'react';
import { VideoSlide } from '../types';

export const VideoCreatorView: React.FC = () => {
  const [brandIdentity, setBrandIdentity] = useState('Luminar Pro');
  const [hooks, setHooks] = useState<string[]>([
    'Unlock your creative peak.',
    'Efficiency meets elegance.',
  ]);
  const [ctaText, setCtaText] = useState('Start Free Trial');
  const [slideDuration, setSlideDuration] = useState(3.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [slides, setSlides] = useState<VideoSlide[]>([
    {
      id: 'slide-1',
      title: 'Intro: Hook #1',
      hookText: 'Unlock your creative peak.',
      timestamp: '00:00',
      durationSeconds: 3.5,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-70ehQwqCTGrVlUMCeAIIixOyYAO3q2SMF3UhskvDs6EL2N1RTCiFrkWTZA28HK4f0UeDk5LNXjKVPQf2QSfFFWXR5KDjpRMRPT24deCS0OURZSY1HflO2ykJTvFqipmoSeAiPv2inC2vhZePMbRGMPn3aGp6GrOh93fwnqXMOxquJtMJiBpiMTByWXAA8dfA7R5mAnerMPjK8dUoDY3s5uwQtUNKLZYujsTRDAMkrmKYq-n3kep7',
      imageAlt: 'High-end workstation cinematic shot',
    },
    {
      id: 'slide-2',
      title: 'Feature: Algorithm Performance',
      hookText: 'Efficiency meets elegance.',
      timestamp: '00:03',
      durationSeconds: 3.5,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiIjsqJeMX96VW18mSSzQjMUATCf0uJtThmXBT4eLT3eIvz2tehQ-CO1VLPXThELsiXzchZusnE7iZZBWti_arBt2g_ayprlu17FQd-EZP96aVTNMlpUd1JiNYxWzchbfK1mXrq62s1ToHoNAUrg__sZiVO6woCuR1Mk7KNvGnPQfBwvfpKsozwzVhszE5pJ-FkoMMy0H2np4mQDjzSr69fGAp5Bw0jq5p-5lwSkGlT4WIFxTTr6Um',
      imageAlt: 'Data fiber optics visualization',
    },
    {
      id: 'slide-3',
      title: 'Benefit: Creative Efficiency',
      hookText: 'Scale your ad workflow in 1-click.',
      timestamp: '00:07',
      durationSeconds: 3.5,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9bsNqIpVo2gWAe-WauRtLj9u6FBBtbyQCpWXpkbS1I7LMcsuE86AOnYH3Ai03DvkSypCGj0uXJdzoJACbm6Fo7RaybQL-xGQB83sh7Y_DYel95H-Z-_rfPa6CkBV9G1eXCrShPevMqB2_hzc269d6p9uEk0WQBhI5ujhVHuANPVe8muv-HlvNjTIBRADoDG6eZgLbMnPlRXfaGVwH3lIdlslV-8j6QsXVNth70DL-Tsmidr1HhbWE',
      imageAlt: 'Creative workspace dashboard',
    },
    {
      id: 'slide-4',
      title: 'Outro: Conversion',
      hookText: 'Join 10,000+ top marketers today.',
      timestamp: '00:10',
      durationSeconds: 3.5,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf9JrgDl0sfiPRwNzDfW5refeovn30u76izisu_GxHbl5FXVcMEaYIQvrQCzy66ap_Wp-KqeWJONk76lw4nb7JTlyHE0DgM_E1dnzEK4NdRsbrHhGle32lStzAGY7ZGlkfJCRgtREpVPkiFiuQl2lmrfPgo018gFgFFT8Hx_5PJW-ay2y7y4BDw38sDwuJHiz6IY4qQsgeVpgWQMCRgAJbT0AiH9h569JEK17xl9xcr1ldUUg7Q0yG',
      imageAlt: 'Minimalist call-to-action slide',
    },
  ]);

  // Video playback simulation timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveSlideIndex((prev) => (prev + 1) % slides.length);
      }, slideDuration * 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, slideDuration, slides.length]);

  const handleAddHook = () => {
    setHooks([...hooks, 'New AI Hook statement']);
  };

  const handleRemoveHook = (index: number) => {
    setHooks(hooks.filter((_, i) => i !== index));
  };

  const currentSlide = slides[activeSlideIndex] || slides[0];

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden w-full h-[calc(100vh-64px)]">
      {/* Left Panel: Sequence Setup Inputs */}
      <aside className="w-full md:w-[320px] shrink-0 border-r border-[#464554]/60 flex flex-col bg-[#0e0e10] p-6 overflow-y-auto custom-scrollbar">
        <h2 className="text-xl font-bold mb-6 text-[#e5e1e4]">Sequence Setup</h2>

        <div className="space-y-6">
          {/* Brand Identity */}
          <div className="space-y-2">
            <label className="font-mono text-xs text-[#c7c4d7] block">Brand Identity</label>
            <input
              type="text"
              value={brandIdentity}
              onChange={(e) => setBrandIdentity(e.target.value)}
              placeholder="e.g. Luminar Pro"
              className="w-full bg-[#1c1b1d] border border-[#464554] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:ring-1 focus:ring-[#8083ff] focus:border-[#8083ff] outline-none transition-all"
            />
          </div>

          {/* Dynamic Hooks List Builder */}
          <div className="space-y-2">
            <label className="font-mono text-xs text-[#c7c4d7] block">Dynamic Hooks</label>
            <div className="space-y-2">
              {hooks.map((hook, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={hook}
                    onChange={(e) => {
                      const updated = [...hooks];
                      updated[idx] = e.target.value;
                      setHooks(updated);
                    }}
                    className="flex-1 bg-[#1c1b1d] border border-[#464554] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] outline-none focus:border-[#c0c1ff]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveHook(idx)}
                    className="text-[#ffb4ab] opacity-70 hover:opacity-100 transition-opacity p-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddHook}
              className="w-full py-2 border border-dashed border-[#464554] rounded-lg font-mono text-xs text-[#c7c4d7] hover:text-[#e5e1e4] hover:border-[#908fa0] transition-all mt-2 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span> Add Hook
            </button>
          </div>

          {/* CTA Text */}
          <div className="space-y-2">
            <label className="font-mono text-xs text-[#c7c4d7] block">Call to Action</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="Start Free Trial"
              className="w-full bg-[#1c1b1d] border border-[#464554] rounded-lg px-3 py-2 text-sm text-[#e5e1e4] focus:ring-1 focus:ring-[#8083ff] focus:border-[#8083ff] outline-none"
            />
          </div>

          {/* Slide Duration */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
              <label className="font-mono text-xs text-[#c7c4d7]">Slide Duration</label>
              <span className="font-mono text-xs text-[#c0c1ff] font-bold">{slideDuration}s</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={slideDuration}
              onChange={(e) => setSlideDuration(parseFloat(e.target.value))}
              className="w-full h-1 cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[10px] text-[#908fa0] uppercase">
              <span>Fast</span>
              <span>Cinematic</span>
              <span>Long</span>
            </div>
          </div>

          {/* Synthesize Action */}
          <div className="pt-4">
            <button
              onClick={() => {
                setIsPlaying(true);
                alert('Synthesizing video sequence with AI motion effects...');
              }}
              className="w-full bg-[#c0c1ff] text-[#1000a9] hover:bg-[#8083ff] py-3 rounded-lg font-bold font-mono text-xs hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">auto_videocam</span>
              <span>Synthesize Draft</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area: Canvas + Timeline */}
      <div className="flex-1 flex flex-col relative bg-[#1c1b1d] overflow-hidden">
        {/* Canvas Preview Frame */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 relative overflow-hidden">
          <div className="w-full max-w-4xl aspect-video bg-[#131315] rounded-xl border border-[#464554] shadow-2xl relative overflow-hidden flex flex-col">
            <div className="absolute inset-0">
              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.imageAlt}
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>

            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-8 sm:p-12">
              <div className="text-[#c0c1ff] font-mono text-xs tracking-widest mb-4 uppercase font-semibold">
                {brandIdentity}
              </div>
              <h1 className="text-[#e5e1e4] font-bold text-3xl sm:text-5xl mb-6 leading-tight max-w-3xl transition-all">
                {currentSlide.hookText}
              </h1>
              <button className="bg-[#4edea3] text-[#003824] px-8 py-3 rounded-full font-mono text-xs font-bold shadow-xl hover:scale-105 transition-transform">
                {ctaText}
              </button>
            </div>

            {/* Video Playback Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-[#131315]/80 backdrop-blur-md px-6 py-2 rounded-full border border-[#464554]">
              <button
                onClick={() => setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
                className="text-[#e5e1e4] hover:text-[#c0c1ff] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">skip_previous</span>
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 bg-[#c0c1ff] text-[#1000a9] rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              >
                <span className="material-symbols-filled text-[22px]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>

              <button
                onClick={() => setActiveSlideIndex((prev) => (prev + 1) % slides.length)}
                className="text-[#e5e1e4] hover:text-[#c0c1ff] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">skip_next</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Timeline Preview */}
        <div className="h-[220px] bg-[#201f22] p-4 sm:p-6 border-t border-[#464554]/60 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-bold text-[#e5e1e4]">Storyline</span>
              <div className="h-3.5 w-px bg-[#464554]"></div>
              <span className="text-[#c7c4d7] font-mono text-[11px] uppercase tracking-wider">
                {slides.length} SLIDES • {(slides.length * slideDuration).toFixed(1)}S TOTAL
              </span>
            </div>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-[#353437] rounded text-[#c7c4d7]">
                <span className="material-symbols-outlined text-[18px]">zoom_out</span>
              </button>
              <button className="p-1 hover:bg-[#353437] rounded text-[#c7c4d7]">
                <span className="material-symbols-outlined text-[18px]">zoom_in</span>
              </button>
            </div>
          </div>

          {/* Timeline Scroller */}
          <div className="flex-1 flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
            {slides.map((slide, idx) => {
              const isActive = activeSlideIndex === idx;
              return (
                <div
                  key={slide.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  className="w-60 h-full shrink-0 group relative cursor-pointer"
                >
                  {isActive && <div className="absolute -top-1 left-0 w-full h-[2px] bg-[#8083ff]" />}
                  <div
                    className={`w-full h-28 rounded-lg border relative overflow-hidden transition-all ${
                      isActive
                        ? 'border-[#8083ff] shadow-lg'
                        : 'border-[#464554] opacity-70 group-hover:opacity-100'
                    }`}
                  >
                    <img
                      src={slide.imageUrl}
                      alt={slide.imageAlt}
                      className="w-full h-full object-cover"
                    />
                    {isActive && <div className="absolute inset-0 bg-[#8083ff]/20" />}
                    <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-white">
                      {slide.timestamp}
                    </div>
                  </div>
                  <div className="mt-1.5 text-[#e5e1e4] font-mono text-[11px] truncate">
                    {slide.title}
                  </div>
                </div>
              );
            })}

            {/* Add Slide Button */}
            <button
              onClick={() => {
                const newSlide: VideoSlide = {
                  id: `slide-${slides.length + 1}`,
                  title: `Slide #${slides.length + 1}: Custom Hook`,
                  hookText: 'Automate your creative testing.',
                  timestamp: `00:${(slides.length * 3).toString().padStart(2, '0')}`,
                  durationSeconds: slideDuration,
                  imageUrl: slides[0].imageUrl,
                  imageAlt: 'New slide preview',
                };
                setSlides([...slides, newSlide]);
              }}
              className="w-16 h-28 shrink-0 border-2 border-dashed border-[#464554] rounded-lg flex flex-col items-center justify-center gap-1 text-[#908fa0] hover:text-[#e5e1e4] hover:border-[#908fa0] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined">add</span>
              <span className="text-[9px] font-mono uppercase">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Status Pill */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3 z-30">
        <div className="glass-panel px-3.5 py-1.5 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></div>
          <span className="font-mono text-[11px] uppercase text-[#c7c4d7]">Rendering Real-time Preview</span>
        </div>
        <button
          onClick={() => alert('Opening video export settings...')}
          className="w-11 h-11 bg-[#c0c1ff] text-[#1000a9] rounded-xl flex items-center justify-center shadow-lg hover:rotate-90 transition-all duration-500 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </button>
      </div>
    </div>
  );
};

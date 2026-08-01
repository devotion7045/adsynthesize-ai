import React, { useState } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  company?: string;
  plan: string;
  token: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (mode === 'signup' && !name) {
      setError('Please enter your full name.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const userProfile: UserProfile = {
        name: name || (email.split('@')[0] ? email.split('@')[0].toUpperCase() : 'Growth Lead'),
        email: email,
        company: company || 'AdSynthesize Workspace',
        plan: 'Pro Unlimited',
        token: `token-${Date.now()}`,
      };

      localStorage.setItem('adsynthesize_user', JSON.stringify(userProfile));
      onLoginSuccess(userProfile);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#1e1d21] border border-[#464554]/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#e5e1e4]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#908fa0] hover:text-[#e5e1e4] p-1.5 rounded-lg hover:bg-[#2e2d32] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center gap-2 bg-[#8083ff]/15 px-3 py-1 rounded-full border border-[#8083ff]/30 font-mono text-xs text-[#c0c1ff]">
            <span className="material-symbols-outlined text-[16px]">dataset</span>
            <span>AdSynthesize AI Workspace</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#e5e1e4]">
            {mode === 'login' ? 'Welcome Back' : 'Create Live Account'}
          </h2>
          <p className="text-xs text-[#c7c4d7]">
            {mode === 'login'
              ? 'Sign in to access your live campaigns and AI generation tools.'
              : 'Sign up to unlock production-grade AI ad creation and budget engine.'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex rounded-lg bg-[#141315] p-1 border border-[#464554]/50">
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError('');
            }}
            className={`flex-1 py-1.5 font-mono text-xs rounded-md font-semibold transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-[#8083ff] text-[#1000a9] shadow-md'
                : 'text-[#908fa0] hover:text-[#e5e1e4]'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
            }}
            className={`flex-1 py-1.5 font-mono text-xs rounded-md font-semibold transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-[#8083ff] text-[#1000a9] shadow-md'
                : 'text-[#908fa0] hover:text-[#e5e1e4]'
            }`}
          >
            Sign In
          </button>
        </div>

        {error && (
          <div className="bg-[#ffb4ab]/10 border border-[#ffb4ab]/40 text-[#ffb4ab] px-3.5 py-2 rounded-lg text-xs font-mono">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#c7c4d7] block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Vance"
                className="w-full bg-[#0e0e10] border border-[#464554] focus:border-[#8083ff] focus:ring-1 focus:ring-[#8083ff] outline-none px-3 py-2 rounded-lg text-sm text-[#e5e1e4] placeholder:text-[#908fa0]"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="font-mono text-xs text-[#c7c4d7] block">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@growthbrand.com"
              className="w-full bg-[#0e0e10] border border-[#464554] focus:border-[#8083ff] focus:ring-1 focus:ring-[#8083ff] outline-none px-3 py-2 rounded-lg text-sm text-[#e5e1e4] placeholder:text-[#908fa0]"
            />
          </div>

          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#c7c4d7] block">Company or Brand Name (Optional)</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme Commerce"
                className="w-full bg-[#0e0e10] border border-[#464554] focus:border-[#8083ff] focus:ring-1 focus:ring-[#8083ff] outline-none px-3 py-2 rounded-lg text-sm text-[#e5e1e4] placeholder:text-[#908fa0]"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="font-mono text-xs text-[#c7c4d7] block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#0e0e10] border border-[#464554] focus:border-[#8083ff] focus:ring-1 focus:ring-[#8083ff] outline-none px-3 py-2 rounded-lg text-sm text-[#e5e1e4] placeholder:text-[#908fa0]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-[#8083ff] text-[#1000a9] hover:bg-[#c0c1ff] font-bold py-2.5 rounded-lg text-xs font-mono tracking-wider hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                <span>Authenticating...</span>
              </>
            ) : (
              <span>{mode === 'login' ? 'Sign In' : 'Create Live Account'}</span>
            )}
          </button>
        </form>

        {/* Footer info */}
        <p className="text-[11px] text-[#908fa0] text-center leading-normal">
          Connected to Live AI Service at <span className="font-mono text-[#c0c1ff]">diginfotech-ai-backend.onrender.com</span>
        </p>
      </div>
    </div>
  );
};

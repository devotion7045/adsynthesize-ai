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
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'signup',
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
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
        plan: 'Pro Growth',
        token: `token-${Date.now()}`,
      };

      localStorage.setItem('adsynthesize_user', JSON.stringify(userProfile));
      onLoginSuccess(userProfile);
      onClose();
    }, 600);
  };

  const handleGoogleSSO = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const userProfile: UserProfile = {
        name: 'Alex Rivera',
        email: 'alex.rivera@growthbrand.com',
        company: 'ScaleUp E-Commerce',
        plan: 'Pro Growth',
        token: `google-sso-${Date.now()}`,
      };

      localStorage.setItem('adsynthesize_user', JSON.stringify(userProfile));
      onLoginSuccess(userProfile);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#09090B] border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden text-[#FFFFFF] flex flex-col sm:flex-row">
        
        {/* Left Side Visual Banner for Larger Screens */}
        <div className="hidden sm:flex sm:w-2/5 bg-gradient-to-br from-[#18181B] via-[#09090B] to-[#10B981]/20 p-6 flex-col justify-between border-r border-[#27272A] relative overflow-hidden">
          <div className="space-y-3 z-10">
            <div className="inline-flex items-center gap-1.5 bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] px-2.5 py-1 rounded-full text-[10px] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>LIVE AI WORKSPACE</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-[#FFFFFF]">AdSynthesize AI</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              AI Advertising Without Guesswork. Automate ad copy, banners, motion videos & budget allocation.
            </p>
          </div>

          <div className="space-y-2 z-10 pt-6 border-t border-[#27272A]">
            <div className="flex items-center gap-2 text-xs text-[#D4D4D8]">
              <span className="material-symbols-outlined text-[#10B981] text-[18px]">verified</span>
              <span>Render Backend Connected</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#D4D4D8]">
              <span className="material-symbols-outlined text-[#6366F1] text-[18px]">bolt</span>
              <span>10x Faster Creative Testing</span>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full sm:w-3/5 p-6 sm:p-7 space-y-5 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#A1A1AA] hover:text-[#FFFFFF] p-1.5 rounded-lg hover:bg-[#27272A] transition-all cursor-pointer"
            aria-label="Close auth modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {/* Header */}
          <div className="space-y-1.5 pr-6">
            <h2 className="text-2xl font-bold tracking-tight text-[#FFFFFF]">
              {mode === 'login' ? 'Sign In' : 'Start Free Trial'}
            </h2>
            <p className="text-xs text-[#A1A1AA]">
              {mode === 'login'
                ? 'Access your live AI ad generation suite.'
                : 'Create an account to generate ad creatives & optimize budget.'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex rounded-lg bg-[#18181B] p-1 border border-[#27272A]">
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError('');
              }}
              className={`flex-1 py-1.5 font-mono text-xs rounded-md font-semibold transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-[#6366F1] text-[#FFFFFF] shadow-md'
                  : 'text-[#A1A1AA] hover:text-[#FFFFFF]'
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
                  ? 'bg-[#6366F1] text-[#FFFFFF] shadow-md'
                  : 'text-[#A1A1AA] hover:text-[#FFFFFF]'
              }`}
            >
              Sign In
            </button>
          </div>

          {/* Google SSO Button */}
          <button
            type="button"
            onClick={handleGoogleSSO}
            disabled={isLoading}
            className="w-full bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-[#FFFFFF] font-medium py-2.5 px-3 rounded-lg text-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-[#27272A]"></div>
            <span className="bg-[#09090B] px-2 font-mono text-[10px] text-[#A1A1AA] uppercase">
              Or email
            </span>
          </div>

          {error && (
            <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] px-3 py-1.5 rounded-lg text-xs font-mono">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="font-mono text-[11px] text-[#A1A1AA] block">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Vance"
                  className="w-full bg-[#18181B] border border-[#27272A] focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] outline-none px-3 py-2 rounded-lg text-xs text-[#FFFFFF] placeholder:text-[#71717A]"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="font-mono text-[11px] text-[#A1A1AA] block">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@brand.com"
                className="w-full bg-[#18181B] border border-[#27272A] focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] outline-none px-3 py-2 rounded-lg text-xs text-[#FFFFFF] placeholder:text-[#71717A]"
              />
            </div>

            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="font-mono text-[11px] text-[#A1A1AA] block">Company Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Acme Commerce"
                  className="w-full bg-[#18181B] border border-[#27272A] focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] outline-none px-3 py-2 rounded-lg text-xs text-[#FFFFFF] placeholder:text-[#71717A]"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="font-mono text-[11px] text-[#A1A1AA] block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#18181B] border border-[#27272A] focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] outline-none px-3 py-2 rounded-lg text-xs text-[#FFFFFF] placeholder:text-[#71717A]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-[#6366F1] text-[#FFFFFF] hover:bg-[#4F46E5] font-bold py-2.5 rounded-lg text-xs font-mono tracking-wider hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                  <span>Connecting...</span>
                </>
              ) : (
                <span>{mode === 'login' ? 'Sign In to Workspace' : 'Create Free Account'}</span>
              )}
            </button>
          </form>

          {/* Footer info */}
          <p className="text-[10px] text-[#71717A] text-center leading-normal">
            By registering, you agree to our Terms of Service & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

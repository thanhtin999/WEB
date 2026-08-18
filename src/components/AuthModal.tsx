import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Sparkles, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  onSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const { signInWithEmail, signUpWithEmail, signInWithGoogle, demoLogin, isSyncing, error, setError } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setError(null);

    if (!email || !password) {
      setFormError('Please fill in both email and password.');
      return;
    }

    if (mode === 'signup' && password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }

    try {
      if (mode === 'signup') {
        await signUpWithEmail(email, password, displayName || undefined);
        setFormSuccess('Account created successfully! Welcome to the Athletic Portal.');
      } else {
        await signInWithEmail(email, password);
        setFormSuccess('Signed in successfully! Access granted.');
      }
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 700);
    } catch (err: any) {
      setFormError(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    setFormError(null);
    try {
      await signInWithGoogle();
      setFormSuccess('Signed in with Google successfully!');
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 700);
    } catch (err: any) {
      setFormError(err.message || 'Google sign in failed.');
    }
  };

  const handleQuickDemo = async () => {
    setFormError(null);
    try {
      await demoLogin();
      setFormSuccess('Signed in as Pro Demo Member!');
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 700);
    } catch (err: any) {
      setFormError(err.message || 'Demo login failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden text-left my-6 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100">
              <ShieldCheck className="w-3 h-3" />
              <span>Firebase Auth & Cloud Firestore</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              {mode === 'signin' ? 'Sign In to Member Portal' : 'Create Athletic Account'}
            </h3>
            <p className="text-xs text-slate-500">
              {mode === 'signin'
                ? 'Access your gym passes, live bookings, and real-time updates.'
                : 'Join elite training memberships with instant cloud persistence.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1.5 m-6 mb-2 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setFormError(null);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'signin'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setFormError(null);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="p-6 pt-2 space-y-4 text-xs">
          {/* Quick 1-Click Demo Login for YouTube Video Tutorials */}
          <div className="p-3 bg-blue-50/80 border border-blue-100 rounded-2xl flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-blue-700 font-bold text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>1-Click Demo Account (YouTube Test)</span>
              </div>
              <p className="text-[10px] text-slate-600">
                Instantly signs in with sample athlete credentials to test real-time Firestore sync.
              </p>
            </div>
            <button
              type="button"
              onClick={handleQuickDemo}
              disabled={isSyncing}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg shrink-0 transition-colors flex items-center gap-1 shadow-xs disabled:opacity-50"
            >
              {isSyncing ? <Loader2 className="w-3 h-3 animate-spin" /> : <span>Auto-Fill & Sign In</span>}
            </button>
          </div>

          {/* Feedback Messages */}
          {(formError || error) && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
              <span>{formError || error}</span>
            </div>
          )}

          {formSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
              <span>{formSuccess}</span>
            </div>
          )}

          {/* Google Sign In Option */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSyncing}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 flex items-center justify-center gap-2.5 transition-colors shadow-xs disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              Or with email
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-slate-700 font-semibold block">Full Athlete / Member Name:</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Jordan Smith"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white text-xs"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-slate-700 font-semibold block">Email Address:</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="athlete@gym.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-semibold block">Password:</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white text-xs"
                />
              </div>
              {mode === 'signup' && (
                <p className="text-[10px] text-slate-400">Minimum 6 characters for Firebase Auth security.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSyncing}
              className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] disabled:opacity-50 text-xs"
            >
              {isSyncing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting to Firebase...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In to Member Portal' : 'Create & Register Profile'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Helper / Demo notice */}
          <div className="pt-3 border-t border-slate-100 text-center text-[11px] text-slate-500">
            {mode === 'signin' ? (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Create one now
                </button>
              </span>
            ) : (
              <span>
                Already a member?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Sign In
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  X,
  Video,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Radio,
  Layers,
  Database,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Terminal,
  Code
} from 'lucide-react';

interface DemoStepsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
  onOpenDashboard: () => void;
}

export const DemoStepsModal: React.FC<DemoStepsModalProps> = ({
  isOpen,
  onClose,
  onOpenAuth,
  onOpenDashboard,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const demoSteps = [
    {
      step: 1,
      title: 'Sign Up & Firebase Auth Registration',
      action: 'Click "Sign In / Member Portal" -> Select "Create Account" or use the 1-Click Demo button.',
      details:
        'Registers a new user in Firebase Authentication. Automatically provisions an initial user profile in Firestore under users/{userId} containing uid, displayName, email, and timestamps.',
      codeSnippet: `await createUserWithEmailAndPassword(auth, email, password);\nawait setDoc(doc(db, 'users', uid), initialProfile);`,
    },
    {
      step: 2,
      title: 'Authentication & Session Persistence',
      action: 'Log in with your email/password or Google OAuth provider.',
      details:
        'Firebase Auth establishes an active authenticated session. The reactive AuthContext listener (`onAuthStateChanged`) updates application state and starts live Firestore synchronization.',
      codeSnippet: `onAuthStateChanged(auth, (user) => { setUser(user); });`,
    },
    {
      step: 3,
      title: 'Update & Persist Profile in users/{userId}',
      action: 'Open Member Portal -> Navigate to "3. Member Profile" -> Edit phone or name and click Save.',
      details:
        'Writes directly to Firestore `users/{userId}` with strict owner validation (`isOwner(userId)`). Data is permanently stored in the Cloud.',
      codeSnippet: `await setDoc(doc(db, 'users', user.uid), updatedProfile);`,
    },
    {
      step: 4,
      title: 'Browser Refresh & Data Persistence Demo',
      action: 'Press F5 / Refresh the browser page.',
      details:
        'Show your viewers that all session data, member passes, and profile details instantly reload from Cloud Firestore without data loss.',
      codeSnippet: `// Handled automatically via Firestore onSnapshot & Auth token persistence`,
    },
    {
      step: 5,
      title: 'Two-Tab Real-Time Sync Demonstration',
      action: 'Open this application in two separate browser windows (or an Incognito window).',
      details:
        'Log in on both tabs. In Tab 1, issue a new membership pass in "1. My Passes" or broadcast a new alert in "2. Live Gym Broadcasts".',
      codeSnippet: `onSnapshot(query(collection(db, 'gymMembers'), where('ownerId', '==', uid)), snapshot => ...)`,
    },
    {
      step: 6,
      title: 'Instant WebSocket / Firestore Realtime Proof',
      action: 'Watch Tab 2 update instantly without clicking refresh or reloading!',
      details:
        'Firestore establishes a bidirectional push stream. UI components re-render with zero latency upon server snapshot changes.',
      codeSnippet: `// Instant live updates with zero polling overhead`,
    },
    {
      step: 7,
      title: 'Route & Data Access Protection for Logged-Out Users',
      action: 'Click "Sign Out" in the Member Portal.',
      details:
        'Notice how the portal immediately switches to the locked security gate, and Firestore listeners safely detach to prevent unauthorized reads.',
      codeSnippet: `if (!user) { /* Show Auth Protected Screen */ }`,
    },
    {
      step: 8,
      title: 'Production Firestore Security Rules Audit',
      action: 'Review firestore.rules and the Security tab.',
      details:
        'Explain to viewers how helper functions (`isSignedIn`, `isOwner`, `isAdmin`), schema key whitelists, and default-deny policies prevent database tampering.',
      codeSnippet: `match /gymMembers/{docId} {\n  allow read, write: if isSignedIn() && resource.data.ownerId == request.auth.uid;\n}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-left my-4 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
              <Video className="w-3 h-3 text-red-600" />
              <span>YouTube Video Tutorial & Demo Guide</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              8-Step YouTube Presentation Script
            </h3>
            <p className="text-xs text-slate-500">
              Follow these sequential steps to demonstrate Firebase Authentication, Firestore CRUD, and Real-time multi-tab synchronization.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Shortcuts Bar */}
        <div className="px-6 py-3 bg-blue-50/60 border-b border-blue-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-blue-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Demo Shortcuts:</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-colors"
            >
              Open Auth Dialog
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenDashboard();
              }}
              className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-lg border border-slate-200 text-xs transition-colors"
            >
              Open Member Portal
            </button>
          </div>
        </div>

        {/* Steps List */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {demoSteps.map((item, idx) => (
            <div
              key={item.step}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-2.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {item.step}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                </div>

                <button
                  onClick={() => copyToClipboard(item.codeSnippet, idx)}
                  className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-semibold flex items-center gap-1 shrink-0"
                  title="Copy code snippet"
                >
                  {copiedIndex === idx ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-1 pl-8.5">
                <p className="font-semibold text-blue-700">
                  <strong>Action on Screen:</strong> {item.action}
                </p>
                <p className="text-slate-600 leading-relaxed">{item.details}</p>

                <div className="p-2.5 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] overflow-x-auto mt-2">
                  <pre>{item.codeSnippet}</pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Tutorial tip: Keep dev console open (F12) to show network logs & Firestore websocket packets.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-sm"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Radio, BellRing, ArrowRight, X, Sparkles, Activity } from 'lucide-react';
import { collection, onSnapshot, query, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { LiveAnnouncement } from '../types';
import { useAuth } from '../context/AuthContext';

interface LiveAnnouncementsBannerProps {
  onOpenDashboard: () => void;
  onOpenAuth: () => void;
}

export const LiveAnnouncementsBanner: React.FC<LiveAnnouncementsBannerProps> = ({
  onOpenDashboard,
  onOpenAuth,
}) => {
  const { user } = useAuth();
  const [latestAnnouncement, setLatestAnnouncement] = useState<LiveAnnouncement | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    // Only subscribe to live announcements if authenticated or fallback to public demo
    if (!user) {
      setLatestAnnouncement(null);
      return;
    }

    const q = collection(db, 'liveAnnouncements');
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: LiveAnnouncement[] = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as LiveAnnouncement);
        });

        if (items.length > 0) {
          // Find most recent
          items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setLatestAnnouncement(items[0]);
          setIsDismissed(false);
          setPulseActive(true);
          setTimeout(() => setPulseActive(false), 2000);
        } else {
          setLatestAnnouncement(null);
        }
      },
      (err) => {
        console.warn('[Firestore Live Banner] Stream error:', err);
      }
    );

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-slate-300">
              <strong className="text-white">Cloud Firestore Live Integration:</strong> Sign in to sync member passes and receive real-time class broadcasts.
            </span>
          </div>

          <button
            onClick={onOpenAuth}
            className="text-blue-400 hover:text-blue-300 font-bold inline-flex items-center gap-1 hover:underline transition-all"
          >
            <span>Sign In to Member Portal</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  if (!latestAnnouncement || isDismissed) return null;

  return (
    <div className={`bg-blue-600 text-white text-xs py-2.5 px-4 border-b border-blue-500 shadow-sm transition-all duration-300 ${pulseActive ? 'bg-blue-500 ring-2 ring-blue-300' : ''}`}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white text-blue-700 flex items-center gap-1 shadow-xs">
            <Radio className="w-3 h-3 text-red-600 animate-pulse" />
            <span>REALTIME GYM ALERT</span>
          </span>
          <span className="font-bold">{latestAnnouncement.title}:</span>
          <span className="text-blue-100 hidden sm:inline">{latestAnnouncement.message}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDashboard}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-white font-bold text-[11px] transition-colors flex items-center gap-1"
          >
            <span>Open Member Portal</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 hover:bg-white/20 rounded-md text-blue-200 hover:text-white"
            title="Dismiss Alert"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

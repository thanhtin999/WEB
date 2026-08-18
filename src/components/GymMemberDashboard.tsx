import React, { useState, useEffect } from 'react';
import {
  X,
  Dumbbell,
  Radio,
  User,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Clock,
  Calendar,
  Phone,
  Mail,
  Zap,
  Activity,
  Award,
  BellRing,
  Send,
  Sliders
} from 'lucide-react';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { GymMember, LiveAnnouncement } from '../types';

interface GymMemberDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
  onOpenDemoSteps: () => void;
}

export const GymMemberDashboard: React.FC<GymMemberDashboardProps> = ({
  isOpen,
  onClose,
  onOpenAuth,
  onOpenDemoSteps,
}) => {
  const { user, profile, loading: authLoading, logout, updateUserProfile, isSyncing } = useAuth();

  // Active Sub-view Tab
  const [activeTab, setActiveTab] = useState<'memberships' | 'live' | 'profile' | 'security'>('memberships');

  // Firestore Data State
  const [memberships, setMemberships] = useState<GymMember[]>([]);
  const [announcements, setAnnouncements] = useState<LiveAnnouncement[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [firestoreConnected, setFirestoreConnected] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString());

  // Form States
  const [isAddingPass, setIsAddingPass] = useState(false);
  const [passForm, setPassForm] = useState({
    name: '',
    email: '',
    phone: '',
    membershipPlan: 'Performance Elite' as GymMember['membershipPlan'],
    status: 'Active' as GymMember['status'],
  });

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    displayName: '',
    phone: '',
    photoURL: '',
  });

  // Live Announcement Broadcast Form
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: '',
  });
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // Status feedback
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync profile form when profile loads
  useEffect(() => {
    if (profile) {
      setProfileForm({
        displayName: profile.displayName || '',
        phone: profile.phone || '',
        photoURL: profile.photoURL || '',
      });
      setPassForm((prev) => ({
        ...prev,
        name: profile.displayName || prev.name,
        email: profile.email || prev.email,
        phone: profile.phone || prev.phone,
      }));
    }
  }, [profile]);

  // ============================================================================
  // FIRESTORE REAL-TIME SUBSCRIPTION: Gym Members (gymMembers/{docId})
  // ============================================================================
  useEffect(() => {
    if (!user) {
      setMemberships([]);
      setLoadingMembers(false);
      return;
    }

    setLoadingMembers(true);
    // Realtime Query: Filtered by ownerId matching authenticated UID (strictly enforced by security rules)
    const q = query(
      collection(db, 'gymMembers'),
      where('ownerId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: GymMember[] = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as GymMember);
        });
        // Sort in memory by createdAt descending
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setMemberships(items);
        setLoadingMembers(false);
        setFirestoreConnected(true);
        setLastSyncTime(new Date().toLocaleTimeString());
      },
      (err) => {
        console.warn('[Firestore gymMembers] Listener error:', err);
        setLoadingMembers(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // ============================================================================
  // FIRESTORE REAL-TIME SUBSCRIPTION: Live Announcements (liveAnnouncements/{docId})
  // ============================================================================
  useEffect(() => {
    if (!user) {
      setAnnouncements([]);
      setLoadingAnnouncements(false);
      return;
    }

    setLoadingAnnouncements(true);
    const q = collection(db, 'liveAnnouncements');

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: LiveAnnouncement[] = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as LiveAnnouncement);
        });
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setAnnouncements(items);
        setLoadingAnnouncements(false);
        setFirestoreConnected(true);
        setLastSyncTime(new Date().toLocaleTimeString());
      },
      (err) => {
        console.warn('[Firestore liveAnnouncements] Listener error:', err);
        setLoadingAnnouncements(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  if (!isOpen) return null;

  // Handler: Create Gym Member Pass
  const handleCreatePass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const now = new Date().toISOString();
      const newDoc = {
        ownerId: user.uid,
        name: passForm.name || profile?.displayName || 'Active Athlete',
        email: passForm.email || user.email || '',
        phone: passForm.phone || profile?.phone || '',
        membershipPlan: passForm.membershipPlan,
        status: passForm.status,
        startDate: new Date().toISOString().split('T')[0],
        createdAt: now,
        updatedAt: now,
      };

      await addDoc(collection(db, 'gymMembers'), newDoc);
      setIsAddingPass(false);
      showToast('Membership pass issued & synced to Cloud Firestore!');
    } catch (err: any) {
      showToast(err.message || 'Failed to save membership pass.', 'error');
    }
  };

  // Handler: Delete Gym Member Pass
  const handleDeletePass = async (docId?: string) => {
    if (!docId) return;
    try {
      await deleteDoc(doc(db, 'gymMembers', docId));
      showToast('Membership pass removed from Firestore.');
    } catch (err: any) {
      showToast(err.message || 'Could not delete pass.', 'error');
    }
  };

  // Handler: Update Membership Status / Plan
  const handleToggleStatus = async (pass: GymMember) => {
    if (!pass.id || !user) return;
    try {
      const nextStatus = pass.status === 'Active' ? 'Pending Renewal' : 'Active';
      const ref = doc(db, 'gymMembers', pass.id);
      await updateDoc(ref, {
        status: nextStatus,
        updatedAt: new Date().toISOString(),
      });
      showToast(`Pass status updated to "${nextStatus}". Realtime sync broadcasted!`);
    } catch (err: any) {
      showToast(err.message || 'Failed to update status.', 'error');
    }
  };

  // Handler: Update User Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        displayName: profileForm.displayName,
        phone: profileForm.phone,
        photoURL: profileForm.photoURL,
      });
      showToast('Profile updated & synchronized with Firestore users/{userId}!');
    } catch (err: any) {
      showToast(err.message || 'Failed to update profile.', 'error');
    }
  };

  // Handler: Post Real-time Broadcast (Admin Simulator for 2-tab YouTube testing)
  const handleBroadcastAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementForm.title || !announcementForm.message) {
      showToast('Please provide both title and announcement details.', 'error');
      return;
    }

    setIsBroadcasting(true);
    try {
      const now = new Date().toISOString();
      await addDoc(collection(db, 'liveAnnouncements'), {
        title: announcementForm.title,
        message: announcementForm.message,
        active: true,
        createdAt: now,
        updatedAt: now,
      });
      setAnnouncementForm({ title: '', message: '' });
      showToast('Live gym broadcast published! Check other open tabs to see instant sync.');
    } catch (err: any) {
      showToast(
        `Note: In strict production rules, only admin tokens can write to liveAnnouncements. Error: ${err.message}`,
        'error'
      );
    } finally {
      setIsBroadcasting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-left my-4 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div
            className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl shadow-xl border flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top-4 duration-200 ${
              toastMessage.type === 'success'
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-red-600 text-white border-red-500'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-100" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-100" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        )}

        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  Athletic Member Portal & Cloud Sync
                </h3>
                {firestoreConnected && (
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Realtime Connected</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Firestore CRUD + Real-time Listeners + User Access Governance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenDemoSteps}
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 flex items-center gap-1.5 transition-colors"
              title="YouTube Tutorial Demo Steps"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo Walkthrough Guide</span>
            </button>

            {user && (
              <button
                onClick={logout}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Sign Out
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real-time Status Indicator Strip */}
        <div className="px-6 py-2 bg-slate-100/70 border-b border-slate-200/80 flex flex-wrap items-center justify-between text-[11px] text-slate-600 gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>Status:</span>
              <strong className="text-slate-900">
                {user ? 'Authenticated Session' : 'Guest (Locked)'}
              </strong>
            </span>
            <span className="text-slate-300">|</span>
            <span>
              Active Passes: <strong className="text-slate-900">{memberships.length}</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span>
              Live Alerts: <strong className="text-slate-900">{announcements.length}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <span>Last Sync: {lastSyncTime}</span>
            <button
              onClick={() => {
                setLastSyncTime(new Date().toLocaleTimeString());
                showToast('Firestore connections refreshed.');
              }}
              className="p-1 hover:text-slate-900 rounded"
              title="Ping Sync"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'memberships', label: '1. My Passes & Passes CRUD', icon: <Award className="w-3.5 h-3.5" /> },
            { id: 'live', label: '2. Live Gym Broadcasts (Realtime)', icon: <Radio className="w-3.5 h-3.5" /> },
            { id: 'profile', label: '3. Member Profile (users/{userId})', icon: <User className="w-3.5 h-3.5" /> },
            { id: 'security', label: '4. Firestore Rules Audit', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-white shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 text-xs sm:text-sm text-slate-700 bg-white">
          
          {/* ========================================================================= */}
          {/* ACCESS PROTECTION CALLOUT FOR LOGGED OUT USERS                            */}
          {/* ========================================================================= */}
          {!user && (
            <div className="p-8 rounded-3xl bg-blue-50/50 border border-blue-100 text-center space-y-4 my-4 max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-3xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900 font-heading">
                  Authentication Protected View
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                  According to your Firestore Security Rules, membership data and live updates are restricted to verified accounts. Please sign in or use the 1-click test account.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={onOpenAuth}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-md shadow-blue-500/20 flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In / Create Account</span>
                </button>
                <button
                  onClick={onOpenDemoSteps}
                  className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-full border border-slate-200 shadow-xs flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>View YouTube Demo Steps</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 1: GYM MEMBERS / PASSES CRUD (gymMembers/{docId})                     */}
          {/* ========================================================================= */}
          {user && activeTab === 'memberships' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                    <span>Gym Membership Passes Collection</span>
                    <span className="text-xs font-mono font-normal text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      gymMembers/{'{docId}'}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Live Firestore document collection secured by <code>isOwner(ownerId)</code> rules.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingPass(!isAddingPass)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAddingPass ? 'Close Creator' : 'Create New Member Pass'}</span>
                </button>
              </div>

              {/* Add Pass Drawer Form */}
              {isAddingPass && (
                <form
                  onSubmit={handleCreatePass}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Issue New Athletic Pass to Firestore</span>
                    </h5>
                    <span className="text-[10px] text-slate-500">Owner ID: {user.uid.slice(0, 8)}...</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700 block">Member Name:</label>
                      <input
                        type="text"
                        required
                        value={passForm.name}
                        onChange={(e) => setPassForm({ ...passForm, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700 block">Email Address:</label>
                      <input
                        type="email"
                        required
                        value={passForm.email}
                        onChange={(e) => setPassForm({ ...passForm, email: e.target.value })}
                        placeholder="athlete@gym.com"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700 block">Phone Contact:</label>
                      <input
                        type="text"
                        value={passForm.phone}
                        onChange={(e) => setPassForm({ ...passForm, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700 block">Membership Tier Plan:</label>
                      <select
                        value={passForm.membershipPlan}
                        onChange={(e) => setPassForm({ ...passForm, membershipPlan: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
                      >
                        <option value="Standard Access">Standard Access</option>
                        <option value="Performance Elite">Performance Elite</option>
                        <option value="VIP Private Studio">VIP Private Studio</option>
                        <option value="Custom Athletic Pass">Custom Athletic Pass</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700 block">Initial Status:</label>
                      <select
                        value={passForm.status}
                        onChange={(e) => setPassForm({ ...passForm, status: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending Renewal">Pending Renewal</option>
                        <option value="Trial">Trial</option>
                        <option value="Frozen">Frozen</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingPass(false)}
                      className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Save to Firestore</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Passes List / Skeletons */}
              {loadingMembers ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 animate-pulse flex items-center justify-between">
                      <div className="space-y-2 w-1/2">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                      </div>
                      <div className="h-8 bg-slate-200 rounded-xl w-24"></div>
                    </div>
                  ))}
                </div>
              ) : memberships.length === 0 ? (
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                    <Award className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">No Active Passes Found in Firestore</h5>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Click "Create New Member Pass" above to write your first document to the <code>gymMembers</code> collection.
                  </p>
                  <button
                    onClick={() => setIsAddingPass(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Sample Pass</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {memberships.map((pass) => (
                    <div
                      key={pass.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-3 shadow-xs"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{pass.name}</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                pass.status === 'Active'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : pass.status === 'Pending Renewal'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {pass.status}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-blue-600">{pass.membershipPlan}</div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleToggleStatus(pass)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-200 rounded-lg transition-colors"
                            title="Toggle Status (Realtime update test)"
                          >
                            <Sliders className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePass(pass.id)}
                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Pass"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                        <div className="flex items-center gap-1.5 truncate">
                          <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{pass.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{pass.phone || 'No phone'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>Start: {pass.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
                          <span>Doc: {pass.id?.slice(0, 8)}...</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: LIVE GYM ANNOUNCEMENTS (liveAnnouncements/{docId})                  */}
          {/* ========================================================================= */}
          {user && activeTab === 'live' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping"></span>
                    <h4 className="text-sm font-bold text-blue-900 font-heading">
                      Real-time Firestore Multi-Tab Sync Test
                    </h4>
                  </div>
                  <p className="text-xs text-blue-700">
                    Open this app in a <strong>second browser window</strong> or <strong>incognito tab</strong>. When you post or delete an announcement here, both tabs update synchronously without refreshing!
                  </p>
                </div>
              </div>

              {/* Broadcast Post Simulator */}
              <form
                onSubmit={handleBroadcastAnnouncement}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-blue-600" />
                    <span>Broadcast Live Gym Alert / Class Announcement</span>
                  </h5>
                  <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
                    liveAnnouncements/{'{docId}'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1 sm:col-span-1">
                    <label className="text-[11px] font-semibold text-slate-700 block">Headline / Title:</label>
                    <input
                      type="text"
                      required
                      value={announcementForm.title}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                      placeholder="e.g. HIIT Class Starting at 7:00 PM"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] font-semibold text-slate-700 block">Announcement Content:</label>
                    <input
                      type="text"
                      required
                      value={announcementForm.message}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })}
                      placeholder="e.g. Coach Marcus has 3 slots remaining for heavy squat biomechanics."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isBroadcasting}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full flex items-center gap-2 shadow-sm disabled:opacity-50 transition-transform active:scale-95"
                  >
                    {isBroadcasting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>Broadcast Realtime Alert</span>
                  </button>
                </div>
              </form>

              {/* Announcements Feed */}
              <div className="space-y-3">
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Active Live Announcements Feed ({announcements.length})
                </h5>

                {loadingAnnouncements ? (
                  <div className="p-6 text-center text-slate-400">Loading live stream from Firestore...</div>
                ) : announcements.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                    No announcements broadcasted yet. Send a test announcement above to see real-time sync in action!
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {announcements.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 shadow-xs"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                            <BellRing className="w-4 h-4" />
                          </div>
                          <div className="space-y-0.5">
                            <h6 className="font-bold text-slate-900 text-xs sm:text-sm">{item.title}</h6>
                            <p className="text-xs text-slate-600 leading-relaxed">{item.message}</p>
                            <span className="text-[10px] text-slate-400 block pt-1">
                              Posted: {new Date(item.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {item.id && (
                          <button
                            onClick={async () => {
                              try {
                                await deleteDoc(doc(db, 'liveAnnouncements', item.id!));
                                showToast('Announcement removed.');
                              } catch (err: any) {
                                showToast(`Delete failed: ${err.message}`, 'error');
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Announcement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: USER PROFILE (users/{userId})                                      */}
          {/* ========================================================================= */}
          {user && activeTab === 'profile' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <span>User Profile & Firestore Document</span>
                  <span className="text-xs font-mono font-normal text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    users/{user.uid}
                  </span>
                </h4>
                <p className="text-xs text-slate-500">
                  Direct document mapping verified by <code>isOwner(userId)</code> security rules.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-700 font-semibold block">Full Display Name:</label>
                    <input
                      type="text"
                      value={profileForm.displayName}
                      onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })}
                      placeholder="Alex Vance"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-700 font-semibold block">Phone Number:</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      placeholder="+1 (555) 234-5678"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-semibold block">Profile Photo URL (Optional):</label>
                  <input
                    type="url"
                    value={profileForm.photoURL}
                    onChange={(e) => setProfileForm({ ...profileForm, photoURL: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Firebase Auth UID:</span>
                    <span className="font-mono text-slate-900">{user.uid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Registered Email:</span>
                    <span className="font-mono text-slate-900">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Last Firestore Sync:</span>
                    <span className="text-slate-900">{profile?.updatedAt ? new Date(profile.updatedAt).toLocaleString() : 'Just now'}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSyncing}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full flex items-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                    <span>Save Profile to Firestore</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: FIRESTORE SECURITY RULES AUDIT                                    */}
          {/* ========================================================================= */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  Active Firestore Security Rules Verification Matrix
                </h4>
                <p className="text-xs text-slate-500">
                  Structured in <code>firestore.rules</code> with role-based access control (RBAC), owner validation, and schema key enforcement.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>users/{'{userId}'}</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong>Rule:</strong> <code>isOwner(userId) || isAdmin()</code>
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Users can read and write only their own profile data. Key validation prevents injection of unauthorized admin privileges.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>gymMembers/{'{docId}'}</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong>Rule:</strong> <code>resource.data.ownerId == request.auth.uid</code>
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Personal gym memberships are private to the member who created them. Documents cannot be viewed or edited across tenant borders.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>liveAnnouncements/{'{docId}'}</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong>Rule:</strong> <code>read: isSignedIn(); write: isAdmin()</code>
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    All authenticated athletes receive realtime updates, while broadcast authority remains reserved for gym management.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto space-y-1">
                <div className="text-slate-400">// Sample firestore.rules excerpt:</div>
                <div className="text-blue-300">function isOwner(userId) &#123; return request.auth != null && request.auth.uid == userId; &#125;</div>
                <div className="text-emerald-300">match /gymMembers/&#123;docId&#125; &#123; allow read, write: if isSignedIn() && resource.data.ownerId == request.auth.uid; &#125;</div>
              </div>
            </div>
          )}

        </div>

        {/* Dashboard Footer Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Connected Project: <strong className="text-slate-900">web-ban-hang-35793</strong></span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-sm"
          >
            Close Member Portal
          </button>
        </div>
      </div>
    </div>
  );
};

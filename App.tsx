import React, { useState, useEffect } from 'react';
import { Meeting, ViewState } from './types';
import Sidebar from './components/layout/Sidebar';
import { AuthProvider, useAuthContext } from './context/AuthContext.tsx';
import { TeamProvider } from './context/TeamContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard';
import CreateMeeting from './pages/CreateMeeting';
import MeetingDetail from './pages/MeetingDetail';
import Intelligence from './pages/Intelligence';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Documents from './pages/Documents';
import InsightsEngine from './pages/InsightsEngine';
import DeltaAudit from './pages/DeltaAudit';
import EntityGraph from './pages/EntityGraph';
import ComplianceVault from './pages/ComplianceVault';
import SynapseHub from './pages/SynapseHub';
import { Loader } from './components/ui/Loader';
import { processMeetingAudio, processMeetingReport, semanticSearch } from './services/geminiService';

import { Scene3D } from './components/ui/Scene3D';
import { AICompanion } from './components/ui/AICompanion';

import { Menu } from 'lucide-react';

const AppContent: React.FC = () => {
  const { user, logout, loading: authLoading } = useAuthContext();
  const { theme } = useTheme();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [viewState, setViewState] = useState<ViewState>('dashboard'); 
  const [activeMeetingId, setActiveMeetingId] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSidebarOpenOnMobile, setIsSidebarOpenOnMobile] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('echo_meetings');
    if (saved) {
      try {
        setMeetings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved meetings", e);
      }
    }
  }, []);

  useEffect(() => {
    if (meetings.length > 0) {
      localStorage.setItem('echo_meetings', JSON.stringify(meetings));
    }
  }, [meetings]);

  useEffect(() => {
    if (user && viewState === 'auth') {
      setViewState('dashboard');
    }
  }, [user, viewState]);

  const activeMeeting = meetings.find(m => m.id === activeMeetingId);

  const handleLogout = async () => {
    try {
      await logout();
      setViewState('dashboard');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleRecordingComplete = async (audioBase64: string, mimeType: string) => {
    try {
      setProcessingStep('AI is summarizing your meeting...');
      const result = await processMeetingAudio(audioBase64, mimeType);
      
      const newId = result.id;
      const newMeeting: Meeting = {
        id: newId,
        team_id: 't1',
        title: `Meeting Log — ${new Date().toLocaleTimeString()}`,
        start_time: new Date().toISOString(),
        created_by: user?.name || 'User',
        created_at: new Date().toISOString(),
        segments: result.segments,
        action_items: result.actionItems,
        decisions: result.decisions,
        summarySpeechBase64: result.summarySpeechBase64
      };

      setMeetings(prev => [newMeeting, ...prev]);
      setActiveMeetingId(newId);
      setViewState('meeting');
    } catch (err) {
      alert("The AI analysis failed. Please try a shorter recording.");
    } finally {
      setProcessingStep(null);
    }
  };

  const handleReportComplete = async (reportText: string) => {
    try {
      setProcessingStep('AI is parsing your meeting report...');
      const result = await processMeetingReport(reportText);
      
      const newId = result.id;
      const newMeeting: Meeting = {
        id: newId,
        team_id: 't1',
        title: `Report Ingestion — ${new Date().toLocaleTimeString()}`,
        start_time: new Date().toISOString(),
        created_by: user?.name || 'User',
        created_at: new Date().toISOString(),
        segments: result.segments,
        action_items: result.actionItems,
        decisions: result.decisions,
        summarySpeechBase64: result.summarySpeechBase64
      };

      setMeetings(prev => [newMeeting, ...prev]);
      setActiveMeetingId(newId);
      setViewState('meeting');
    } catch (err) {
      alert("The AI analysis failed. Please try a shorter report.");
    } finally {
      setProcessingStep(null);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setIsSearching(true);
    try {
      const results = await semanticSearch(query, meetings);
      setSearchResults(results.results);
      setViewState('search');
    } finally {
      setIsSearching(false);
    }
  };

  const jumpToSegment = (mid: string, sid: string | undefined) => {
    setActiveMeetingId(mid);
    setViewState('meeting');
  };

  const handleDeleteMeeting = (id: string) => {
    if (window.confirm("Are you sure you want to delete this meeting?")) {
      const updated = meetings.filter(m => m.id !== id);
      setMeetings(updated);
      localStorage.setItem('echo_meetings', JSON.stringify(updated));
      if (activeMeetingId === id) {
        setActiveMeetingId(null);
        setViewState('dashboard');
      }
    }
  };

  const handleUpdateMeeting = (updatedMeeting: Meeting) => {
    setMeetings(prev => prev.map(m => m.id === updatedMeeting.id ? updatedMeeting : m));
  };

  if (authLoading) {
    return <Loader message="Verifying Identity..." fullScreen />;
  }

  return (
    <div className="flex min-h-screen bg-[#02040e] text-crystal overflow-hidden relative">
      <Scene3D />
      <div className="relative z-10 w-full min-h-screen">
        {!user ? (
          viewState === 'auth' ? (
            <Login onLogin={() => setViewState('dashboard')} />
          ) : viewState === 'documents' ? (
            <Documents onBack={() => setViewState('dashboard')} />
          ) : (
            <LandingPage onNavigate={(path) => setViewState(path === '/login' ? 'auth' : path === 'documents' ? 'documents' : 'dashboard')} />
          )
        ) : (
          <div className="flex min-h-screen bg-transparent">
            <AICompanion />
            <Sidebar 
              user={user} 
              viewState={viewState} 
              setViewState={setViewState} 
              onLogout={handleLogout} 
              isMobileOpen={isSidebarOpenOnMobile}
              onMobileClose={() => setIsSidebarOpenOnMobile(false)}
            />
            {/* Mobile Top Navigation Header */}
            <div className="fixed top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md border-b border-white/10 z-20 flex items-center px-6 md:hidden justify-between">
              <span className="text-sm font-mono font-black text-white uppercase tracking-widest">ECHO SYSTEM</span>
              <button 
                onClick={() => setIsSidebarOpenOnMobile(true)}
                className="p-2 rounded-lg text-white hover:bg-white/5 border border-white/10"
              >
                <Menu className="w-5 h-5 text-[#39FF14]" />
              </button>
            </div>

            <main className="flex-1 ml-0 md:ml-20 p-6 pt-24 sm:p-12 sm:pt-12 max-w-7xl mx-auto w-full relative h-screen overflow-y-auto no-scrollbar bg-transparent transition-all duration-300">
              {processingStep && <Loader message={processingStep} fullScreen />}
              <div className="animate-in fade-in duration-500">
                {(viewState === 'dashboard' || viewState === 'auth') && (
                  <Dashboard 
                    meetings={meetings} 
                    onSelectMeeting={(id) => { setActiveMeetingId(id); setViewState('meeting'); }}
                    onDeleteMeeting={handleDeleteMeeting}
                    onInitiateCapture={() => setViewState('create')}
                  />
                )}

                {viewState === 'create' && (
                  <CreateMeeting 
                    onRecordingComplete={handleRecordingComplete} 
                    onReportComplete={handleReportComplete}
                    isProcessing={!!processingStep} 
                  />
                )}

                {viewState === 'meeting' && (
                  activeMeeting ? (
                    <MeetingDetail 
                      meeting={activeMeeting} 
                      onBack={() => setViewState('dashboard')} 
                      highlightedSegmentId={null}
                      onJumpToSegment={jumpToSegment}
                      onUpdateMeeting={handleUpdateMeeting}
                    />
                  ) : <Dashboard 
                        meetings={meetings} 
                        onSelectMeeting={(id) => { setActiveMeetingId(id); setViewState('meeting'); }}
                        onDeleteMeeting={handleDeleteMeeting}
                        onInitiateCapture={() => setViewState('create')}
                      />
                )}

                {viewState === 'intelligence' && (
                  <Intelligence meetings={meetings} onJumpToSegment={jumpToSegment} />
                )}

                {viewState === 'search' && (
                  <Search 
                    query={searchQuery} 
                    results={searchResults} 
                    isSearching={isSearching} 
                    onSearch={handleSearch} 
                    onJumpToSegment={jumpToSegment}
                    meetings={meetings}
                  />
                )}

                {viewState === 'profile' && <Profile user={user} />}
                {viewState === 'admin' && <Admin meetingsCount={meetings.length} />}
                {viewState === 'documents' && <Documents onBack={() => setViewState('dashboard')} />}
                {viewState === 'insights' && <InsightsEngine meetings={meetings} />}
                {viewState === 'delta-audit' && <DeltaAudit meetings={meetings} />}
                {viewState === 'entity-graph' && <EntityGraph meetings={meetings} />}
                {viewState === 'compliance-vault' && <ComplianceVault meetings={meetings} />}
                {viewState === 'synapse-hub' && <SynapseHub />}
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <TeamProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </TeamProvider>
  </AuthProvider>
);

export default App;
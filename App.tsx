import React, { useState, useEffect } from 'react';
import { Meeting, ViewState } from './types';
import Sidebar from './components/layout/Sidebar';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { TeamProvider } from './context/TeamContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateMeeting from './pages/CreateMeeting';
import MeetingDetail from './pages/MeetingDetail';
import Intelligence from './pages/Intelligence';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import { Loader } from './components/ui/Loader';
import { processMeetingAudio, semanticSearch } from './services/geminiService';

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
      
      const newId = `m-${Date.now()}`;
      const newMeeting: Meeting = {
        id: newId,
        team_id: 't1',
        title: `Meeting Log — ${new Date().toLocaleTimeString()}`,
        start_time: new Date().toISOString(),
        created_by: user?.name || 'User',
        created_at: new Date().toISOString(),
        segments: result.segments,
        action_items: result.actionItems,
        decisions: result.decisions
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

  if (!user) {
    if (viewState === 'auth') {
      return <Login onLogin={() => setViewState('dashboard')} />;
    }
    return <LandingPage onNavigate={(path) => setViewState(path === '/login' ? 'auth' : 'dashboard')} />;
  }

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-obsidian' : 'bg-gray-50'}`}>
      <Sidebar 
        user={user} 
        viewState={viewState} 
        setViewState={setViewState} 
        onLogout={handleLogout} 
      />
      <main className="flex-1 ml-72 p-12 max-w-7xl mx-auto w-full relative">
        {processingStep && <Loader message={processingStep} fullScreen />}
        <div className="animate-in fade-in duration-500">
          {viewState === 'dashboard' && (
            <Dashboard 
              meetings={meetings} 
              onSelectMeeting={(id) => { setActiveMeetingId(id); setViewState('meeting'); }}
              onDeleteMeeting={handleDeleteMeeting}
              onInitiateCapture={() => setViewState('create')}
            />
          )}

          {viewState === 'create' && (
            <CreateMeeting onRecordingComplete={handleRecordingComplete} isProcessing={!!processingStep} />
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
        </div>
      </main>
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
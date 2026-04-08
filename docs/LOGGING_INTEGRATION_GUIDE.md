# Frontend Logging Integration Guide

Complete examples of how to integrate the frontend logging system.

## 1. App Initialization & Environment Logs

In your `main.tsx` or `App.tsx` entry point:

```typescript
import { logger } from './utils/logger';
import { createRoot } from 'react-dom/client';

// Log deployment start
logger.logDeploymentStarted(
  import.meta.env.MODE === 'production' ? 'production' : 'development',
  ['VITE_API_URL', 'VITE_FIREBASE_API_KEY']
);

// Log server startup
const port = 5173;
logger.logServerStarted('localhost', port);
```

## 2. Component-Level Logging

Example component:

```typescript
import React from 'react';
import { useLogger, usePageLifecycle, useInteractionLogger } from './hooks/useLogger';

export function SearchComponent() {
  const componentLogger = useLogger('SearchComponent');
  const { recordPageLoad } = usePageLifecycle('Search', '/search');
  const { logButtonClick, logFormSubmit } = useInteractionLogger();

  const handleSearch = (query: string) => {
    logButtonClick('Search Button', 'semantic search');
    recordPageLoad(1, 1);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logFormSubmit('SearchForm', 3);
    componentLogger.logInfo('Search form submitted');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <button onClick={() => handleSearch('query')}>Search</button>
    </form>
  );
}
```

## 3. API Request Logging

```typescript
import { apiGet, apiPost, apiDelete } from './utils/apiLogger';

async function fetchMeetings(userId: string) {
  try {
    const response = await apiGet(`/api/meetings/${userId}`);
    console.log('Meetings loaded:', response.data);
  } catch (error) {
    console.error('Failed to load meetings:', error);
  }
}

async function createMeeting(data: Record<string, unknown>) {
  try {
    const response = await apiPost('/api/meetings', data);
    console.log('Meeting created:', response.data);
  } catch (error) {
    console.error('Failed to create meeting:', error);
  }
}
```

## 4. Authentication Logging

```typescript
import { logger } from './utils/logger';

async function handleLogin(email: string, password: string) {
  try {
    const userId = 'user_123';
    logger.logAuthEvent('login', userId, { email });
  } catch (error) {
    logger.logError('Login failed', error instanceof Error ? error : new Error(String(error)));
  }
}

async function handleLogout(userId: string) {
  logger.logAuthEvent('logout', userId);
}
```

## 5. Audio Recording

```typescript
import { AudioRecordingTracker } from './utils/eventLogger';

export function AudioRecorderComponent() {
  let recordingTracker: AudioRecordingTracker | null = null;

  const startRecording = () => {
    recordingTracker = new AudioRecordingTracker();
  };

  const stopRecording = () => {
    if (recordingTracker) {
      const { recordingId, duration, size } = recordingTracker.stop();
      console.log(`Recorded ${duration}s of audio`);
      recordingTracker = null;
    }
  };

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
    </div>
  );
}
```

## 6. Meeting CRUD Operations

```typescript
import { MeetingEventTracker } from './utils/eventLogger';
import { apiPost, apiDelete } from './utils/apiLogger';

async function createNewMeeting(title: string, description: string) {
  try {
    const response = await apiPost('/api/meetings', { title, description });
    const meetingId = response.data.id as string;

    MeetingEventTracker.created(meetingId, title, {
      description,
      createdAt: new Date().toISOString(),
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
```

## 7. Error Boundary

```typescript
import React from 'react';
import { logger } from './utils/logger';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.logErrorBoundaryCaught('ErrorBoundary', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Check console logs.</div>;
    }
    return this.props.children;
  }
}
```

## 8. Route Changes

```typescript
import React from 'react';
import { useRouteLogger } from './hooks/useLogger';
import { useLocation } from 'react-router-dom';

export function RouteLogger() {
  const location = useLocation();
  useRouteLogger(location.pathname);
  return null;
}
```

## Available Logger Methods

### Core Methods
- `logInfo(message, data)` - Log information
- `logError(message, error, data)` - Log errors
- `logWarn(message, data)` - Log warnings
- `logDebug(message, data)` - Log debug info

### Server/Environment
- `logDeploymentStarted(environment, variables)`
- `logBuildSuccess(duration, assetCount)`
- `logBuildFailure(error, details)`
- `logServerStarted(host, port)`
- `logHotReloadTriggered(changedFiles)`

### Development
- `logCompileStarted(source)`
- `logCompileFinished(source, duration, success)`
- `logComponentRendered(componentName, props)`
- `logComponentError(componentName, error)`
- `logPageMounted(pageName, route)`
- `logPageUnmounted(pageName)`
- `logRouteChanged(from, to)`
- `logAssetLoaded(type, url, duration)`
- `logAssetFailed(type, url, error)`

### API & Backend
- `logAPIRequestStarted(endpoint, method, requestId)`
- `logAPIRequestSuccess(endpoint, method, duration, data, requestId)`
- `logAPIRequestFailure(endpoint, method, statusCode, error, requestId)`
- `logAuthEvent(event, userId, metadata)`

### User Interaction
- `logButtonClick(label, context)`
- `logFormSubmitted(formName, fieldCount)`
- `logFormValidationError(formName, fieldName, error)`
- `logDragDropEvent(action, source, target)`
- `logAudioRecordingStarted(recordingId)`
- `logAudioRecordingStopped(recordingId, duration, size)`
- `logSemanticSearchExecuted(query, resultCount, duration)`
- `logMeetingCreated(meetingId, title)`
- `logMeetingDeleted(meetingId, title)`

### System State
- `logContextChanged(contextName, oldValue, newValue)`
- `logStateUpdate(source, stateName, value)`
- `logErrorBoundaryCaught(boundaryName, error, componentStack)`
- `logDeprecationWarning(feature, replacement)`
- `logPerformanceWarning(metric, value, threshold)`

## Available React Hooks

- `useLogger(componentName)` - Component logging
- `usePageLifecycle(pageName, route)` - Page tracking
- `useStateLogger(componentName, stateName, value)` - State changes
- `useContextLogger(contextName, contextValue)` - Context changes
- `useRouteLogger(currentRoute)` - Route changes
- `usePerformanceLogger(componentName)` - Render warnings
- `useErrorLogger(componentName)` - Error handling
- `useAsyncLogger(operationName)` - Async operations
- `useInteractionLogger()` - User interactions
- `useDeprecationWarning(feature, replacement)` - Deprecations

## Best Practices

1. **ISO Timestamps** - All logs include ISO timestamps automatically
2. **Minimal Noise** - Component renders logged only in development
3. **Data Privacy** - Passwords, tokens, and keys are redacted
4. **Performance** - Avoid excessive logging in hot paths
5. **Organization** - Use appropriate methods for each log type
6. **Tracing** - API calls get unique request IDs for debugging
7. **Context** - Include relevant metadata with errors
8. **Development Focus** - Detailed logs only in development mode

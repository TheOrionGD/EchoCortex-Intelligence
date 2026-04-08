/**
 * Comprehensive Frontend Logger
 * Provides centralized logging for development and runtime events
 * All logs include ISO timestamps and are output to browser console during development
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type LogCategory = 'server' | 'development' | 'api' | 'interaction' | 'system' | 'component';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  data?: Record<string, unknown>;
  stack?: string;
}

export interface LogConfig {
  enableConsole: boolean;
  enableRemote: boolean;
  minLevel: LogLevel;
  isDevelopment: boolean;
}

class Logger {
  private config: LogConfig;
  private logs: LogEntry[] = [];
  private readonly MAX_LOGS = 1000;

  private readonly levelPriority = { debug: 0, info: 1, warn: 2, error: 3 };
  private readonly colors = {
    debug: '#7c3aed',
    info: '#0ea5e9',
    warn: '#f59e0b',
    error: '#ef4444',
  };

  constructor(config?: Partial<LogConfig>) {
    this.config = {
      enableConsole: true,
      enableRemote: false,
      minLevel: 'debug',
      isDevelopment: import.meta.env.MODE === 'development',
      ...config,
    };
  }

  /**
   * Server/Environment Logs
   */
  logDeploymentStarted(environment: string, variables?: string[]): void {
    this.log('info', 'server', `🚀 Deployment started in ${environment} environment`, {
      environment,
      variablesLoaded: variables?.length || 0,
    });
  }

  logBuildSuccess(duration: number, assetCount: number): void {
    this.log('info', 'server', `✅ Build success (${duration}ms)`, {
      duration,
      assetsGenerated: assetCount,
    });
  }

  logBuildFailure(error: Error, details?: string): void {
    this.log('error', 'server', `❌ Build failure: ${error.message}`, {
      error: error.message,
      details,
      stack: error.stack,
    });
  }

  logServerStarted(host: string, port: number): void {
    this.log('info', 'server', `🌐 Server running at http://${host}:${port}`, {
      host,
      port,
      url: `http://${host}:${port}`,
    });
  }

  logHotReloadTriggered(changedFiles: string[]): void {
    this.log('debug', 'server', `♻️ Hot reload triggered (${changedFiles.length} file(s) changed)`, {
      filesChanged: changedFiles,
    });
  }

  /**
   * Development Activity Logs
   */
  logCompileStarted(source: string): void {
    this.log('debug', 'development', `⚙️ Code compile started: ${source}`, {
      source,
      startTime: new Date().toISOString(),
    });
  }

  logCompileFinished(source: string, duration: number, success: boolean): void {
    const emoji = success ? '✓' : '✗';
    this.log(success ? 'debug' : 'warn', 'development', `${emoji} Code compile finished: ${source} (${duration}ms)`, {
      source,
      duration,
      success,
    });
  }

  logComponentRendered(componentName: string, props?: Record<string, unknown>): void {
    if (this.config.isDevelopment) {
      this.log('debug', 'component', `📦 Component rendered: ${componentName}`, {
        component: componentName,
        props: this._sanitizeData(props),
      });
    }
  }

  logComponentError(componentName: string, error: Error, errorBoundary?: string): void {
    this.log('error', 'component', `💥 Component error in ${componentName}`, {
      component: componentName,
      errorBoundary,
      error: error.message,
      stack: error.stack,
    });
  }

  logPageMounted(pageName: string, route?: string): void {
    this.log('info', 'development', `📄 Page mounted: ${pageName}${route ? ` (${route})` : ''}`, {
      page: pageName,
      route,
    });
  }

  logPageUnmounted(pageName: string): void {
    this.log('debug', 'development', `👋 Page unmounted: ${pageName}`, {
      page: pageName,
    });
  }

  logRouteChanged(from: string, to: string): void {
    this.log('info', 'development', `🔀 Route changed: ${from} → ${to}`, {
      from,
      to,
    });
  }

  logAssetLoaded(assetType: 'image' | 'audio' | 'font' | 'script' | 'style', url: string, duration?: number): void {
    this.log('debug', 'development', `📥 ${assetType.charAt(0).toUpperCase() + assetType.slice(1)} loaded: ${url}${duration ? ` (${duration}ms)` : ''}`, {
      type: assetType,
      url,
      duration,
    });
  }

  logAssetFailed(assetType: string, url: string, error: Error): void {
    this.log('warn', 'development', `⚠️ Asset failed to load: ${url}`, {
      type: assetType,
      url,
      error: error.message,
    });
  }

  /**
   * API & Backend Interaction Logs
   */
  logAPIRequestStarted(endpoint: string, method: string, requestId?: string): void {
    this.log('debug', 'api', `🔵 API request started: ${method} ${endpoint}`, {
      endpoint,
      method,
      requestId: requestId || this._generateRequestId(),
      timestamp: new Date().toISOString(),
    });
  }

  logAPIRequestSuccess(endpoint: string, method: string, duration: number, dataSnapshot?: unknown, requestId?: string): void {
    this.log('info', 'api', `✅ API request success: ${method} ${endpoint} (${duration}ms)`, {
      endpoint,
      method,
      duration,
      requestId,
      dataPreview: this._sanitizeData(dataSnapshot),
    });
  }

  logAPIRequestFailure(endpoint: string, method: string, statusCode: number, error: Error, requestId?: string): void {
    this.log('error', 'api', `❌ API request failed: ${method} ${endpoint} (${statusCode})`, {
      endpoint,
      method,
      statusCode,
      requestId,
      error: error.message,
      stack: error.stack,
    });
  }

  logAuthEvent(event: 'login' | 'logout' | 'token_refresh' | 'signup', userId?: string, metadata?: Record<string, unknown>): void {
    const emoji = event === 'login' || event === 'signup' ? '🔓' : event === 'logout' ? '🔐' : '🔄';
    this.log('info', 'api', `${emoji} Auth event: ${event}${userId ? ` (${userId})` : ''}`, {
      event,
      userId,
      ...metadata,
    });
  }

  /**
   * User Interaction Logs
   */
  logButtonClick(buttonLabel: string, context?: string): void {
    if (this.config.isDevelopment) {
      this.log('debug', 'interaction', `🖱️ Button clicked: ${buttonLabel}${context ? ` (${context})` : ''}`, {
        button: buttonLabel,
        context,
      });
    }
  }

  logFormSubmitted(formName: string, fieldCount: number): void {
    this.log('info', 'interaction', `📝 Form submitted: ${formName} (${fieldCount} field(s))`, {
      form: formName,
      fields: fieldCount,
    });
  }

  logFormValidationError(formName: string, fieldName: string, error: string): void {
    this.log('warn', 'interaction', `⚠️ Form validation error: ${formName}.${fieldName}`, {
      form: formName,
      field: fieldName,
      error,
    });
  }

  logDragDropEvent(action: 'start' | 'drop' | 'cancel', source: string, target?: string): void {
    this.log('debug', 'interaction', `🎯 Drag & drop ${action}: ${source}${target ? ` → ${target}` : ''}`, {
      action,
      source,
      target,
    });
  }

  logAudioRecordingStarted(recordingId: string): void {
    this.log('info', 'interaction', `🎙️ Audio recording started`, {
      recordingId,
    });
  }

  logAudioRecordingStopped(recordingId: string, duration: number, size: number): void {
    this.log('info', 'interaction', `⏹️ Audio recording stopped (${duration}s, ${(size / 1024 / 1024).toFixed(2)}MB)`, {
      recordingId,
      duration,
      sizeBytes: size,
    });
  }

  logSemanticSearchExecuted(query: string, resultCount: number, duration: number): void {
    this.log('info', 'interaction', `🔍 Semantic search executed: "${query}" (${resultCount} results, ${duration}ms)`, {
      query,
      resultCount,
      duration,
    });
  }

  logMeetingCreated(meetingId: string, title: string): void {
    this.log('info', 'interaction', `➕ Meeting created: ${title}`, {
      meetingId,
      title,
    });
  }

  logMeetingDeleted(meetingId: string, title: string): void {
    this.log('info', 'interaction', `🗑️ Meeting deleted: ${title}`, {
      meetingId,
      title,
    });
  }

  /**
   * System State Logs
   */
  logContextChanged(contextName: string, oldValue: unknown, newValue: unknown): void {
    if (this.config.isDevelopment) {
      this.log('debug', 'system', `🔄 Context changed: ${contextName}`, {
        context: contextName,
        from: this._sanitizeData(oldValue),
        to: this._sanitizeData(newValue),
      });
    }
  }

  logStateUpdate(componentOrContext: string, stateName: string, newValue: unknown): void {
    if (this.config.isDevelopment) {
      this.log('debug', 'system', `🔀 State updated: ${componentOrContext}.${stateName}`, {
        source: componentOrContext,
        state: stateName,
        value: this._sanitizeData(newValue),
      });
    }
  }

  logErrorBoundaryCaught(errorBoundaryName: string, error: Error, componentStack?: string): void {
    this.log('error', 'system', `🛑 Error boundary caught exception in ${errorBoundaryName}`, {
      errorBoundary: errorBoundaryName,
      error: error.message,
      componentStack,
      stack: error.stack,
    });
  }

  logDeprecationWarning(feature: string, replacement?: string): void {
    this.log('warn', 'system', `⚠️ Deprecated API: ${feature}${replacement ? ` (use ${replacement} instead)` : ''}`, {
      feature,
      replacement,
    });
  }

  logPerformanceWarning(metric: string, value: number, threshold: number): void {
    this.log('warn', 'system', `⚡ Performance warning: ${metric} = ${value}ms (threshold: ${threshold}ms)`, {
      metric,
      value,
      threshold,
    });
  }

  /**
   * Generic logging methods
   */
  logInfo(message: string, data?: Record<string, unknown>): void {
    this.log('info', 'development', message, data);
  }

  logError(message: string, error?: Error | unknown, data?: Record<string, unknown>): void {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    this.log('error', 'development', `${message}${errorMessage ? `: ${errorMessage}` : ''}`, {
      ...data,
      stack,
    });
  }

  logWarn(message: string, data?: Record<string, unknown>): void {
    this.log('warn', 'development', message, data);
  }

  logDebug(message: string, data?: Record<string, unknown>): void {
    this.log('debug', 'development', message, data);
  }

  /**
   * Get logs for debugging/export
   */
  getLogs(category?: LogCategory, level?: LogLevel): LogEntry[] {
    return this.logs.filter((log) => {
      const matchesCategory = !category || log.category === category;
      const matchesLevel = !level || this.levelPriority[log.level] >= this.levelPriority[level];
      return matchesCategory && matchesLevel;
    });
  }

  clearLogs(): void {
    this.logs = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Private methods
   */
  private log(level: LogLevel, category: LogCategory, message: string, data?: Record<string, unknown>): void {
    // Check if log level meets minimum threshold
    if (this.levelPriority[level] < this.levelPriority[this.config.minLevel]) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      ...(data && { data }),
    };

    // Store log
    this.logs.push(entry);
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.shift();
    }

    // Console output during development
    if (this.config.enableConsole && this.config.isDevelopment) {
      this._consoleLog(entry);
    }

    // Remote logging (for production)
    if (this.config.enableRemote && !this.config.isDevelopment && level === 'error') {
      this._sendRemoteLog(entry);
    }
  }

  private _consoleLog(entry: LogEntry): void {
    const color = this.colors[entry.level];
    const timestamp = new Date(entry.timestamp).toLocaleTimeString();
    const prefix = `%c[${timestamp}] ${entry.category.toUpperCase()}`;

    if (entry.data) {
      console.log(`${prefix} ${entry.message}`, `color: ${color}; font-weight: bold;`, entry.data);
    } else {
      console.log(`${prefix} ${entry.message}`, `color: ${color}; font-weight: bold;`);
    }
  }

  private _sendRemoteLog(entry: LogEntry): void {
    // Send logs to backend for terminal display
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      fetch(`${apiUrl}/api/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      }).catch(() => {
        // Silent fail - backend might not be running
      });
    } catch {
      // Silent fail for logging errors
    }
  }

  private _sanitizeData(data?: unknown): unknown {
    if (!data) return undefined;

    // Prevent logging sensitive auth tokens, passwords, etc.
    if (typeof data === 'object' && data !== null) {
      const sanitized: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(data)) {
        if (['password', 'token', 'secret', 'apiKey', 'accessToken'].some((k) => key.toLowerCase().includes(k.toLowerCase()))) {
          sanitized[key] = '[REDACTED]';
        } else if (typeof value === 'object') {
          sanitized[key] = this._sanitizeData(value);
        } else {
          sanitized[key] = value;
        }
      }
      return sanitized;
    }

    return data;
  }

  private _generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const logger = new Logger({
  enableConsole: true,
  enableRemote: true, // Send logs to backend
  minLevel: 'debug',
});

export default logger;

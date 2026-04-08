/**
 * Event Logger Utility
 * Tracking user interactions and system events
 */

import { logger } from './logger';

/**
 * Track button clicks with context
 */
export function trackButtonClick(buttonLabel: string, context?: string, callback?: () => void): () => void {
  return () => {
    logger.logButtonClick(buttonLabel, context);
    callback?.();
  };
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string, fieldValues: Record<string, unknown>): void {
  logger.logFormSubmitted(formName, Object.keys(fieldValues).length);
}

/**
 * Track form field validation errors
 */
export function trackFormError(formName: string, fieldName: string, errorMessage: string): void {
  logger.logFormValidationError(formName, fieldName, errorMessage);
}

/**
 * Track drag and drop events
 */
export function trackDragStart(source: string): void {
  logger.logDragDropEvent('start', source);
}

export function trackDragDrop(source: string, target: string): void {
  logger.logDragDropEvent('drop', source, target);
}

export function trackDragCancel(source: string): void {
  logger.logDragDropEvent('cancel', source);
}

/**
 * Track audio recording lifecycle
 */
export class AudioRecordingTracker {
  private recordingId: string;
  private startTime: number;
  private audioChunks: Blob[] = [];

  constructor() {
    this.recordingId = `audio_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.startTime = performance.now();
    logger.logAudioRecordingStarted(this.recordingId);
  }

  addChunk(chunk: Blob): void {
    this.audioChunks.push(chunk);
  }

  stop(): { recordingId: string; duration: number; size: number } {
    const duration = Math.round((performance.now() - this.startTime) / 1000);
    const size = this.audioChunks.reduce((sum, chunk) => sum + chunk.size, 0);

    logger.logAudioRecordingStopped(this.recordingId, duration, size);

    return {
      recordingId: this.recordingId,
      duration,
      size,
    };
  }

  getRecordingId(): string {
    return this.recordingId;
  }
}

/**
 * Track semantic search execution
 */
export function trackSemanticSearch(query: string, resultCount: number, duration: number): void {
  logger.logSemanticSearchExecuted(query, resultCount, duration);
}

/**
 * Track meeting CRUD operations
 */
export class MeetingEventTracker {
  static created(meetingId: string, title: string, metadata?: Record<string, unknown>): void {
    logger.logMeetingCreated(meetingId, title);
    if (metadata) {
      logger.logInfo(`Meeting metadata: ${title}`, metadata);
    }
  }

  static deleted(meetingId: string, title: string): void {
    logger.logMeetingDeleted(meetingId, title);
  }

  static updated(meetingId: string, title: string, changes: Record<string, unknown>): void {
    logger.logInfo(`Meeting updated: ${title}`, {
      meetingId,
      changes,
    });
  }

  static transcribed(meetingId: string, title: string, duration: number, wordCount: number): void {
    logger.logInfo(`Meeting transcribed: ${title}`, {
      meetingId,
      durationSeconds: duration,
      wordCount,
    });
  }
}

/**
 * Track page/route changes with performance metrics
 */
export class PageLoadTracker {
  private startTime: number;
  private pageName: string;
  private route: string;

  constructor(pageName: string, route?: string) {
    this.pageName = pageName;
    this.route = route || '';
    this.startTime = performance.now();
    logger.logPageMounted(pageName, route);
  }

  recordLoad(componentCount?: number, dataFetches?: number): void {
    const duration = Math.round(performance.now() - this.startTime);
    logger.logInfo(`Page load complete: ${this.pageName}`, {
      page: this.pageName,
      route: this.route,
      durationMs: duration,
      componentsRendered: componentCount,
      dataFetchesCompleted: dataFetches,
    });
  }

  unmount(): void {
    logger.logPageUnmounted(this.pageName);
  }
}

/**
 * Track asset loading
 */
export class AssetLoadTracker {
  static imageLoaded(url: string, duration?: number): void {
    logger.logAssetLoaded('image', url, duration);
  }

  static audioLoaded(url: string, duration?: number): void {
    logger.logAssetLoaded('audio', url, duration);
  }

  static fontLoaded(url: string, duration?: number): void {
    logger.logAssetLoaded('font', url, duration);
  }

  static scriptLoaded(url: string, duration?: number): void {
    logger.logAssetLoaded('script', url, duration);
  }

  static styleLoaded(url: string, duration?: number): void {
    logger.logAssetLoaded('style', url, duration);
  }

  static loadFailed(type: string, url: string, error: Error): void {
    logger.logAssetFailed(type, url, error);
  }
}

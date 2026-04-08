/**
 * useLogger Hook
 * React hook for convenient access to logging in components
 */

import { useEffect, useRef, useCallback } from 'react';
import { logger } from '../utils/logger';
import { PageLoadTracker } from '../utils/eventLogger';

/**
 * Hook for logging component lifecycle and state changes
 */
export function useLogger(componentName: string) {
  const loggerRef = useRef({
    logInfo: (message: string, data?: Record<string, unknown>) => logger.logInfo(message, data),
    logError: (message: string, error?: Error | unknown, data?: Record<string, unknown>) => logger.logError(message, error, data),
    logWarn: (message: string, data?: Record<string, unknown>) => logger.logWarn(message, data),
    logDebug: (message: string, data?: Record<string, unknown>) => logger.logDebug(message, data),
    logComponentError: (error: Error, errorBoundary?: string) => logger.logComponentError(componentName, error, errorBoundary),
  });

  useEffect(() => {
    logger.logComponentRendered(componentName);

    return () => {
      // Note: We don't log unmount for individual components to reduce noise
      // Use usePageLifecycle for page-level unmount tracking
    };
  }, [componentName]);

  return loggerRef.current;
}

/**
 * Hook for tracking page/route lifecycle with performance metrics
 */
export function usePageLifecycle(pageName: string, route?: string) {
  const trackerRef = useRef<PageLoadTracker | null>(null);

  useEffect(() => {
    trackerRef.current = new PageLoadTracker(pageName, route);

    return () => {
      trackerRef.current?.unmount();
    };
  }, [pageName, route]);

  const recordPageLoad = useCallback((componentCount?: number, dataFetches?: number) => {
    trackerRef.current?.recordLoad(componentCount, dataFetches);
  }, []);

  return { recordPageLoad };
}

/**
 * Hook for tracking state changes
 */
export function useStateLogger<T>(componentName: string, stateName: string, value: T) {
  const prevValueRef = useRef<T>(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      logger.logStateUpdate(componentName, stateName, value);
      prevValueRef.current = value;
    }
  }, [componentName, stateName, value]);
}

/**
 * Hook for tracking context changes
 */
export function useContextLogger<T>(contextName: string, contextValue: T) {
  const prevValueRef = useRef<T>(contextValue);

  useEffect(() => {
    if (prevValueRef.current !== contextValue) {
      logger.logContextChanged(contextName, prevValueRef.current, contextValue);
      prevValueRef.current = contextValue;
    }
  }, [contextName, contextValue]);
}

/**
 * Hook for tracking route changes
 */
export function useRouteLogger(currentRoute: string) {
  const prevRouteRef = useRef<string>(currentRoute);

  useEffect(() => {
    if (prevRouteRef.current !== currentRoute) {
      logger.logRouteChanged(prevRouteRef.current, currentRoute);
      prevRouteRef.current = currentRoute;
    }
  }, [currentRoute]);
}

/**
 * Hook for tracking performance metrics
 */
export function usePerformanceLogger(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const renderTime = performance.now() - startTime;
      // Only warn if component takes longer than 100ms to render
      if (renderTime > 100) {
        logger.logPerformanceWarning(`${componentName} render time`, Math.round(renderTime), 100);
      }
    };
  }, [componentName]);
}

/**
 * Hook for error handling and logging
 */
export function useErrorLogger(componentName: string) {
  const handleError = useCallback((error: Error, errorInfo?: { componentStack: string }) => {
    logger.logComponentError(componentName, error, errorInfo?.componentStack);
  }, [componentName]);

  return { handleError };
}

/**
 * Hook for tracking async operations (API calls, etc.)
 */
export function useAsyncLogger(operationName: string) {
  const trackAsyncStart = useCallback(() => {
    logger.logDebug(`Async operation started: ${operationName}`);
  }, [operationName]);

  const trackAsyncSuccess = useCallback((data?: unknown) => {
    logger.logInfo(`Async operation succeeded: ${operationName}`, { data });
  }, [operationName]);

  const trackAsyncError = useCallback((error: Error) => {
    logger.logError(`Async operation failed: ${operationName}`, error);
  }, [operationName]);

  return {
    trackAsyncStart,
    trackAsyncSuccess,
    trackAsyncError,
  };
}

/**
 * Hook for tracking user interactions
 */
export function useInteractionLogger() {
  const logButtonClick = useCallback((buttonLabel: string, context?: string) => {
    logger.logButtonClick(buttonLabel, context);
  }, []);

  const logFormSubmit = useCallback((formName: string, fieldCount: number) => {
    logger.logFormSubmitted(formName, fieldCount);
  }, []);

  const logFormError = useCallback((formName: string, fieldName: string, error: string) => {
    logger.logFormValidationError(formName, fieldName, error);
  }, []);

  return {
    logButtonClick,
    logFormSubmit,
    logFormError,
  };
}

/**
 * Hook for managing deprecation warnings
 */
export function useDeprecationWarning(feature: string, replacement?: string) {
  useEffect(() => {
    logger.logDeprecationWarning(feature, replacement);
  }, [feature, replacement]);
}

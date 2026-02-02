/**
 * Utility functions for handling file downloads with browser extension compatibility
 */

export const safeDownload = (blob: Blob, filename: string, onSuccess?: () => void, onError?: (error: Error) => void) => {
  try {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Clean up with a small delay to ensure download starts
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
    
    // Call success callback with delay to avoid extension conflicts
    if (onSuccess) {
      setTimeout(onSuccess, 200);
    }
    
  } catch (error) {
    // Call error callback with delay to avoid extension conflicts
    if (onError) {
      setTimeout(() => onError(error as Error), 100);
    }
  }
};

export const safeFetch = async (url: string, options?: RequestInit): Promise<Response> => {
  const response = await fetch(url, {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    ...options
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response;
};

export const downloadPDF = async (
  apiUrl: string, 
  filename: string, 
  onSuccess?: () => void, 
  onError?: (error: Error) => void
) => {
  try {
    const timestamp = new Date().getTime();
    const response = await safeFetch(`${apiUrl}?t=${timestamp}`);
    const blob = await response.blob();
    
    safeDownload(blob, filename, onSuccess, onError);
    
  } catch (error) {
    if (onError) {
      setTimeout(() => onError(error as Error), 100);
    }
  }
};
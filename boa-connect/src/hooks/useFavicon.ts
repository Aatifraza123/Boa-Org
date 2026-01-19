import { useEffect } from 'react';

export function useFavicon(logoUrl?: string) {
  useEffect(() => {
    if (!logoUrl) return;

    // Get or create favicon link element
    let favicon = document.querySelector<HTMLLinkElement>('#favicon');
    
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.id = 'favicon';
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }

    // Update favicon with logo URL
    favicon.href = logoUrl;
    
    // Also update apple-touch-icon if exists
    let appleTouchIcon = document.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]');
    if (!appleTouchIcon) {
      appleTouchIcon = document.createElement('link');
      appleTouchIcon.rel = 'apple-touch-icon';
      document.head.appendChild(appleTouchIcon);
    }
    appleTouchIcon.href = logoUrl;

  }, [logoUrl]);
}

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Global error handler to catch browser extension conflicts
window.addEventListener('error', (event) => {
  // Filter out browser extension errors
  if (
    event.error?.message?.includes('disconnected port object') ||
    event.error?.message?.includes('Extension context invalidated') ||
    event.error?.stack?.includes('chrome-extension://') ||
    event.error?.stack?.includes('moz-extension://') ||
    event.filename?.includes('chrome-extension://') ||
    event.filename?.includes('moz-extension://')
  ) {
    event.preventDefault();
    return false;
  }
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  // Filter out browser extension errors
  if (
    event.reason?.message?.includes('disconnected port object') ||
    event.reason?.message?.includes('Extension context invalidated') ||
    event.reason?.stack?.includes('chrome-extension://') ||
    event.reason?.stack?.includes('moz-extension://')
  ) {
    event.preventDefault();
    return false;
  }
});

createRoot(document.getElementById("root")!).render(<App />);

import React, { useCallback, useEffect, useRef, useState } from 'react';

type DayScheduleAPI = {
  initPopupWidget: (opts: { url: string; color?: { primary?: string; secondary?: string } }) => void;
  open?: () => void;
};

declare global {
  interface Window {
    daySchedule?: DayScheduleAPI;
  }
}

// Lightweight loader for the DaySchedule widget script
const loadDayScheduleScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // If already present, resolve immediately
    if (window.daySchedule) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://cdn.jsdelivr.net/npm/dayschedule-widget@"]'
    );
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load DaySchedule widget')));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/dayschedule-widget@latest/dist/dayschedule-widget.min.js';
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load DaySchedule widget'));
    document.head.appendChild(script);
  });
};

export type DayScheduleColors = {
  primary?: string;
  secondary?: string;
};

interface DayScheduleButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  url: string; // DaySchedule URL from Supabase
  colors?: DayScheduleColors;
  label?: string;
}

/**
 * Reusable button that opens the DaySchedule popup widget.
 *
 * Usage:
 * <DayScheduleButton url={bookingUrlFromSupabase} color={{ primary: '#0f0980', secondary: '#afeefe' }} />
 */
const DayScheduleButton: React.FC<DayScheduleButtonProps> = ({ url, colors, label = 'Book Now', ...buttonProps }) => {
  const [ready, setReady] = useState(false);
  const initializedRef = useRef(false);

  // Prepare script on mount
  useEffect(() => {
    let mounted = true;
    loadDayScheduleScript()
      .then(() => {
        if (!mounted) return;
        setReady(true);
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const openPopup = useCallback(async () => {
    try {
      await loadDayScheduleScript();
      const ds = window.daySchedule;
      if (!ds) throw new Error('DaySchedule library not available');

      // Initialize once per page load
      if (!initializedRef.current) {
        ds.initPopupWidget({ url, color: colors });
        initializedRef.current = true;
      }

      // Try to open the popup (the widget exposes open() after init)
      if (typeof ds.open === 'function') {
        ds.open();
      } else {
        // Fallback: re-init which will open the popup button
        ds.initPopupWidget({ url, color: colors });
      }
    } catch (e) {
      console.error('Failed to open DaySchedule popup:', e);
    }
  }, [url, colors]);

  return (
    <button
      type="button"
      onClick={openPopup}
      disabled={!ready}
      {...buttonProps}
    >
      {label}
    </button>
  );
};

export default DayScheduleButton;

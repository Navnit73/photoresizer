import { useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrlKey === undefined || shortcut.ctrlKey === event.ctrlKey;
        const shiftMatch = shortcut.shiftKey === undefined || shortcut.shiftKey === event.shiftKey;
        const altMatch = shortcut.altKey === undefined || shortcut.altKey === event.altKey;
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
          event.preventDefault();
          shortcut.action();
          break; // Only fire the first match
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

// Global keyboard shortcuts hook for navigation
export function useGlobalShortcuts() {
  const navigate = useNavigate();

  // Stable reference — prevents re-attaching listener on every render
  const shortcuts = useMemo<KeyboardShortcut[]>(() => [
    {
      key: 'h',
      altKey: true,
      action: () => navigate('/'),
      description: 'Go to home',
    },
    {
      key: 'c',
      altKey: true,
      action: () => navigate('/compress-image'),
      description: 'Open compress image',
    },
    {
      key: 'p',
      altKey: true,
      action: () => navigate('/passport-photo-editor'),
      description: 'Open passport photo editor',
    },
    {
      key: '/',
      ctrlKey: true,
      action: () => {
        alert('Keyboard Shortcuts:\nAlt+H: Home\nAlt+C: Compress Image\nAlt+P: Passport Photos\nCtrl+/: Show this help');
      },
      description: 'Show keyboard shortcuts',
    },
  ], [navigate]);

  useKeyboardShortcuts(shortcuts);
}

'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface AdminKeyboardShortcutProps {
  children?: React.ReactNode;
}

export function AdminKeyboardShortcut({ children }: AdminKeyboardShortcutProps) {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Admin mode toggle: Ctrl + Shift + A
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setIsAdminMode(prev => {
          const newMode = !prev;
          toast.success(
            newMode ? 'Admin mode enabled' : 'Admin mode disabled',
            {
              description: newMode 
                ? 'You now have access to admin features' 
                : 'Admin features are now hidden',
              duration: 3000,
            }
          );
          return newMode;
        });
        return;
      }

      // Debug mode: Ctrl + Shift + D
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        const debugInfo = {
          userAgent: navigator.userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString(),
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          localStorage: Object.keys(localStorage).length,
          sessionStorage: Object.keys(sessionStorage).length,
        };
        
        console.log('Debug Info:', debugInfo);
        toast.info('Debug info logged to console', {
          description: 'Check the browser console for detailed information',
          duration: 3000,
        });
        return;
      }

      // Clear cache: Ctrl + Shift + C
      if (event.ctrlKey && event.shiftKey && event.key === 'C') {
        event.preventDefault();
        
        // Clear various caches
        if ('caches' in window) {
          caches.keys().then(names => {
            names.forEach(name => {
              caches.delete(name);
            });
          });
        }
        
        // Clear storage
        localStorage.clear();
        sessionStorage.clear();
        
        toast.success('Cache cleared', {
          description: 'All caches and storage have been cleared',
          duration: 3000,
        });
        return;
      }

      // Reload app: Ctrl + Shift + R
      if (event.ctrlKey && event.shiftKey && event.key === 'R') {
        event.preventDefault();
        toast.info('Reloading application...', {
          duration: 1000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return;
      }

      // Show shortcuts help: Ctrl + Shift + ?
      if (event.ctrlKey && event.shiftKey && event.key === '?') {
        event.preventDefault();
        showShortcutsHelp();
        return;
      }

      // Track key sequence for easter eggs
      setKeySequence(prev => {
        const newSequence = [...prev, event.key].slice(-10); // Keep last 10 keys
        
        // Easter egg: typing "petrax" shows a special message
        if (newSequence.join('').toLowerCase().includes('petrax')) {
          toast.success('🛢️ PetraX Easter Egg!', {
            description: 'You found the secret! Welcome to the future of oil trading.',
            duration: 5000,
          });
          return [];
        }
        
        return newSequence;
      });
    };

    const showShortcutsHelp = () => {
      const shortcuts = [
        'Ctrl + Shift + A: Toggle admin mode',
        'Ctrl + Shift + D: Log debug info',
        'Ctrl + Shift + C: Clear cache',
        'Ctrl + Shift + R: Reload app',
        'Ctrl + Shift + ?: Show this help',
      ];
      
      toast.info('Keyboard Shortcuts', {
        description: shortcuts.join('\n'),
        duration: 8000,
      });
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Add admin mode indicator
  useEffect(() => {
    if (isAdminMode) {
      document.body.classList.add('admin-mode');
      
      // Add visual indicator
      const indicator = document.createElement('div');
      indicator.id = 'admin-mode-indicator';
      indicator.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: #ef4444;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        z-index: 9999;
        pointer-events: none;
      `;
      indicator.textContent = 'ADMIN MODE';
      document.body.appendChild(indicator);
    } else {
      document.body.classList.remove('admin-mode');
      const indicator = document.getElementById('admin-mode-indicator');
      if (indicator) {
        indicator.remove();
      }
    }

    return () => {
      document.body.classList.remove('admin-mode');
      const indicator = document.getElementById('admin-mode-indicator');
      if (indicator) {
        indicator.remove();
      }
    };
  }, [isAdminMode]);

  return children ? <>{children}</> : null;
}

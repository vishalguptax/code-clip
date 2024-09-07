import { useEffect } from 'react';

type ModifierKey = 'ctrl' | 'shift' | 'alt';

/**
 * Custom hook for handling keyboard shortcuts.
 *
 * @param {string} key - The key to listen for (e.g., 'k').
 * @param {() => void} callback - The function to call when the shortcut is triggered.
 * @param {ModifierKey} [modifier] - Optional modifier key (e.g., 'ctrl', 'shift', 'alt').
 */
const useKeyboardShortcut = (
  key: string,
  callback: () => void,
  modifier?: ModifierKey
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyMatch = event.key === key;
      const modifierMatch = modifier
        ? (modifier === 'ctrl' && event.ctrlKey) ||
          (modifier === 'shift' && event.shiftKey) ||
          (modifier === 'alt' && event.altKey)
        : true;

      if (keyMatch && modifierMatch) {
        event.preventDefault();
        callback();
      }
    };

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback, modifier]);
};

export default useKeyboardShortcut;

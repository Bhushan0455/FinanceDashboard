import { useState, useEffect } from "react";

function useLocalStorage(key, defaultValue) {
  // ── Step 1: Initialize state ──────────────────────────────
  // useState accepts a function ("lazy initializer") that runs only once
  // on the first render. We use this to read from localStorage.
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      // If we found a saved value, parse it from JSON string back to JS
      // If not, use the defaultValue
      return saved !== null ? JSON.parse(saved) : defaultValue;
    } catch (error) {
      // If JSON.parse fails (corrupted data), fall back to default
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  // ── Step 2: Sync state → localStorage ───────────────────────
  // Every time `value` changes, save it to localStorage.
  // JSON.stringify converts JS values (arrays, objects, booleans)
  // into a string format that localStorage can store.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;

import { useState, useEffect } from "react";

function usePersistentState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      // Check if saved value is null, undefined, or the string "undefined"
      if (saved === null || saved === undefined || saved === "undefined" || saved === "null") {
        return defaultValue;
      }
      return JSON.parse(saved);
    } catch (error) {
      console.warn(`Error parsing localStorage for key "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error saving to localStorage for key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;

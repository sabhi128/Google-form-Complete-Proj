// Utility function to clean up localStorage issues
export const cleanupLocalStorage = () => {
  const keys = [
    'showPreview', 
    'showTemplates', 
    'currentView', 
    'selectedTemplate', 
    'forms', 
    'selectedQuestion'
  ];
  
  let cleanedCount = 0;
  
  keys.forEach(key => {
    const value = localStorage.getItem(key);
    if (value === "undefined" || value === "null" || value === null) {
      localStorage.removeItem(key);
      cleanedCount++;
      console.log(`Cleaned up localStorage entry for key: ${key}`);
    }
  });
  
  console.log(`LocalStorage cleanup completed. Removed ${cleanedCount} invalid entries.`);
  return cleanedCount;
};

// Make it available globally for debugging
if (typeof window !== 'undefined') {
  window.cleanupLocalStorage = cleanupLocalStorage;
}

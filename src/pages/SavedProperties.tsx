// utils/savedProperties.ts

const STORAGE_KEY = "savedProperties";

export const getSavedProperties = (): string[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProperty = (id: string) => {
  const saved = getSavedProperties();
  if (!saved.includes(id)) {
    saved.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }
};

export const removeSavedProperty = (id: string) => {
  let saved = getSavedProperties();
  saved = saved.filter((pid) => pid !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
};

export const toggleSaveProperty = (id: string) => {
  const saved = getSavedProperties();
  if (saved.includes(id)) {
    const newSaved = saved.filter((pid) => pid !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSaved));
    return newSaved;
  } else {
    saved.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    return saved;
  }
};

export const isPropertySaved = (id: string) => {
  return getSavedProperties().includes(id);
};

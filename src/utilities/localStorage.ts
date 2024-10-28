import type { ISaveRes, IStoredId, IStoRes } from '@/types/interface';

export const getFromLocalStorage = (key: string): IStoredId[] => {
  const items = localStorage.getItem(key);
  return JSON.parse(items || '[]') as IStoredId[];
};

export const saveToLocalStorage = (key: string, id: string): ISaveRes => {
  const storedItems = getFromLocalStorage(key);

  if (storedItems.length >= 11) {
    return { success: false, isExist: false };
  }

  const idExists = storedItems.find(stored => stored.id === id);

  if (idExists) {
    return { success: false, isExist: true };
  }

  const newItem: IStoredId = { id, selectedAt: new Date() };

  const updatedItems = [...storedItems, newItem];

  localStorage.setItem(key, JSON.stringify(updatedItems));
  return { success: true, isExist: false };
};

export const removeFromLocalStorage = (key: string, id: string): IStoRes => {
  const storedItems = getFromLocalStorage(key);

  const updatedItems = storedItems.filter(stored => stored.id !== id);

  localStorage.setItem(key, JSON.stringify(updatedItems));
  return { success: true };
};

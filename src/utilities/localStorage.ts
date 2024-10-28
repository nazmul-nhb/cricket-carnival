export const getItemFromStorage = (key: string): string[] => {
  const items = localStorage.getItem(key);
  return JSON.parse(items || '[]') as string[];
};

export const saveItemToStorage = (
  key: string,
  item: string,
): { success: boolean } => {
  const storedItems = getItemFromStorage(key);

  if (storedItems.includes(item)) {
    return { success: false };
  }

  const updatedItems = [...storedItems, item];

  localStorage.setItem(key, JSON.stringify(updatedItems));
  return { success: true };
};

export const removeItemFromStorage = (
  key: string,
  item: string,
): { success: boolean } => {
  const storedItems = getItemFromStorage(key);

  const updatedItems = storedItems.filter(storedItem => storedItem !== item);

  localStorage.setItem(key, JSON.stringify(updatedItems));
  return { success: true };
};

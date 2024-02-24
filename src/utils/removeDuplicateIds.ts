import { Product } from '../types/product';

export const removeDuplicates = (array: Product[]) => {
  const set = new Set();
  const result: Product[] = [];

  array.forEach((item) => {
    if (set.has(item.id)) {
      return;
    }
    result.push(item);
    set.add(item.id);
  });
  return result;
};

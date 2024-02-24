import md5 from 'crypto-js/md5';
import { Filters, ProductIds } from '../types/product';

const API_URL = 'http://api.valantis.store:40000/';

const generateXAuth = (password: string = 'Valantis') => {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const authString = `${password}_${timestamp}`;
  const xAuth = md5(authString).toString();
  return xAuth;
};

export const getProductIds = async (offset: number, limit: number) => {
  const xAuth = generateXAuth();
  let n: number = 0;
  while (n < 2)
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': xAuth,
        },
        body: JSON.stringify({
          action: 'get_ids',
          params: { offset, limit },
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const products = await response.json();
      return products.result;
    } catch (err) {
      console.error('Error fetching product IDs:', err);
      n += 1;
    }
};

export const getProducts = async (items: ProductIds[]) => {
  const xAuth = generateXAuth();

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': xAuth,
      },
      body: JSON.stringify({
        action: 'get_items',
        params: { ids: items },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.result;
  } catch (err) {
    console.error(`Error fetching products:`, err);
  }
};

export const getFilteredProducts = async ({
  product,
  brand,
  price,
}: Filters) => {
  const xAuth = generateXAuth();

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': xAuth,
      },
      body: JSON.stringify({
        action: 'filter',
        params: {
          product: product ? product : undefined,
          brand: brand ? brand : undefined,
          price: price ? Number(price) : undefined,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.result;
  } catch (err) {
    console.error(`Error fetching Filtered products:`, err);
  }
};

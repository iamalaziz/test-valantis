import { useState, useEffect } from 'react';
import { getProductIds, getProducts, getFilteredProducts } from '../api/productApis'; 
import { removeDuplicates } from '../utils/removeDuplicateIds';
import {Product, Filters, ProductIds}from '../types/product'


const useProductData = (currentPage: number, filters: Filters) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Product[]>([]);
  const [search, setSearch] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      let productIds: ProductIds[] = [];
      
      if (filters.product || filters.brand || filters.price) {
        productIds = await getFilteredProducts(filters);
      } else {
        productIds = await getProductIds(currentPage * 50, 50);
      }

      const products = await getProducts(productIds);
      if(!products) {
        throw new Error('Products Not Found')
      }
      const formatted: Product[] = removeDuplicates(products);
      setData(formatted);
      setLoading(false);
      setSearch(false)
    } catch (error) {
      console.error('Error fetching products data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, search]);

  return { loading, data, setSearch };
};

export default useProductData;

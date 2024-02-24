import React from 'react';
import { Filters } from '../types/product';
import { useState } from 'react';
import { Table, Spin, Space, Input, Button } from 'antd';
import styled from 'styled-components';
import useProductData from '../hooks/useProductData';
import { columns } from './constants/consts';

const SpinWrapper = styled(Spin)`
  margin-top: 400px;
`;

const ProductsList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<Filters>({
    product: '',
    brand: '',
    price: '',
  });
  const {loading, data, setSearch} = useProductData(currentPage, filters)

  const handleInputChange = (
    value: string,
    field: keyof typeof filters
  ) => {
    setFilters({ ...filters, [field]: value });
    console.log(filters)
  };
  return (
    <div>
      {loading ? (
        <SpinWrapper tip="Loading..." size="large">
          <div className="content" />
        </SpinWrapper>
      ) : (
        <>
          <Space>
            <Input
              placeholder="Name"
              value={filters.product}
              onChange={(e) => handleInputChange(e.target.value, 'product')}
            />
            <Input
              placeholder="Brand"
              value={filters.brand}
              onChange={(e) => handleInputChange(e.target.value, 'brand')}
            />
            <Input
              placeholder="Price"
              value={filters.price}
              onChange={(e) =>
                handleInputChange(e.target.value, 'price')
              }
            />
            <Button type="primary" onClick={() => setSearch(true) }>
              Search
            </Button>
          </Space>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={{ current: currentPage, pageSize: 50, total: 500 }}
            onChange={(pagination) => setCurrentPage(pagination.current || 1)}
            scroll={{ y: 600 }}
            bordered
            style={{ marginTop: '30px' }}
          />
        </>
      )}
    </div>
  );
};

export default ProductsList;

export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    render: (text: string) => <a>{text}</a>,
    width: '40%',
  },
  {
    title: 'Product',
    dataIndex: 'product',
    width: '30%',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
];
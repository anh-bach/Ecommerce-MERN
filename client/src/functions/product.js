import axios from 'axios';

export const createProduct = async (values, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/product`,
    { ...values },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getProductsByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API}/products/${count}`, {});
};

export const getProducts = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/product`);
};

export const getProduct = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
};

export const removeProduct = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateProduct = async (slug, values, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/product/${slug}`,
    { ...values },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const ListProducts = async (sort, order, limit) => {
  return await axios.post(`${process.env.REACT_APP_API}/products/`, {
    sort,
    order,
    limit,
  });
};

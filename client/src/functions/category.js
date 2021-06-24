import axios from 'axios';

export const getCategories = async () => {
  try {
    return await axios.get(`${process.env.REACT_APP_API}/categories`, {});
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async (slug) => {
  try {
    return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`, {});
  } catch (error) {
    console.log(error);
  }
};

export const removeCategory = async (slug, authtoken) => {
  try {
    return await axios.delete(
      `${process.env.REACT_APP_API}/category/${slug}`,
      {},
      {
        headers: {
          authtoken,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (slug, name, authtoken) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_API}/category/${slug}`,
      { name },
      {
        headers: {
          authtoken,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (name, authtoken) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API}/category`,
      { name },
      {
        headers: {
          authtoken,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

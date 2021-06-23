import axios from 'axios';

export const createOrUpdateUser = async (authToken) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API}/create-or-update-user`,
      {},
      {
        headers: {
          authToken,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const currentUser = async (authToken) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API}/current-user`,
      {},
      {
        headers: {
          authToken,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const currentAdmin = async (authToken) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API}/current-admin`,
      {},
      {
        headers: {
          authToken,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

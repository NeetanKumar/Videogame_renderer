import axios from 'axios';

const API_URL = 'https://spa.api.logicloop.io/api/games';

export const getGames = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

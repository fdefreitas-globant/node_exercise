import { insertAdvice } from './model';
import axios from 'axios';
import nconf from 'nconf';
import path from 'path';

nconf.file({ file: path.join(__dirname, '../../.env.json') });

const BASE_URL = nconf.get('BASE_URL');

export const getAdvice = async (keyword) => {
  try {
    // Get Advice from API
    const { data } = await axios.get(`${BASE_URL}${keyword}`);
    const { advice, id } = data.slip;

    // Store advice
    await insertAdvice({
      api_id: id,
      query: keyword,
      advice,
    });

    return advice;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { getAdvice };

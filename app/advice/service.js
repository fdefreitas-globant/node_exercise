import { insertAdvice, readAdvice } from './model';
import axios from 'axios';
import nconf from 'nconf';
import path from 'path';

nconf.file({ file: path.join(__dirname, '../../.env.json') });
const BASE_URL = nconf.get('BASE_URL');

export const getRandomElement = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    throw new Error('Invalid array');
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const getAdvice = async (keyword) => {
  try {
    // Search in the database
    const dbAdvice = await readAdvice({ query: keyword });

    // Return if an advice is found
    if (dbAdvice) {
      return dbAdvice.advice;
    }

    // Get Advice from API
    const { data } = await axios.get(`${BASE_URL}${keyword}`);

    // skip store if there is no data
    if (data?.slips?.length === 0) {
      throw new Error('advice not found');
    }

    // Get the first result
    const { advice, id } = getRandomElement(data.slips);

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

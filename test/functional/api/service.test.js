import axios from 'axios';
import { insertAdvice, readAdvice } from '../../../app/advice/model';
import { getAdvice, getRandomElement } from '../../../app/advice/service';

jest.mock('axios');
jest.mock('../../../app/advice/model');

describe('TEST: Advice Service', () => {
  describe('TEST: getAdvice', () => {
    const keyword = 'abcd';

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should fetch advice and store it successfully', async () => {
      const mockAdvice = { slips: [{ advice: 'Stay positive!', id: 1 }] };

      axios.get.mockResolvedValueOnce({ data: mockAdvice });
      insertAdvice.mockResolvedValueOnce();

      const advice = await getAdvice(keyword);

      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:3150/api/advice/search/${keyword}`,
      );
      expect(insertAdvice).toHaveBeenCalledWith({
        api_id: 1,
        query: keyword,
        advice: 'Stay positive!',
      });
      expect(advice).toBe('Stay positive!');
    });

    test('should read advice from db successfully', async () => {
      const mockAdvice = { advice: 'Stay positive!', id: 1 };

      readAdvice.mockResolvedValueOnce(mockAdvice);

      const advice = await getAdvice(keyword);

      expect(axios.get).not.toHaveBeenCalled();
      expect(insertAdvice).not.toHaveBeenCalled();
      expect(readAdvice).toHaveBeenCalledWith({ query: keyword });
      expect(advice).toBe('Stay positive!');
    });

    test('should throw an error if does not find an advice', async () => {
      const errorMessage = 'advice not found';
      const mockAdvice = { slips: [] };

      axios.get.mockResolvedValueOnce({ data: mockAdvice });

      await expect(getAdvice(keyword)).rejects.toThrow(errorMessage);
    });

    test('should throw an error if axios fails', async () => {
      const errorMessage = 'Network Error';

      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(getAdvice(keyword)).rejects.toThrow(errorMessage);
    });

    test('should throw an error if insertAdvice fails', async () => {
      const mockAdvice = { slips: [{ advice: 'Stay positive!', id: 1 }] };

      axios.get.mockResolvedValueOnce({ data: mockAdvice });
      insertAdvice.mockRejectedValueOnce(new Error('Database Error'));

      await expect(getAdvice(keyword)).rejects.toThrow('Database Error');
    });
  });

  describe('TEST: getRandomElement', () => {
    test('should return an element from a non-empty array', () => {
      const fruits = ['apple', 'banana', 'cherry'];
      const result = getRandomElement(fruits);
      expect(fruits).toContain(result);
    });

    test('should throw an error for an empty array', () => {
      expect(() => getRandomElement([])).toThrow('Invalid array');
    });

    test('should throw an error for a non-array input', () => {
      expect(() => getRandomElement('not an array')).toThrow('Invalid array');
      expect(() => getRandomElement(123)).toThrow('Invalid array');
      expect(() => getRandomElement({})).toThrow('Invalid array');
    });

    test('should return the only element of a single-element array', () => {
      const singleFruit = ['apple'];
      const result = getRandomElement(singleFruit);
      expect(result).toBe('apple');
    });

    test('should handle arrays with multiple identical elements', () => {
      const identicalFruits = ['apple', 'apple', 'apple'];
      const result = getRandomElement(identicalFruits);
      expect(result).toBe('apple');
    });
  });
});

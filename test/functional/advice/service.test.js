import axios from 'axios';
import { insertAdvice } from '../../../app/advice/model';
import { getAdvice } from '../../../app/advice/service';

jest.mock('axios');
jest.mock('../../../app/advice/model');

describe('TEST: Advice Service', () => {
  describe('TEST: getAdvice', () => {
    const keyword = 'abcd';

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should fetch advice and store it successfully', async () => {
      const mockAdvice = { slip: { advice: 'Stay positive!', id: 1 } };

      axios.get.mockResolvedValueOnce({ data: mockAdvice });
      insertAdvice.mockResolvedValueOnce();

      const advice = await getAdvice(keyword);

      expect(axios.get).toHaveBeenCalledWith(
        `https://api.adviceslip.com/advice/${keyword}`,
      );
      expect(insertAdvice).toHaveBeenCalledWith({
        api_id: 1,
        query: keyword,
        advice: 'Stay positive!',
      });
      expect(advice).toBe('Stay positive!');
    });

    test('should throw an error if axios fails', async () => {
      const errorMessage = 'Network Error';

      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(getAdvice(keyword)).rejects.toThrow(errorMessage);
    });

    test('should throw an error if insertAdvice fails', async () => {
      const mockAdvice = { slip: { advice: 'Stay positive!', id: 1 } };

      axios.get.mockResolvedValueOnce({ data: mockAdvice });
      insertAdvice.mockRejectedValueOnce(new Error('Database Error'));

      await expect(getAdvice(keyword)).rejects.toThrow('Database Error');
    });
  });
});

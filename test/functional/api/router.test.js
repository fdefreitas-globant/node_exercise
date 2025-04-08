import request from 'supertest';
import dataService from '../../../app/api/service';
import app from 'app';

jest.mock('../../../app/api/service');

describe('TEST: API Router', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /advice/search/:keyword', () => {
    test('should return advices matching the keyword', async () => {
      const mockAdvices = {
        slips: [{ id: 1, advice: 'Believe in yourself.' }],
      };
      dataService.getAdvices.mockResolvedValue(mockAdvices);

      const response = await request(app).get('/api/advice/search/Believe');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAdvices);
      expect(dataService.getAdvices).toHaveBeenCalledWith('Believe');
    });

    test('should return an empty array when no advices match the keyword', async () => {
      const mockAdvices = { slips: [] };
      dataService.getAdvices.mockResolvedValue(mockAdvices);

      const response = await request(app).get('/api/advice/search/nonexistent');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAdvices);
      expect(dataService.getAdvices).toHaveBeenCalledWith('nonexistent');
    });

    test('should handle errors from the advice service', async () => {
      dataService.getAdvices.mockRejectedValue(new Error('Service error'));

      const response = await request(app).get('/api/advice/search/Believe');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        title: 'API server encountered an unexpected error.',
      });
    });
  });
});

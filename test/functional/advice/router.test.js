import request from 'supertest';
import adviceService from '../../../app/advice/service';
import app from 'app';

jest.mock('../../../app/advice/service');

describe('TEST: Advice Router', () => {
  const keyword = 'abc';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return advice when valid keyword is provided', async () => {
    const mockAdvice = 'Stay positive!';
    adviceService.getAdvice.mockResolvedValueOnce(mockAdvice);

    const response = await request(app).get(`/advice/${keyword}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ advice: mockAdvice });
    expect(adviceService.getAdvice).toHaveBeenCalledWith(keyword);
  });

  test('should return a 502 error when getAdvice fails', async () => {
    adviceService.getAdvice.mockRejectedValueOnce(new Error('Service Error'));

    const response = await request(app).get(`/advice/${keyword}`);

    expect(response.status).toBe(502);
    expect(response.body).toEqual({ title: 'Bad Gateway' });
  });

  test('should return a 400 error if validation fails', async () => {
    const response = await request(app).get('/advice/123');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ title: 'Bad Request' });
  });
});

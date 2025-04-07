import createHttpError from 'http-errors';
import { validateParam } from '../../../app/advice/middlewares';

describe('TEST: Middlewares', () => {
  describe('TEST: validateParam', () => {
    let req, res, next;
    const error = createHttpError(400);

    beforeEach(() => {
      req = {
        params: {},
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      next = jest.fn();
    });

    test('should call next() if the keyword is a valid string', () => {
      req.params.keyword = 'abc';

      validateParam(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });

    test('should return an error if the keyword is not a string', () => {
      req.params.keyword = 123;

      validateParam(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    test('should return an error if the keyword is an empty string', () => {
      req.params.keyword = '';

      validateParam(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    test('should return an error if the keyword contains only spaces', () => {
      req.params.keyword = '   ';

      validateParam(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    test('should return an error if the keyword contains invalid characters', () => {
      req.params.keyword = 'abc123';

      validateParam(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

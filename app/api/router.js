import express from 'express';
import dataService from './service';
import createHttpError from 'http-errors';

const router = express.Router();

router.get('/advice/search/:keyword', async (req, res, next) => {
  try {
    // Get Param
    const { keyword } = req.params;

    // Get Advice from service
    const advices = await dataService.getAdvices(keyword);

    res.json(advices);
  } catch (error) {
    next(createHttpError(500));
  }
});

export default router;

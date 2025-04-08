import express from 'express';
import createHttpError from 'http-errors';
import adviceService from './service';
import { validateParam } from './middlewares';

const router = express.Router();

router.get('/:keyword', validateParam, async (req, res, next) => {
  try {
    // Get Param
    const { keyword } = req.params;

    // Get Advice from service
    const advice = await adviceService.getAdvice(keyword);

    res.json({ advice });
  } catch (error) {
    console.log(error.message);
    next(createHttpError(502));
  }
});

export default router;

import express from 'express';
import { insertAdvice } from './model';
import createHttpError from 'http-errors';

const router = express.Router();

router.get('/:keyword', async (req, res, next) => {

  try {
    // Get Param
    const { keyword } = req.params;

    // Get Advice
    const { data } = await axios.get(`https://api.adviceslip.com/advice/${keyword}`);
    const { advice, id } = data.slip;

    // Store advice
    await insertAdvice({
      api_id: id,
      query: keyword,
      advice,
    })

    res.json({ advice });
  } catch (error) {
    console.error(error);
    next(createHttpError(502))
  }
});

export default router;

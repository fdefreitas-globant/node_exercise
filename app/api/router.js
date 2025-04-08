import express from 'express';
import dataService from './service';

const router = express.Router();

router.get('/advice/search/:keyword', async (req, res) => {
  // Get Param
  const { keyword } = req.params;

  // Get Advice from service
  const advices = await dataService.getAdvices(keyword);

  res.json(advices);
});

export default router;

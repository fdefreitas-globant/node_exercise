import createHttpError from 'http-errors';

export const validateParam = (req, res, next) => {
  const { keyword } = req.params;

  const lettersOnly = /^[a-zA-Z]+$/;
  if (
    !lettersOnly.test(keyword) ||
    typeof keyword !== 'string' ||
    keyword.trim() === ''
  ) {
    return next(createHttpError(400));
  }

  next();
};

export default { validateParam };

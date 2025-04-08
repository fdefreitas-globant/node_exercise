import data from '../../data/advices.json';

export const getAdvices = async (keyword) => {
  const slips = data.filter((item) => item.advice.includes(keyword));

  return { slips };
};

export default { getAdvices };

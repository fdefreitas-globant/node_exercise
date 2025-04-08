import data from '../../data/advices.json';

export const getAdvices = async (keyword) => {
  if (
    typeof keyword !== 'string' ||
    (typeof keyword === 'string' && keyword.length === 0)
  ) {
    return { slips: [] };
  }

  const slips = data.filter((item) =>
    item.advice.toLowerCase().includes(keyword.toLowerCase()),
  );

  return { slips };
};

export default { getAdvices };

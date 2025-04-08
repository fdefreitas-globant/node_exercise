import { getAdvices } from '../../../app/api/service';

describe('TEST: API Service', () => {
  describe('TEST: getAdvices', () => {
    test('should return advice that includes the keyword', async () => {
      const result = await getAdvices('Believe');
      expect(result.slips).toHaveLength(3);
    });

    test('should return multiple advices when keyword matches multiple items', async () => {
      const result = await getAdvices('and');
      expect(result.slips).toHaveLength(3);
    });

    test('should return an empty array when no advice matches the keyword', async () => {
      const result = await getAdvices('nonexistent');
      expect(result.slips).toHaveLength(0);
    });

    test('should return an empty array when keyword is an empty string', async () => {
      const result = await getAdvices('');
      expect(result.slips).toHaveLength(0);
    });

    test('should be case-sensitive when matching keywords', async () => {
      const result = await getAdvices('stay');
      expect(result.slips).toHaveLength(0);
    });

    test('should handle special characters in keywords', async () => {
      const result = await getAdvices('hard');
      expect(result.slips).toHaveLength(0);
    });
  });
});

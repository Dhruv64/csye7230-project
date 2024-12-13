// income.actions.test.ts

import { createIncome } from '../../../lib/actions/income.actions';
import { connectToDB } from '../../../lib/database/mongoose';
import Income from '../../../lib/database/models/income.model';

jest.mock('../../../lib/database/mongoose', () => ({
  connectToDB: jest.fn(),
}));

jest.mock('../../../lib/database/models/income.model', () => ({
  default: jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue({
      name: 'Income Name',
      amount: 2000,
      createdBy: 'user123',
      icon: 'default-icon',
    }),
  })),
}));


describe('Income Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createIncome', () => {
    it('should create a new income', async () => {
      const mockIncomeData = {
        name: 'Income Name',
        amount: 2000,
        createdBy: 'user123',
        icon: 'default-icon',
      };

      const result = await createIncome(mockIncomeData);

      expect(connectToDB).toHaveBeenCalled();
      expect(Income.create).toHaveBeenCalledWith(mockIncomeData);
      // expect(result).toHaveProperty('_id', 'income123');
      // expect(result).toHaveProperty('amount', 2000);
    });
  });
});

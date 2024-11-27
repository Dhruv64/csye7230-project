import { createIncome } from '../../../lib/actions/income.actions';
import { connectToDB } from '../../../lib/database/mongoose';
import Income from '../../../lib/database/models/income.model';

// Mock the dependencies
jest.mock('../../../lib/database/mongoose', () => ({
  connectToDB: jest.fn()
}));

jest.mock('../../../lib/database/models/income.model', () => {
  return {
    __esModule: true,
    default: {
      prototype: {
        save: jest.fn()
      }
    }
  };
});

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
        icon: 'default-icon'
      };

      const mockSavedIncome = { 
        ...mockIncomeData, 
        _id: 'income123' 
      };

      (Income.prototype.save as jest.Mock).mockResolvedValue(mockSavedIncome);

      const result = await createIncome(mockIncomeData);

      expect(connectToDB).toHaveBeenCalled();
      expect(result).toHaveProperty('amount', 2000);
      expect(result).toHaveProperty('source', 'Salary');
    });
  });
});
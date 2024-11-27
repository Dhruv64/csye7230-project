import mongoose from 'mongoose';
import { createBudget, getAllBudgets } from '../../../lib/actions/budget.actions';
import { connectToDB } from '../../../lib/database/mongoose';
import Budget from '../../../lib/database/models/budget.model';

// Mock the dependencies
jest.mock('../../../lib/database/mongoose', () => ({
  connectToDB: jest.fn()
}));

jest.mock('../../../lib/database/models/budget.model', () => {
  return {
    __esModule: true,
    default: {
      find: jest.fn(),
      prototype: {
        save: jest.fn()
      }
    }
  };
});

describe('Budget Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createBudget', () => {
    it('should create a new budget', async () => {
      const mockBudgetData = {
        name: 'Test Budget',
        amount: 1000,
        createdBy: 'user123',
        icon: 'default-icon'
      };

      const result = await createBudget(mockBudgetData);

      expect(connectToDB).toHaveBeenCalled();
      expect(result).toHaveProperty('name', 'Test Budget');
      expect(result).toHaveProperty('amount', 1000);
    });
  });

  describe('getAllBudgets', () => {
    it('should fetch all budgets for a user', async () => {
      const userId = 'user123';
      const mockBudgets = [
        { name: 'Budget 1', amount: 500, createdBy: userId },
        { name: 'Budget 2', amount: 1000, createdBy: userId }
      ];

      // Mock the populate method chain
      (Budget.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockBudgets)
      });

      const result = await getAllBudgets(userId);

      expect(connectToDB).toHaveBeenCalled();
      expect(Budget.find).toHaveBeenCalledWith({ createdBy: userId });
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('name', 'Budget 1');
    });
  });
});
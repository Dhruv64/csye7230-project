import { createExpense, getAllExpenses } from '../../../lib/actions/expense.actions';
import { connectToDB } from '../../../lib/database/mongoose';
import Expense from '../../../lib/database/models/expense.model';
import { m } from 'framer-motion';

// Mock the dependencies
jest.mock('../../../lib/database/mongoose', () => ({
  connectToDB: jest.fn()
}));

jest.mock('../../../lib/database/models/expense.model', () => {
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

describe('Expense Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createExpense', () => {
    it('should create a new expense', async () => {
      const mockExpenseData = {
        amount: 50,
        name: 'Food',
        createdBy: 'user123',
        budgetId : 'budget123'
      };

      const mockSavedExpense = { 
        ...mockExpenseData, 
        _id: 'expense123' 
      };

      (Expense.prototype.save as jest.Mock).mockResolvedValue(mockSavedExpense);

      const result = await createExpense(mockExpenseData);

      expect(connectToDB).toHaveBeenCalled();
      expect(result).toHaveProperty('amount', 50);
      expect(result).toHaveProperty('_id', 'expense123');
    });

    it('should throw an error if expense creation fails', async () => {
      const mockExpenseData = {
        amount: 50,
        name: 'Food',
        createdBy: 'user123',
        budgetId : 'budget123'
      };

      (Expense.prototype.save as jest.Mock).mockRejectedValue(new Error('Creation failed'));

      await expect(createExpense(mockExpenseData)).rejects.toThrow('Failed to create Expense');
    });
  });

  describe('getAllExpenses', () => {
    it('should fetch all expenses for a user', async () => {
      const userId = 'user123';
      const mockExpenses = [
        { amount: 50, name: 'Food', createdBy: userId , budgetId : 'budget123'},
        { amount: 100, name: 'Transport', createdBy: userId  , budgetId : 'budget123'}
      ];

      (Expense.find as jest.Mock).mockResolvedValue(mockExpenses);

      const result = await getAllExpenses(userId);

      expect(connectToDB).toHaveBeenCalled();
      expect(Expense.find).toHaveBeenCalledWith({ createdBy: userId });
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('amount', 50);
    });
  });
});
import { m } from 'framer-motion';
import { createUser, getUserById } from '../../../lib/actions/user.actions';
import User from '../../../lib/database/models/user.model';
import { connectToDB } from '../../../lib/database/mongoose';
import { handleError } from '../../../src/lib/utils';

// Mock the dependencies
jest.mock('../../../lib/database/mongoose', () => ({
  connectToDB: jest.fn()
}));

jest.mock('../../../src/lib/utils', () => ({
  handleError: jest.fn()
}));

jest.mock('../../../lib/database/models/user.model', () => {
  return {
    __esModule: true,
    default: {
      create: jest.fn(),
      findOne: jest.fn()
    }
  };
});

describe('User Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const mockUserData = {
        clerkId: 'clerk123',
        email: 'test@example.com',
        username: 'testuser',
        image: 'default-image'
      };

      const mockCreatedUser = { 
        ...mockUserData, 
        _id: 'user123' 
      };

      (User.create as jest.Mock).mockResolvedValue(mockCreatedUser);

      const result = await createUser(mockUserData);

      expect(connectToDB).toHaveBeenCalled();
      expect(User.create).toHaveBeenCalledWith(mockUserData);
      expect(result).toEqual(JSON.parse(JSON.stringify(mockCreatedUser)));
    });

    it('should handle error during user creation', async () => {
      const mockUserData = {
        clerkId: 'clerk123',
        email: 'test@example.com',
        username: 'testuser',
        image: 'default-image'
      };

      const mockError = new Error('Creation failed');
      (User.create as jest.Mock).mockRejectedValue(mockError);

      await createUser(mockUserData);

      expect(handleError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getUserById', () => {
    it('should fetch a user by Clerk ID', async () => {
      const userId = 'clerk123';
      const mockUser = {
        clerkId: userId,
        email: 'test@example.com',
        username: 'testuser'
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await getUserById(userId);

      expect(connectToDB).toHaveBeenCalled();
      expect(User.findOne).toHaveBeenCalledWith({ clerkId: userId });
      expect(result).toEqual(JSON.parse(JSON.stringify(mockUser)));
    });

    it('should throw an error if user is not found', async () => {
      const userId = 'nonexistent';
    
      (User.findOne as jest.Mock).mockResolvedValue(null);
    
      await expect(getUserById(userId)).rejects.toThrow('User not found');
    });
    
  });
});
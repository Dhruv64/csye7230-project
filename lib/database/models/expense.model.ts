import {Schema,model,models} from 'mongoose';

const expenseSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Expense name is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Expense amount is required'],
      default: 0,
    },
    budgetId: {
      type: Schema.Types.ObjectId,
      ref: 'budget', // Reference to Budgets collection
      required: [true, 'Budget ID is required'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user', // Reference to User model
      required: [true, 'Creator information is required'],
    },
  }, {
    timestamps: true
  });
  
  const Expense = models.expense || model('expense', expenseSchema);
  
  export default Expense;
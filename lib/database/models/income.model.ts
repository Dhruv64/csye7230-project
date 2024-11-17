import { Schema, model, models } from 'mongoose';

const incomeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Income name is required'],
  },
  amount: {
    type: String,
    required: [true, 'Income amount is required'],
  },
  icon: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user', // Reference to User model
    required: [true, 'Creator information is required'],
  }
}, {
  timestamps: true
});

const Income = models.income || model('income', incomeSchema);

export default Income;
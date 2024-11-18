import {Schema,model,models} from 'mongoose';


const budgetSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Budget name is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Budget amount is required'],
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
  
  const Budget = models.budget || model('budget', budgetSchema);
  
  export default Budget;
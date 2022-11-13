import { model, Schema } from 'mongoose';

const schema = new Schema(
  {
    name: String,
    email: String,
    loan_type: String,
    salary: Number,
    have_existing_loan: Boolean,
    monthly_repay: Number,
    has_bought_over: Boolean,
    loan_provider_choice: String,
    mobile_number: String,
    bvn: String,
    business_location: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = model('User', schema);

export default User;

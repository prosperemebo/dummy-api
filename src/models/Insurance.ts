import { model, Schema } from 'mongoose';

const schema = new Schema({
  initial: { type: String, required: true },
  name: { type: String, required: true },
  policyNumber: { type: Number },
  status: { type: Boolean, required: true },
  price: { type: Number, required: true },
  fullname: String,
});

schema.pre('save', function () {
  (this as any).fullname = `${this.initial} ${this.name}`;
  (this as any).policyNumber = Math.floor(Math.random() * 50000);
});

const Insurance = model('Insurance', schema);

export default Insurance;

import mongoose from 'mongoose';
import { loadType } from 'mongoose-currency';

const Schema = mongoose.Schema;
loadType(mongoose);

const TransactionsSchema = new Schema({
    buyer: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100,
    },
    amount: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100,
    },
    productIds: [
      {
        type: mongoose.Types.Types.ObjectId,
        ref: "Product",
      },
    ],
  }
  { timestamps: true, toJSON: {getters: true}}
  );

  const Transactions = mongoose.model('Transactions', TransactionsSchema);
  export default Transactions;
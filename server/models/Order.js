const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderid: { type: String, required: true },
  manufacturer: { type: String, required: true },
  transporter: { type: String, required: true },
  quantity: {type: String, require: true},
  to: {type: String, require: true},
  from: {type: String, require: true},
  address: {type: String, require: true},
  price:{type: String}
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

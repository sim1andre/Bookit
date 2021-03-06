const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema ({
  bookingType: {type: String, required: true},
  bookingDate: {type: Date, required: true},
  bookingTime: {type: Date, required: true},
  comments: {type: String},
  registered: {type: Date, default: Date.now},
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }
});

module.exports = mongoose.model('Booking', BookingSchema);

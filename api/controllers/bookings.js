'use strict'

const mongoose = require('mongoose');
const Booking = mongoose.model('Booking');
const moment = require('moment');

class BookingController {

  static findBookings(req, res) {
    Booking.find({},(err, bookings) => {

      if(err){
        res.render('error', {err:err});
      }
      res.render('bookings', {bookings: bookings, user: req.user });
    });
  }

  static findBooking(req, res) {
    Booking.findById(req.params.booking_id, (err, booking) => {

      booking = booking.toObject();
      booking.registeredFormatted = moment(booking.registered).fromNow();
      booking.dateFormatted = moment(booking.bookingDate).calendar();
      booking.timeFormatted = moment(booking.bookingDate).endOf('hours').fromNow();

      if(err) {
        res.render('error', {err: err});
      }
      res.render('single', {booking: booking, user: req.user});
    });
  }

  static createBooking(req, res) {
    let booking = new Booking(req.body);

    booking.save((err) => {
      if(err) {
        res.render('error', {err: err});
      }
      res.render('create',
      {message: 'Du har lagret en ny booking', user: req.user});
    });
  }

  static updateBooking(req, res) {
    Booking.findOneAndUpdate({_id: req.params.booking_id}, req.body, (err, booking) => {
      if(err) {
        res.render('error', {err:err});
      }
      res.redirect('/bookings');
    });
  }

  static deleteBooking(req, res) {
    Booking.remove({
      _id: req.params.booking_id
    }, (err, booking) => {
      if(err) {
        res.render('error', {err:err});
      }
      res.redirect('/bookings');
    });
  }

  static validateUser(req, res, next) {
    if (!req.user) {
      return res.redirect('/login');
    }
    next();
  }

}

module.exports = BookingController;

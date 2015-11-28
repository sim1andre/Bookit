'use strict';

const Bookings = require('./../api/controllers/bookings');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('home');
  })

  app.get('/bookings/create', (req, res) => {
    res.render('create');
  })



  //GET
  app.get('/bookings', Bookings.findBookings);
  app.get('/bookings/:booking_id', Bookings.findBooking);

  //POST
  app.post('/bookings/create', Bookings.createBooking);

  //UPDATE
  app.put('/bookings/update/:booking_id', Bookings.updateBooking);

  //DELETE
  app.delete('/bookings/delete/:booking_id', Bookings.deleteBooking);

}

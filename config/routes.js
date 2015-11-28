'use strict';

const Bookings = require('./../api/controllers/bookings');

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.render('home');
  })

  app.get('/profile', (req, res) => {
    res.render('profile');
  })

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/bookings/create', (req, res) => {
    res.render('create');
  })

  app.get('/login', (req, res) => {
    res.render('login');
  })

  app.get('/signup', (req, res) => {
    res.render('register');
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

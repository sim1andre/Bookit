'use strict';

const Bookings = require('./../api/controllers/bookings');
const Users = require('../api/controllers/users');
const passport = require('passport');

module.exports = (app) => {
  app.get('/', (req, res) => {
      res.render('home', { user: req.user });
  })

  app.get('/bookings/create', (req, res) => {
    res.render('create', { user: req.user });
  })

  //validate these as logged in
  app.all('/bookings', Bookings.validateUser);
  app.all('/bookings/:booking_id', Bookings.validateUser);

  // api requests
  app.get('/bookings', Bookings.findBookings);
  app.get('/bookings/:booking_id', Bookings.findBooking);
  app.post('/bookings/create', Bookings.createBooking);
  app.put('/bookings/update/:booking_id', Bookings.updateBooking);
  app.delete('/bookings/delete/:booking_id', Bookings.deleteBooking);

  //auth
  app.get('/register', (req, res) => {
    res.render('register', { });
  })

  app.get('/login', (req, res) => {
    res.render('login', { user : req.user });
  })

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  
  app.post('/register', Users.register);
  app.post('/login', passport.authenticate('local'), Users.logIn);
  app.get('/logout', Users.logOut);

}

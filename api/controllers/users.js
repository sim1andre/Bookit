'use strict';

const passport = require('passport');
const mongoose = require('mongoose');
const Account = mongoose.model('Account');

class UserController {

  static register(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
        return res.render("register", {info: "Sorry. That username already exists. Try again."});
      }

      passport.authenticate('local')(req, res, function () {
        req.session.save(function (err) {
          if (err) {
            return next(err);
          }
          res.redirect('/');
        });
      });
    });
  }

  static logIn(req, res, next) {
    req.session.save(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  }

  static logOut(req, res) {
    req.logout();
    req.session.save(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  }
}

module.exports = UserController;

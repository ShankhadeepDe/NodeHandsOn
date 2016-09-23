var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var authRouter = function () {
      router.route('/signup')
            .post(function (req, res) {
                  console.log(req.body);
                  var url = 'mongodb://localhost:27017/libraryApp';
                  mongodb.connect(url, function (err, db) {
                        var collection = db.collection('users');
                        var user = {
                              username: req.body.userName,
                              password: req.body.password
                        };
                        collection.insert(user, function (err, results) {
                              req.login(results.ops[0], function () {
                                    res.redirect('/auth/Profile');
                              });
                        });
                  });
            });

      router.route('/signin')
            .post(passport.authenticate('local', {
                  failureRedirect: '/'
            }), function (req, res) {
                  res.redirect('/auth/Profile');
            });

      router.route('/Profile')
            .get(function (req, res) {
                  res.json(req.user);
            });

      return router;
}

module.exports = authRouter;
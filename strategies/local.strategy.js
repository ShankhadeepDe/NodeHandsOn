var passport = require('passport');
var LocalStartegy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;
var express = require('express');

module.exports = function(){

        passport.use(new LocalStartegy({
                 usernameField : 'userName',
                 passwordField : 'password'
        },        
        function(username,password,done){
                console.log('in local strategy function');
                var url = 'mongodb://localhost:27017/libraryApp';
                mongodb.connect(url,function(err,db){
                   var collection = db.collection('users');
                   var member = collection.findOne({username : username},
                                function(err,results){
                                    if(results.password === password){
                                            console.log('password matched!!!')
                                           //  console.log(express.Request.user);
                                            done(null,results);
                                           // console.log(express.req.user);
                                        }
                                    else {
                                            console.log('password mismatched!!!')
                                            done(null,false);}    
                                });
                });
        }));

};
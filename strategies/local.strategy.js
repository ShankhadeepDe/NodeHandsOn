var passport = require('passport');
var LocalStartegy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

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
                   var user = collection.findOne({username : username},
                                function(err,results){
                                    if(results.password == password){done(null,user);}
                                    else {done(null,false);}    
                                });
                });
        }));

};
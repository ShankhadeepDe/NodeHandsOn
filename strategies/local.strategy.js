var passport = require('passport');
var LocalStartegy = require('passport-local').Strategy;

module.exports = function(){

        passport.use(new LocalStartegy({
                 usernameField : 'userName',
                 passwordField : 'password'
        },        
        function(username,password,done){
                console.log('in local strategy function');
                var user = {
                    username : username,
                    password : password
                };
                done(null,user);
        }));

};
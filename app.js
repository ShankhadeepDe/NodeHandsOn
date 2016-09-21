var Express = require('express');
var app = Express();
var sql = require('mssql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var config = {
                user : 'sd',
                password : 'Testing123',
                server : 'localhost',
                database : 'ScrumToolTest'
            };

sql.connect(config,function(err){
     if(err){console.log(err);}
});            



var books = [
       {
         'title' : '1984',
         'Author' : 'George Orwell'
       },
       {
         'title' : 'The kite runner ',
         'Author' : 'Khaled Hossenni'
       },
       {
         'title' : 'Freakonomics',
         'Author' : 'Steven d. Leditt'
       }
];

var bookRouter = require('./Router/bookRoute.js')(books);
var authRouter = require('./Router/authRoute.js')();

app.use(Express.static('public/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret : 'library'}));
require('./config/passport.js')(app);

app.use('/Books',bookRouter);
app.use('/auth',authRouter);

app.get('/',function(req,res){    
    res.send("Greeting from Home module");

});

app.listen(5000,function(){
  console.log('Server is running at localhost:5000');
});
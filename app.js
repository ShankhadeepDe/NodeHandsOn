var Express = require('express');
var app = Express();
var sql = require('mssql');

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

app.use('/Books',bookRouter);

app.get('/',function(req,res){    
    res.send("Greeting from Home module");

});

app.listen(5000,function(){
  console.log('Server is running at localhost:5000');
});
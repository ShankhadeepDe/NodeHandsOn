var express = require('express');

var router = express.Router();

var sql = require('mssql');


var bookRouter = function(data){
          router.route('/')
                .get(function(req,res){
                    var request = new sql.Request();
                    request.query('select * from WorkItemInformation',function(err,dataset){
                         res.send(dataset);
                     });
                   });

          router.route('/:id')
                .get(function(req,res){
                    var request = new sql.Request();
                    var ps = new sql.PreparedStatement();
                    ps.input('id',sql.Int);
                    ps.prepare('select * from WorkItemInformation where id = @id',function(err){
                        ps.execute({id:req.params.id}, function(err,workItem){
                            res.send(workItem);
                        })
                    });
                   });       

        return router;
}
module.exports = bookRouter;
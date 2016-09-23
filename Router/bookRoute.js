var express = require('express');

var router = express.Router();

var mongodb = require('mongodb').MongoClient;


var bookRouter = function (data) {
    router.use(function (req, res, next) {
        if (!req.user) {
            console.log('only members can view the book list');
            res.redirect('/Home');
        }
        else { next(); }
    });
    router.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.find({}).toArray(function (err, results) {
                    res.send(results);
                });
            });
        });

    router.route('/:id')
        .get(function (req, res) {
            var request = new sql.Request();
            var ps = new sql.PreparedStatement();
            ps.input('id', sql.Int);
            ps.prepare('select * from WorkItemInformation where id = @id', function (err) {
                ps.execute({ id: req.params.id }, function (err, workItem) {
                    res.send(workItem);
                });
            });
        });

    return router;
}
module.exports = bookRouter;
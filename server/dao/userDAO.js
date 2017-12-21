var source = require('./db_connection');
var mysql = require('mysql');
exports.findById = function (req, res) {
    var connection = source.getConnection();    
    var name = req.query.name;
    var pass = req.query.pass;
    
    if(name&&name=="admin"&&
        pass&&pass=="admin"){
        res.send("ok");
    }else{
        res.status(400);
        res.send("");
    }
    return;
};
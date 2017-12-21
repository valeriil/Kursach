var source = require('./db_connection');
var mysql = require('mysql');

exports.findAll = function (req, res) {    
    var sql = "SELECT * FROM services";
    source.execute(sql, function(returnValue) {
        res.send(returnValue);
      });        
    return;
};
exports.findById = function (req, res) { 
    var id = req.params.id;
    if(id){
        var sql = 'SELECT * FROM services WHERE id = ' + mysql.escape(id);
        source.execute(sql, function(returnValue) {
            res.send(returnValue);
        });       
    }else {
        res.status(400);
        res.send("")
    }
    return;
};
exports.update = function (req, res) {    
    var id = req.body.id;
    var name = req.body.name;
    var cost = req.body.cost;
    if(!name||!cost){
        res.status(400);
        res.send("");
        return;
    } 
    var sql;
    if(id)
    sql = 'UPDATE services SET service_name='+mysql.escape(name)+',cost='+mysql.escape(cost)+' WHERE id='+mysql.escape(id);
    else
    sql = 'INSERT INTO services (service_name, cost) VALUES ('+mysql.escape(name)+', '+mysql.escape(cost)+')'
         source.execute(sql, function(returnValue) {
            res.send(returnValue);
        });   
    return;
}
exports.delete = function (req, res) {  
    var id = req.params.id;
    if(!id){
        res.status(400);
        res.send("");
        return;
    } 
    var sql='DELETE FROM services WHERE id='+mysql.escape(id);
    source.execute(sql, function(returnValue) {
        res.send(returnValue);
    });   
    return; 
}
var source = require('./db_connection');
var mysql = require('mysql');
exports.findAll = function (req, res) {
    var sql ="SELECT * FROM specialists";
    source.execute(sql, function(returnValue) {
        res.send(returnValue);
      }); 
    return;
};
exports.findById = function (req, res) {
    var connection = source.getConnection();    
    var id = req.params.id;
    if(id){
    var sql = 'SELECT * FROM specialists WHERE id = ' + mysql.escape(id);
    source.execute(sql, function(returnValue) {
        res.send(returnValue);
      }); 
    }else{
        res.status(400);
        res.send("");
    }
    return;
};
exports.update = function (req, res) {  
    var id = req.body.id;
    var name = req.body.name;
    var address = req.body.address;
    var tel = req.body.tel;
    var photo = req.body.photo;
    if(!name||!address||!tel||!photo){
        res.status(400);
        res.send("");
        return;
    } 
    var sql;
    if(id)
    sql = 'UPDATE specialists SET spec_name='+mysql.escape(name)+
    ', `address`='+mysql.escape(address)+
    ', `telephone`='+mysql.escape(tel)+
    ', `photo`='+mysql.escape(photo)+
    ' WHERE `id`='+mysql.escape(id)+';';
    else
    sql = 'INSERT INTO specialists (spec_name, address, telephone, photo) VALUES ('
    +mysql.escape(name)+', '
    +mysql.escape(address)+', '
    +mysql.escape(tel)+', '
    +mysql.escape(photo)+');'
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
    var sql='DELETE FROM specialists WHERE id='+mysql.escape(id);
    source.execute(sql, function(returnValue) {
        res.send(returnValue);
    }); 
    return;
}
exports.findFromService = function (req, res) {
    var id = req.params.id;
    if(!id){
        res.status(400);
        res.send("");
        return;
    } 
    var sql='SELECT specialists.id as id, '+
    'specialists.spec_name as spec_name, '+
    'specialists.address as address, '+
    'specialists.telephone as telephone, '+
    'specialists.photo as photo '+
    'FROM service_has_specialist as shs '+
    'join specialists '+
    'on shs.specialist_id = specialists.id '+
    'where shs.service_id='+mysql.escape(id);
    source.execute(sql, function(returnValue) {
        res.send(returnValue);
    }); 
    return;
}
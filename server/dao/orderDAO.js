var source = require('./db_connection');
var mysql = require('mysql');
exports.findAll = function (req, res) {
    var sql = 'SELECT ' +
        'orders.id as id,' +
        'specialists.spec_name as spec_name, ' +
        'services.service_name as service_name, ' +
        'orders.reservation_time as reserv_time, ' +
        'orders.client_name as client_name, ' +
        'orders.client_tel as client_phone ' +
        'FROM orders ' +
        'join specialists ' +
        'on orders.specialists_id = specialists.id ' +
        'join services ' +
        'on orders.services_id = services.id;';
    source.execute(sql, function (returnValue) {
        res.send(returnValue);
    });
};
exports.add = function (req, res) {
    var reservation_time = req.body.reserv_time;
    var client_name = req.body.client_name;
    var client_tel = req.body.client_phone;
    var services_id = req.body.services_id;
    var specialists_id = req.body.specialists_id;
    if (!reservation_time || !client_name || !client_tel || !services_id || !specialists_id) {
        res.status(400);
        res.send("");
        return;
    }

    var sql = 'INSERT INTO orders (reservation_time, client_name, client_tel, services_id, specialists_id) VALUES ('
        + mysql.escape(reservation_time) + ', '
        + mysql.escape(client_name) + ', '
        + mysql.escape(client_tel) + ', '
        + mysql.escape(services_id) + ', '
        + mysql.escape(specialists_id) + ');';
    source.execute(sql, function (returnValue) {
        res.send(returnValue);
    });
};

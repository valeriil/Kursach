var mysql = require('mysql');

exports.getConnection = function () {
    return mysql.createConnection({
        host: "localhost",
        database: "naildb",
        user: "root",
        password: "qwerty"
    });
};
exports.closeConnection = function (connection) {
    connection.end(function (err) {
        if (err) {
            console.log('error:' + err.message);
        }
    });
};
exports.execute = function (sql, callback) {
    var connection = exports.getConnection();
    connection.connect(function (err) {
        if (err) return err;
    });
    connection.query(sql, function (err, result) {
        if (err) return err;
        exports.closeConnection(connection);
        callback(result);
    });
};
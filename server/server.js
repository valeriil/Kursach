var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    services = require('./dao/serviceDAO'),
    specialists = require('./dao/specialistDAO'),
    orders = require('./dao/orderDAO'),
    users = require('./dao/userDAO'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());      // simulate DELETE and PUT

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/api/services', services.findAll);
app.post('/api/service/edit/', services.update);
app.get('/api/service/view/:id', services.findById);
app.delete('/api/service/delete/:id', services.delete)

app.get('/api/specialists', specialists.findAll);
app.get('/api/specialists/service/:id', specialists.findFromService);
app.post('/api/specialists/edit/', specialists.update);
app.get('/api/specialists/view/:id', specialists.findById);
app.delete('/api/specialists/delete/:id', specialists.delete);

app.get('/api/orders', orders.findAll);
app.post('/api/order/add', orders.add);

app.get('/api/auth', users.findById);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

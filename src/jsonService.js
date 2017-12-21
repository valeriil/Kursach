var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'HomeController'
        })

        .when('/orders', {
            templateUrl : 'pages/order.html',
            controller  : 'OrderController'
        })

        .otherwise({redirectTo: '/'});
});

app.controller('HomeController', function($scope) {
var message = '<div class="container marketing">';

    $scope.message = message;
});

app.controller('OrderController', function($scope) {
    $scope.message = 'Hello from OrderController';
});

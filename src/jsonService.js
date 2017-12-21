var app = angular.module('myApp', ['ngRoute']);
var app1 = angular.module('myApp1', []);

app.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController'
        })

        .when('/orders', {
            templateUrl: 'pages/order.html',
            controller: 'OrderController'
        })
        .when('/add', {
            templateUrl: 'pages/add.html',
            controller: 'AddController'
        })
        .otherwise({redirectTo: '/'});
});

app.controller('HomeController', function ($http, $scope) {
    $http.get("http://localhost:8080/api/services")
        .then(function (response) {
            var res = angular.fromJson(response.data);
            var selector = "\n";
            angular.forEach(res, function (service) {
                //alert(service.service_name);
                selector += "<option value=" + service.id + " >" + service.service_name + "</option>\n";
            })
            document.getElementById("service").innerHTML = selector;
        });

    $http.get("http://localhost:8080/api/specialists")
        .then(function (response) {
            var res = angular.fromJson(response.data);
            var selector = "\n";
            var specialists = "\n";
            angular.forEach(res, function (spec) {
                selector += "<option value=" + spec.id + " >" + spec.spec_name + "</option>\n";
                specialists += "<div class=\"col-lg-4\">\n" +
                    "            <img class=\"img-circle\" " +
                    "src=\"" + spec.photo + "\" " +
                    "alt=\"Generic placeholder image\" width=\"140\" height=\"140\">\n" +
                    "            <h2>" + spec.spec_name + "</h2>" +
                    "            <p>Telephone: " + spec.telephone + "</p>" +
                    "            <p><a class=\"btn btn-default\" href=\"#\" role=\"button\">View details &raquo;</a></p>\n" +
                    "        </div>";
            });
            document.getElementById("master").innerHTML = selector;
            document.getElementById("specialists").innerHTML = specialists;
        });
});

app.controller('OrderController', function ($http, $scope) {
    $http.get("http://localhost:8080/api/orders")
        .then(function (response) {
            var res = angular.fromJson(response.data);
            var row = "<tr>\n" +
                "            <td>master</td>\n" +
                "            <td>ysluga</td>\n" +
                "            <td>data and time</td>\n" +
                "            <td>client name</td>\n" +
                "            <td>client phone</td>\n" +
                "        </tr>";

            angular.forEach(res, function (service) {
                //alert(service.service_name);
                row += "<tr>\n" +
                    "            <td>" + service.spec_name + "</td>\n" +
                    "            <td>" + service.service_name + "</td>\n" +
                    "            <td>" + service.reserv_time + "</td>\n" +
                    "            <td>" + service.client_name + "</td>\n" +
                    "            <td>" + service.client_phone + "</td>\n" +
                    "        </tr>";
                "<tr><td>" + service.service_name + "</td></tr>";

            });
            document.getElementById("orderTable").innerHTML = row;

        });
});

function addOrder() {
    var spec_id = document.getElementById("master");
    var service = document.getElementById("service");
    var fio = document.getElementById("fio");
    var datetime = document.getElementById("date");
    var tel = document.getElementById("tel");
    var data = {
        reserv_time: datetime.value,
        client_name: fio.value,
        client_phone: tel.value,
        services_id: service.value,
        specialists_id: spec_id.value

    };
    $.post(
        "http://localhost:8080/api/order/add",
        data,
        function () {
            alert("You was reserved!");
        }
    );


}

var app = angular.module('TareasApp', ['ngRoute']);


app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/acercade', {templateUrl: 'partials/acercade.html'});

    $routeProvider.when('/agregar', {templateUrl: 'partials/agregar.html'});

    $routeProvider.otherwise({redirectTo: '/'});




}]);



app.controller('test', function($scope){
	alert("FUNCA");
});

app.controller('agregar', function($scope, $webSql){




});
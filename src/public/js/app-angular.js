'use strict';

angular.module('TareasApp', ['ngRoute', 'ngResource'])
  .config(['$routeProvider', function($routeProvider) {
     
      $routeProvider.when('/', { templateUrl: 'partials/bienvenida.html' });
      $routeProvider.when('/acercade', { templateUrl: 'partials/acercade.html' });
      $routeProvider.when('/agregar',  { templateUrl: 'partials/agregar.html'  });
      $routeProvider.when('/lista',    { templateUrl: 'partials/lista.html'    });
      $routeProvider.otherwise({redirectTo: '/'});

  
  }])
  .factory('TareasDB', function($resource) {
  
    return $resource('/tareas/:id', {id: '@id'}, 
      {
        get: {method: 'GET', isArray: true },
        add: {method: 'POST'},
        delete: {method: 'DELETE'}
      });
  
  })
  .controller('Tareas', ['$scope', 'TareasDB', function($scope, TareasDB) {

    TareasDB.get(function(data) {
  
      $scope.tareas = data;
  
    });


  
    $scope.agregarTarea = function() {
      
      var tarea = {
        mensaje: $scope.mensaje,
        fecha: $scope.fecha
      };

      TareasDB.add(tarea, function(data) {
       
        tarea._id = data._id;
        $scope.tareas.push(tarea);

        $scope.mensaje = "";
        $scope.fecha   = "";
        
        $scope.alert_type = "uk-alert uk-alert-success";
        $scope.alert_message = "Tu recordatorio se ha agregado.";

      });
    
    };

    $scope.borrarTarea = function (tarea) {
  
      TareasDB.delete({id:tarea._id}, function() {
  
        $scope.tareas.splice($scope.tareas.indexOf(tarea), 1);
  
      })
  
    };
  
  }]);
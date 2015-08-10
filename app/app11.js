(function(){
	'use strict'

	var app = angular.module('myapp', ['ngRoute']);

    app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'list11.html'
        })
        .when('/person/:id', {
            templateUrl: 'person11.html',
            controller: 'PersonDetailsController',
        })
        .otherwise({
            redirectTo: '/'
        });
    }]);

	app.controller('MainController', ['$scope', '$log', function($scope, $log){
        $scope.people = [
            {   firstname: 'Gérard'     },
            {   firstname: 'Francis'    },
            {   firstname: 'Josette'    },
            {   firstname: 'Euridice'   }
        ];
    }]);

    app.controller('PersonListController', ['$scope', '$log', function($scope, $log){
        
        $scope.addPerson = function (name) {
            var newPerson = {   firstname: name     };
            $scope.people.push(newPerson);
            $scope.newFriend = '';
        };

        $scope.removePerson = function (person) {
            var index = $scope.people.indexOf(person);
            if (index !== -1)
                $scope.people.splice(index, 1);
        };
    }]);

    app.controller('PersonDetailsController', ['$scope', '$log', '$routeParams', 
            function($scope, $log, $routeParams){
        $scope.index = $routeParams.id;

        $scope.person = $scope.people[$scope.index];
    }]);

})();
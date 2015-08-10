(function(){
	'use strict'

	var app = angular.module('myapp', [
        'ngRoute',
        'myapp.people'
    ]);

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

	app.controller('MainController', ['$scope', '$log', 'People', 
                                    function($scope, $log, People){
        People.init([
            {   firstname: 'Gérard'     },
            {   firstname: 'Francis'    },
            {   firstname: 'Patricia'   },
            {   firstname: 'Euridice'   }
        ], true);
    }]);

    app.controller('PersonListController', ['$scope', '$log', 'People', 
                                    function($scope, $log, People){
        
        $scope.people = People.get();
        $scope.addPerson = function (name) {
            People.addPerson(name);
            $scope.newFriend = '';
        };

        $scope.removePerson = function (person) {
            People.removePerson(person);
        };
    }]);

    app.controller('PersonDetailsController', ['$scope', '$log', '$routeParams', 'People',
                                    function($scope, $log, $routeParams, People){
        $scope.index = $routeParams.id;
        $scope.person = People.find($scope.index);
    }]);

})();
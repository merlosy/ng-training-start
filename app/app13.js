(function(){
	'use strict'

	var app = angular.module('myapp', [
        'ngRoute',
        'myapp.people',
        'myapp.people.services'
    ]);

    app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'list13.html'
        })
        .when('/person/:id', {
            templateUrl: 'person13.html',
            controller: 'PersonDetailsController',
        })
        .otherwise({
            redirectTo: '/'
        });
    }]);

	app.controller('MainController', ['$scope', '$log', 'People', 'PeopleService',
                                    function($scope, $log, People, PeopleService){
    }]);

    app.controller('PersonListController', ['$scope', '$log', 'People', 'PeopleService',
                                    function($scope, $log, People, PeopleService){
        
        // Initialisation de la vue
        PeopleService.getPeople().then(function(data){
            $scope.people = data;
        });

        $scope.addPerson = function (name) {
            var person = {firstname: name};
            $scope.newFriend = '';
            PeopleService.createPeople(person).then(function(data){
                $log.debug(data);
                // on rappelle le service pour avoir la liste à jour
                PeopleService.getPeople().then(function(data){
                    $scope.people = data;
                });
            });
            
        };

        $scope.removePerson = function (person) {
            PeopleService.deletePeople(person.id).then(function(data){
                $log.debug(data);
                // on rappelle le service pour avoir la liste à jour
                PeopleService.getPeople().then(function(data){
                    $scope.people = data;
                });
            });
        };
    }]);

    app.controller('PersonDetailsController', ['$scope', '$log', '$routeParams', 'People', 'PeopleService',
                                    function($scope, $log, $routeParams, People, PeopleService){

        PeopleService.findPeople($routeParams.id).then(function(data){
            $scope.person = data;
        });

    }]);

})();
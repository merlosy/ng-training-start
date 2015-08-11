(function(){
	'use strict'

	var app = angular.module('myapp', [
        'ngRoute',
        'myapp.people',
        'myapp.people.services'
    ]);

    app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'list14.html'
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
        $scope.people = PeopleService.query();

        $scope.addPerson = function (name) {
            var person = {firstname: name};
            $scope.newFriend = '';
            PeopleService.save(person, function(data){
                $log.debug(data);
                // on rappelle le service pour avoir la liste à jour
                $scope.people = PeopleService.query();
            });
            
        };

        $scope.removePerson = function (person) {
            PeopleService.delete({id: person.id}, function(data){
                $log.debug(data);
                // on rappelle le service pour avoir la liste à jour
                $scope.people = PeopleService.query();
            });
        };

        $scope.toggleFavorite = function (person) {
            person.favorite = !person.favorite;
            PeopleService.update({id: person.id}, person, function(data){
                $log.debug(data);
            });
        };

    }]);

    app.controller('PersonDetailsController', ['$scope', '$log', '$routeParams', 'People', 'PeopleService',
                                    function($scope, $log, $routeParams, People, PeopleService){

        $scope.person = PeopleService.get({id: $routeParams.id});

    }]);

})();
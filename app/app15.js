(function(){
	'use strict'

	var app = angular.module('myapp', [
        'ngRoute',
        'myapp.people',
        'myapp.people.services'
    ]);

    app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'list15.html'
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

        $scope.seePerson = function (person) {
            $scope.person = person;
        };

    }]);

    app.controller('PersonDetailsController', ['$scope', '$log', '$routeParams', 'People', 'PeopleService',
                                    function($scope, $log, $routeParams, People, PeopleService){

    }]);

})();
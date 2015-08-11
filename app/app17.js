(function(){
	'use strict'

	var app = angular.module('myapp', [
        'ui.router',
        'myapp.people',
        'myapp.people.services'
    ]);

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

        $stateProvider.state('home', {
            url: "/",
            views : {
                'list' : {
                    templateUrl: 'list16.html'
                },
                'details' : {
                    templateUrl: 'person15.html'
                }
            }
        });

        $urlRouterProvider.otherwise('/');  
    }]);

	app.controller('MainController', ['$scope', '$log', 'People', 'PeopleService',
                                    function($scope, $log, People, PeopleService){

    }]);

    app.controller('PersonListController', ['$scope', '$log', 'People', 'PeopleService', '$rootScope',
                                    function($scope, $log, People, PeopleService, $rootScope){
        $scope.person = undefined;

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

            if ( $scope.person!==undefined && $scope.person.id===person.id)
                    $scope.seePerson(undefined);
        };

        $scope.toggleFavorite = function (person) {
            person.favorite = !person.favorite;
            PeopleService.update({id: person.id}, person, function(data){

                if ( $scope.person!==undefined && $scope.person.id===person.id)
                    $scope.seePerson(person);
            });
        };

        $scope.seePerson = function (person) {
            $rootScope.$broadcast('update-select-person', person);
            $scope.person = person;
        };

    }]);

    app.controller('PersonDetailsController', ['$scope', '$log', '$rootScope',
                                    function($scope, $log, $rootScope){
        $scope.person = undefined;

        $rootScope.$on('update-select-person', function(event, person){
            $log.debug(person);
            $scope.person = person;
        });
    }]);

})();
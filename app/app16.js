(function(){
	'use strict'

	var app = angular.module('myapp', [
        'ui.router',
        'myapp.person',
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

    app.controller('PersonListController', ['$scope', '$log', 'People', 'PeopleService', 'Person',
                                    function($scope, $log, People, PeopleService, Person){
        
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

            if ( Person.getSelected()!==undefined && Person.getSelected().id===person.id)
                    $scope.seePerson(undefined);
        };

        $scope.toggleFavorite = function (person) {
            person.favorite = !person.favorite;
            PeopleService.update({id: person.id}, person, function(data){

                if ( Person.getSelected()!==undefined && Person.getSelected().id===person.id)
                    $scope.seePerson(person);
            });
        };

        $scope.seePerson = function (person) {
            Person.setSelected(person);
        };

    }]);

    app.controller('PersonDetailsController', ['$scope', '$log', 'Person',
                                    function($scope, $log, Person){

        $scope.$watch(function(){
                return Person.getSelected();
            }, 
            function (newVal, oldVal) {
                if(newVal!==oldVal) { 
                    $scope.person = newVal;
                }
            });

    }]);

})();
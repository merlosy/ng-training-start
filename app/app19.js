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
                    templateUrl: 'list19.html'
                },
                'details' : {
                    templateUrl: 'person18.html'
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

    app.controller('PersonDetailsController', ['$scope', '$log', 'Person', 'PeopleService', 
                                        function($scope, $log, Person, PeopleService){

        $scope.contactMode = 'show';

        $scope.$watch(function(){
                return Person.getSelected();
            }, 
            function (newVal, oldVal) {
                if(newVal!==oldVal) { 
                    $scope.person = newVal;
                    $scope.contactMode = 'show';
                }
            });

        $scope.$watch('contactMode', function(newVal){
            if (newVal==='edit') $scope.editablePerson = angular.copy($scope.person);
        })

        $scope.updateContact = function () {
            PeopleService.update({id: $scope.editablePerson.id}, $scope.editablePerson, function(data){
                Person.setSelected($scope.editablePerson);
                $scope.contactMode = 'show';
            });
        };

    }]);

})();
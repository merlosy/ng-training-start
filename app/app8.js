(function(){
	'use strict'

	var app = angular.module('myapp', []);

	app.controller('MainController', ['$scope', '$log', '$filter',
                    function($scope, $log, $filter){
        
        $scope.people = [
            {   firstname: 'Gérard'     },
            {   firstname: 'Francis'    },
            {   firstname: 'Josette'    },
            {   firstname: 'Euridice'   }
        ];
        $scope.people = $filter('orderBy')($scope.people, 'firstname');

        $scope.addPerson = function (name) {
            var newPerson = {   
                firstname: $filter('uppercase')(name) 
            };
            $scope.people.push(newPerson);
            $scope.people = $filter('orderBy')($scope.people, 'firstname');
        };

        $scope.removePerson = function (index) {
            $scope.people.splice(index, 1);
        };

    }]);

})();
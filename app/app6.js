(function(){
	'use strict'

	var app = angular.module('myapp', []);

	app.controller('MainController', ['$scope', '$log', 
                    function($scope, $log){
        
        $scope.people = [
            {   firstname: 'Gérard'     },
            {   firstname: 'Francis'    },
            {   firstname: 'Josette'    },
            {   firstname: 'Euridice'   }
        ];

        $scope.addPerson = function (name) {
            var newPerson = {   firstname: name     };
            $scope.people.push(newPerson);
        };

        $scope.removePerson = function (index) {
            $scope.people.splice(index, 1);
        };

    }]);

})();
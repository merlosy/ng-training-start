(function(){
	'use strict'

	var app = angular.module('myapp.person', []);

	app.directive('person', ['$log', function($log){
        return {
            restrict: 'E',
            template: '<div><p>{{person.firstname}}</p></div>',
        };
    }]);

})();
(function(){
	'use strict'

	var app = angular.module('myapp', ['ui.router']);

	    app.config(['$stateProvider', '$logProvider', '$urlRouterProvider', function ($stateProvider, $logProvider, $urlRouterProvider) {
        
    	$logProvider.debugEnabled(true);
    	
    	$stateProvider.state('home', {
    		url: "/",
    		views : {
    			'' : {
    				templateUrl: 'home.html'
    			}
    		}
    	});
    	    	
        $urlRouterProvider.otherwise('/');
        
    }]);

	app.controller('MainController', ['$scope', '$log', function($scope, $log){
        $log.debug("MainController");

        $scope.name = 'Jack';

    }]);

})();
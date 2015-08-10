(function(){
	'use strict'

	var app = angular.module('myapp.people.services', []);

    app.factory('PeopleService', ['$log', '$http', '$q', function($log, $http, $q){
        var API_URL = 'http://localhost:2403/people';
        return {
            getPeople : function(){
                return $http.get( API_URL ).then( 
                    function(reponse){
                        return reponse.data;
                    }, function (error) {
                        return $q.reject(error);
                    }
                );
            },
            findPeople : function(index){
                return $http.get( API_URL+'/'+index ).then( 
                    function(reponse){
                        return reponse.data;
                    }, function (error) {
                        return $q.reject(error);
                    }
                );
            },
            createPeople : function(person){
                return $http.post( API_URL, person).then( 
                    function(reponse){
                        return reponse.data;
                    }, function (error) {
                        return $q.reject(error);
                    }
                );
            },
            updatePeople : function(person){
                return $http.put( API_URL+'/'+person.id, person).then( 
                    function(reponse){
                        return reponse.data;
                    }, function (error) {
                        return $q.reject(error);
                    }
                );
            },
            deletePeople : function(index){
                return $http({method:'delete', url:API_URL+'/'+index }).then( 
                    function(reponse){
                        return reponse.data;
                    }, function (error) {
                        return $q.reject(error);
                    }
                );
            }
        };
    }]);

})();
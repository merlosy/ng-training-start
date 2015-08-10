(function(){
	'use strict'

	var app = angular.module('myapp.people', []);

    app.factory('People', ['$log', function($log){

        var people = [];

        function isValid(person) {
            return person.hasOwnProperty('firstname') 
                && angular.isString(person.firstname);
        };

        // utilisation comme une classe Java: "public static class People"
        return {
            init : function(peopleArray, safeMode){
                if (safeMode) {
                    // on itère sur peopleArray
                    angular.forEach(peopleArray, function(value, key){
                        if (isValid(value))
                            this.push(value);
                        else throw value;
                    }, people)  // contexte d'itération
                }
                else
                    people = peopleArray;
            },
            get : function() {
                return people;
            },
            find : function(index) {
                return index>=0 && index<people.length? people[index] : null;
            },
            addPerson : function(name){
                var success = false;
                if ( angular.isString(name) ) {
                    people.push({
                        firstname : name
                    });
                    success = true;
                }
                return success;
            },
            removePerson : function (person) {
                var index = people.indexOf(person);
                if (index !== -1)
                    return people.splice(index, 1);
                else 
                    return [];
            },
            hasPerson : function (person) {
                return people.indexOf(person) !== -1;
            }
        };

    }]);

})();
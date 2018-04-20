(function () {
    angular
        .module('app')
        .factory('filterText', filterText)

    filterText.$inject = ['$rootScope']
    function filterText($rootScope) {

        var FILTER_ON_TYPING = 'FILTER_ON_TYPING';
        var RESET_FILTER = 'RESET_FILTER';

        return {
            typing: function(text){
                $rootScope.$emit(FILTER_ON_TYPING, text);
            }, 
            onTyping: function(callback){
                $rootScope.$on(FILTER_ON_TYPING, function(e, text){
                    
                    callback(text);
                    console.log(text);
                })
            },
            resetFilter: function(){
                $rootScope.$emit(RESET_FILTER);
            },
            onResetFilter: function(callback) {
                $rootScope.$on(RESET_FILTER, function(e, text){
                    callback();
                })
            }
        }

    }
})()
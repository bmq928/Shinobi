(function () {
    angular
        .module('app')
        .filter('range', range)

    function range() {
        return function (input, num) {

            var arr = [];

            for(var i = 1; i <= num; ++i) arr.push(i);

            return arr;
            
        }
    }
})()
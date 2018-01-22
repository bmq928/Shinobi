(function () {
    angular
        .module('app')
        .factory('mapSrc', mapSrc)

    mapSrc.$inject = ['$rootScope']
    function mapSrc($rootScope) {

        var googleMap = 'https://maps.googleapis.com/maps/api/staticmap?center=21.038300,%20105.782705&zoom=23&size=1044x550&maptype=roadmap&markers=color:blue%7Clabel:A%7C21.038240, 105.782632&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284'

        return {
            getAll: function () {   
                return googleMap;
            },
            getCurrent: function () {
                
            }
        }
    }
})()
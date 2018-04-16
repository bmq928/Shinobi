(function(){
    angular
        .module('app')
        .factory('admin', admin)

    admin.$inject = ['$resource']
    function admin ($resource){

        return {
            goToAdminPage: function(callback){
                var url = '/api/sendAdminPage';
                var token = localStorage.getItem('jwt-token');

                return $resource(url, {}, {
                    get: {
                        method: 'GET',
                        headers: { 'Authorization': 'Bearer ' + token }
                    }
                })
                    .get()
                    .$promise
                    .then(function (data) {
                        callback(null,data);
                    })
                    .catch(function (err) {
                        callback(err);
                    })
            }
        }
    }
})()
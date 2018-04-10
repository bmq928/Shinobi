(function () {
    angular
        .module('app')
        .factory('setting', setting);

    setting.$inject = ['$http', 'authentication']
    function setting($http, authentication) {

        //default value
        var changePassword,
            changeMail,
            videoPerPage = 9,
            monitorPerPage = 9,
            videoPerRow = 3,
            monitorPerRow = 3,
            monitorFilter = 'name',
            videoFilter = 'name';


        return {
            init: init
        }

        function init() {


            var token = localStorage.getItem('jwt-token');

            //decide the default is changed or not
            //after setting anything this variable will change to true
            //and this variable decide changeSetting is call or not
            var isChange = false;

            //get from database
            $http({
                method: 'GET',
                url: '/api/getSetting',
                headers: { 'Authorization': 'Bearer ' + token }
            })
                .then(function (data) {
                    if (data.videoPerPage) videoPerPage = data.videoPerPage;
                    if (data.monitorPerPage) monitorPerPage = data.monitorPerPage;
                    if (data.videoPerRow) videoPerRow = data.videoPerRow;
                    if (data.monitorPerRow) monitorPerRow = data.monitorPerRow;
                    if (data.monitorFilter) monitorFilter = data.monitorFilter;
                    if (data.videoFilter) videoFilter = data.videoFilter;
                })
                .catch(function (err) {
                    console.log(err);
                })

            return {
                setMail: function (mail) {
                    isChange = true;
                    changeMail = mail;
                },
                setChangePassword: function (password) {
                    isChange = true;
                    changePassword = password;
                },
                setVideoPerPage: function (num) {
                    isChange = true;
                    videoPerPage = num;
                },
                setMonitorPerPage: function (num) {
                    isChange = true;
                    monitorPerPage = num;
                },
                setVideoPerRow: function (num) {
                    isChange = true;
                    videoPerRow = num;
                },
                setMonitorPerRow: function (num) {
                    isChange = true;
                    monitorPerRow = num;
                },
                setMonitorFilter: function (type) {
                    isChange = true;
                    monitorFilter = type;
                },
                setVideoFilter: function (type) {
                    isChange = true;
                    videoFilter = type;
                },
                // getVideoPerPage  : function() {return videoPerPage},
                // getMonitorPerPage: function() {return monitorPerPage;},
                // getVideoPerRow   : function() {return videoPerRow;},
                // getMonitorPerRow : function() {return monitorPerRow;},
                // getMonitorFilter : function() {return monitorFilter;},
                // getVideoFilter   : function() {return videoFilter;},
                getSetting: function () {
                    return {
                        videoPerPage: videoPerPage,
                        monitorPerPage: monitorPerPage,
                        videoPerRow: videoPerRow,
                        monitorPerRow: monitorPerRow,
                        monitorFilter: monitorFilter,
                        videoFilter: videoFilter
                    }
                },

                //this function only get called if only any set method is get call
                save: function (callback) {
                    if (!isChange) return callback({ message: 'nothing had been changed' });

                    $http({
                        method: 'POST',
                        url: '/api/settingPage',
                        headers: { 'Authorization': 'Bearer ' + token },
                        data: {
                            changeMail: changeMail,
                            changePassword: changePassword,
                            videoPerPage: videoPerPage,
                            monitorPerPage: monitorPerPage,
                            videoPerRow: videoPerRow,
                            monitorPerRow: monitorPerRow,
                            monitorFilter: monitorFilter,
                            videoFilter: videoFilter
                        }
                    })
                        .then(function (data) {
                            callback(null, data);
                        })
                        .catch(function (err) {
                            callback(err);
                        })
                }
            }
        }
    }
})()
(function () {
    angular
        .module('appAdmin')
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

        return function () {

            var token = localStorage.getItem('jwt-token');

            //decide the default is changed or not
            //after setting anything this variable will change to true
            //and this variable decide changeSetting is call or not
            var isChange = false;

            return {
                setMail: function (mail) {
                    if (mail) {
                        isChange = true;
                        changeMail = mail;
                    }
                },
                setChangePassword: function (password) {
                    if (password) {
                        isChange = true;
                        changePassword = password;
                    }
                },
                setVideoPerPage: function (num) {
                    if (num) {
                        isChange = true;
                        console.log(num);
                        // videoPerPage = parseInt(num);
                        videoPerPage = num;
                    }
                },
                setMonitorPerPage: function (num) {
                    if (num) {
                        isChange = true;
                        console.log(num);
                        // monitorPerPage = parseInt(num);
                        monitorPerPage = num;
                    }
                },
                setVideoPerRow: function (num) {
                    if (num) {
                        isChange = true;
                        videoPerRow = num;
                    }
                },
                setMonitorPerRow: function (num) {
                    if (num) {
                        isChange = true;
                        monitorPerRow = num;
                    }
                },
                setMonitorFilter: function (type) {
                    if (type) {
                        isChange = true;
                        monitorFilter = type;
                    }
                },
                setVideoFilter: function (type) {
                    if (type) {
                        isChange = true;
                        videoFilter = type;
                    }
                },
                // getVideoPerPage  : function() {return videoPerPage},
                // getMonitorPerPage: function() {return monitorPerPage;},
                // getVideoPerRow   : function() {return videoPerRow;},
                // getMonitorPerRow : function() {return monitorPerRow;},
                // getMonitorFilter : function() {return monitorFilter;},
                // getVideoFilter   : function() {return videoFilter;},
                getSetting: function (callback) {

                    //get from database
                    $http({
                        method: 'GET',
                        url: '/api/getSetting',
                        headers: { 'Authorization': 'Bearer ' + token }
                    })
                        .then(function (resp) {
                            console.log('data from setting');
                            console.log(resp);

                            if (resp.data.options.videoPerPage) videoPerPage = resp.data.options.videoPerPage;
                            if (resp.data.options.monitorPerPage) monitorPerPage = resp.data.options.monitorPerPage;
                            if (resp.data.options.videoPerRow) videoPerRow = resp.data.options.videoPerRow;
                            if (resp.data.options.monitorPerRow) monitorPerRow = resp.data.options.monitorPerRow;
                            if (resp.data.options.monitorFilter) monitorFilter = resp.data.options.monitorFilter;
                            if (resp.data.options.videoFilter) videoFilter = resp.data.options.videoFilter;

                            callback(null, {
                                videoPerPage: videoPerPage,
                                monitorPerPage: monitorPerPage,
                                videoPerRow: videoPerRow,
                                monitorPerRow: monitorPerRow,
                                monitorFilter: monitorFilter,
                                videoFilter: videoFilter
                            });
                        })
                        .catch(function (err) {
                            callback(err);
                        })
                    // return {
                    //     videoPerPage: videoPerPage,
                    //     monitorPerPage: monitorPerPage,
                    //     videoPerRow: videoPerRow,
                    //     monitorPerRow: monitorPerRow,
                    //     monitorFilter: monitorFilter,
                    //     videoFilter: videoFilter
                    // }
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
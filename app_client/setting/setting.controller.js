(function () {
    angular
        .module('app')
        .controller('settingCtrl', settingCtrl)

    settingCtrl.$inject = ['setting', 'authentication']
    function settingCtrl(setting, authentication) {
        var vm = this;
        var settingService = setting();
        init();

        vm.save = function () {
            if (vm.changePassword) settingService.setChangePassword(vm.changePassword);

            settingService.setMail(vm.changeMail);
            settingService.setVideoPerPage(vm.videoPerPage);
            settingService.setMonitorPerPage(vm.monitorPerPage);
            settingService.setVideoPerRow(vm.videoPerRow);
            settingService.setMonitorPerRow(vm.monitorPerRow);
            settingService.setMonitorFilter(vm.monitorFilter);
            settingService.setVideoFilter(vm.videoFilter);

            settingService.save(function (err, data) {
                if (err) console.log(err);
                else {
                    if (vm.changeMail || vm.changePassword) authentication.logout();
                    console.log(data);
                }
            })
        }

        function init() {
            settingService.getSetting(function (err, initialSetting) {

                if(err) return console.log(err);    
                console.log('from setting');
                console.log(initialSetting);

                vm.changeMail = null;
                vm.changePassword = null;
                vm.videoPerPage = null; //fix ui
                vm.monitorPerPage = null; //fix ui
                vm.videoPerRow = initialSetting.videoPerRow.toString();
                vm.monitorPerRow = initialSetting.monitorPerRow.toString();
                vm.monitorFilter = initialSetting.monitorFilter;
                vm.videoFilter = initialSetting.videoFilter;

                console.log(vm.monitorPerRow);
            });

        }

    }
})()
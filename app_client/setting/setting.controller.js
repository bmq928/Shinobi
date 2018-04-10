(function () {
    angular
        .module('app')
        .controller('settingCtrl', settingCtrl)

    settingCtrl.$inject = ['setting']
    function settingCtrl(setting) {
        var vm = this;
        var settingService = setting.init();
        init();

        vm.save = function () {
            if (vm.changePassword) settingService.setChangePassword(vm.changePassword);

            settingService.setVideoPerPage(vm.videoPerPage);
            settingService.setMonitorPerPage(vm.monitorPerPage);
            settingService.setVideoPerRow(vm.videoPerRow);
            settingService.setMonitorPerRow(vm.monitorPerRow);
            settingService.setMonitorFilter(vm.monitorFilter);
            settingService.setVideoFilter(vm.videoFilter);

            settingService.save(function(err, data){
                if(err) console.log(err);
                else console.log(data);
            })
        }


        function init() {
            var initialSetting = settingService.getSetting();

            vm.changePassword = null;
            vm.videoPerPage = initialSetting.videoPerPage;
            vm.monitorPerPage = initialSetting.monitorPerPage;
            vm.videoPerRow = initialSetting.videoPerRow.toString();
            vm.monitorPerRow = initialSetting.monitorPerRow.toString();
            vm.monitorFilter = initialSetting.monitorFilter;
            vm.videoFilter = initialSetting.videoFilter;

            console.log(vm.monitorPerRow);
        }

    }
})()
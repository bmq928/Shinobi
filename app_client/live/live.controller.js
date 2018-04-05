(function () {
    angular
        .module('app')
        .controller('liveCtrl', liveCtrl)

    liveCtrl.$inject = ['$sce', 'stream', 'monitor', 'authentication']
    function liveCtrl($sce, stream, monitor, authentication) {
        var vm = this;

        //init some component with default value
        preProcess();
        // get data from server
        init();
        authentication.onLoginSuccess(function (data) {
            init();
        })
        authentication.onLogoutSuccess(function (data) {
            //make component to default value
            preProcess();
        })


        vm.flashClick = function (id) {
            switch (vm.flashCur[id]) {
                case 'flash_on': vm.flashCur[id] = 'flash_off'; break;
                case 'flash_off': vm.flashCur[id] = 'flash_auto'; break;
                case 'flash_auto': vm.flashCur[id] = 'flash_on'; break;

                default: vm.flashCur[id] = 'flash_on';
            }
            
        }

        vm.showInfo = function (mid) {
            monitor.getInfo(mid, function (err, data) {
                if (err) return console.error(err);

                vm.targetMonitor = data;
                console.log(data);
            })
        }

        vm.endShowInfo = function () {
            vm.targetMonitor = null;
        }


        function preProcess() {
            vm.monitors = []
            vm.flashCur = {}
            vm.targetMonitor = null
        }

        function init() {
            stream.getAll(function (monitors) {
                vm.monitors = monitors.map(function (m) {

                    vm.flashCur[m.mid] = 'flash_on';

                    return {
                        mid: m.mid,
                        link: $sce.trustAsResourceUrl(m.link) //make link valid for iframe tag
                    }
                })
            })


        }
    }
})()
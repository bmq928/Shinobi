(function () {
    angular
        .module('app')
        .controller('liveCtrl', liveCtrl)

    liveCtrl.$inject = ['$sce', 'stream', 'monitor']
    function liveCtrl($sce, stream, monitor) {
        var vm = this;
        var groupKey = 'uet'

        vm.monitors = []
        vm.flashCur = 'flash_on'
        vm.targetMonitor = null

        stream.getAll(groupKey, function (monitors) {
            vm.monitors = monitors.map(function (m) {
                return {
                    mid: m.mid,
                    link: $sce.trustAsResourceUrl(m.link) //make link valid for iframe tag
                }
            })
        })


        vm.flashClick = function () {
            switch (vm.flashCur) {
                case 'flash_on': vm.flashCur = 'flash_off'; break;
                case 'flash_off': vm.flashCur = 'flash_auto'; break;
                case 'flash_auto': vm.flashCur = 'flash_on'; break;
            }
        }

        vm.showInfo = function (mid) {
            monitor.getInfo(mid, function (err, data) {
                if(err) return console.error(err);
                
                vm.targetMonitor = data;
                console.log(data);
            })
        }

        vm.endShowInfo = function(){
            vm.targetMonitor = null;
        }
    }
})()
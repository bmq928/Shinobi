(function () {
    angular
        .module('app')
        .controller('liveCtrl', liveCtrl)

    liveCtrl.$inject = ['$sce', 'stream']
    function liveCtrl($sce, stream) {
        var vm = this;
        var groupKey = 'uet'

        vm.monitors = []
        vm.flashCur = 'flash_on'

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

        vm.showInfo = function(mid){
            
        }

    }
})()
(function () {
    angular
        .module('app')
        .controller('liveCtrl', liveCtrl)

    //$sce to inject url to iframe tag
    liveCtrl.$inject = ['stream', '$sce']
    function liveCtrl(stream, $sce) {
        var vm = this;
        vm.links = []
        vm.isLoading = isLoading()

        // vm.links.push(stream.byMonitorId())
        // console.log(vm.links)

        //just for demo
        vm.link = $sce.trustAsResourceUrl(stream.byMonitorId())



        function isLoading() {
            return vm.links.length === 0;
        }
    }
})()
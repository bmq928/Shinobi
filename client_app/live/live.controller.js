(function () {
    angular
        .module('app')
        .controller('liveCtrl', liveCtrl)

    //$sce to inject url to iframe tag
    liveCtrl.$inject = ['stream', '$sce']
    function liveCtrl(stream, $sce) {
        var vm = this;
        var groupKey = 'uet'
        vm.links = []
        vm.isLoading = isLoading()

        // vm.links.push(stream.byMonitorId())
        // console.log(vm.links)

        stream.getAll(groupKey, function(links){
            vm.links = links.map(function(link){
                return makeLinkForIFrame(link)
            })
        })
        


        function makeLinkForIFrame (link){
            return $sce.trustAsResourceUrl(link)
        }

        function isLoading() {
            return vm.links.length === 0;
        }
    }
})()
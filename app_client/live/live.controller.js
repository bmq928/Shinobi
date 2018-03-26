(function () {
    angular
        .module('app')
        .controller('liveCtrl', liveCtrl)

    liveCtrl.$inject = ['$sce', 'stream']
    function liveCtrl($sce, stream) {
        var vm = this;
        var groupKey = 'uet'

        vm.links = []
        vm.isLoading = isLoading()

        stream.getAll(groupKey, function(links){
            vm.links = links.map(function(link){
                console.log(link)
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
(function () {
    angular
        .module('app')
        .controller('playbackCtrl', playbackCtrl)

    playbackCtrl.$inject = ['mediaSrc']
    function playbackCtrl(mediaSrc) {
        var vm = this;
        var rootUrl = 'http://10.0.9.252:252'


        vm.videos = []
        vm.images = []
        vm.videoAction = videoRelated();
        vm.imagesAction = imagesRelated();
        vm.isLoading = isLoading()

        init()

        function videoRelated() {
            var type = 'video'

            return {
                createVideoLink: function (url) {
                    return createLink(url)
                },
                getByGroupKey: function (groupKey) {
                    
                    return getByGroupKey(type, groupKey)
                },
                getByMonitorId: function (monitorId) {
                    return getByMonitorId(type, monitorId)
                }
            }
        }

        function imagesRelated() {
            var type = 'image'

            return {
                createImageLink: function (url) {
                    return createLink(url)
                },
                getByGroupKey: function (groupKey) {
                    return getByGroupKey(type, groupKey)
                },
                getByMonitorId: function (monitorId) {
                   return getByMonitorId(type, monitorId)
                }
            }
        }

        function createLink(url){
            return rootUrl + url
        }

        function getByGroupKey (type, groupKey) {
            groupKey = groupKey || 'uet';
            return mediaSrc.getByGroupKey(type, params)
        }

        function getByMonitorId (type, monitorId) {
            monitorId = monitorId || 'p404';
            return mediaSrc.getByMonitorId(type, monitorId)
        }

        function isLoading (type){
            if(type === 'images') return vm.images.length === 0;
            return vm.videos.length === 0;
        }

        function init (){
            vm.videoAction.getByMonitorId()
                .then(function(data){
                    vm.videos = data.videos.map(function(v){
                        v.href = vm.videoAction.createVideoLink(v.href);
                        return v;
                    })
                    vm.isLoading = false;
                }).then(function(){
                    console.log(vm.videos)
                    
                })
        }
    }
})()
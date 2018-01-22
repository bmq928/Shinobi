(function () {
    angular
        .module('app')
        .controller('liveCtrl', liveCtrl);

    liveCtrl.$inject = ['$rootScope', '$']
    function liveCtrl($rootScope, $) {
        var vm = this;
        //filter camera
        vm.searchText = {
            name: ""
        }

        vm.changeSelectedCam = function (cam) {
            $rootScope.$emit($rootScope.events.changeSelectedCam, cam);
        }

        //search camera
        $rootScope.$on($rootScope.events.searchCam, function(e, text){
            vm.searchText.name = text;
        })

        //change divided camera
        $rootScope.$on($rootScope.events.changeDivideScreen, function (e, num) {
            var rate = [{
            }, {
                width_percent: '100%',
                size: 1044
            }, {
                width_percent: '50%',
                size: 520
            }, {
                width_percent: '33%',
                size: 348
            }, {
                width_percent: '25%',
                size: 261
            }, {
                width_percent: '20%',
                size: 208.8
            }]
            // var li = $('li.camera');
            // var root = li.children().children();
            // var titles = [];
            // var imgs = [];

            // root.each(function(i){
            //     titles.push($(root[i]).first());
            //     imgs.push($(root[i]).last());
                
            // })

            // // console.log(li.length);
            // // console.log(root.length);
            // // console.log(img.length);
            // // console.log(title.length);
            

            // li.css('width', rate[num].width_percent);
            // titles.forEach(function(title){
            //     title.width(rate[num].width_percent);
            // })
            // imgs.forEach(function(img){
            //     img.width(rate[num].width_percent).height(rate[num].width_percent);
            // })

            var li = $('li.camera');
            var img = $('li.camera img');
            var title = $('div.jquery_title');

            li.css('width', rate[num].width_percent);
            title.each(function(){
                var $this = $(this);
                $this.width(rate[num].size);
                $this.children().width(rate[num].size);
            })
            img.width(rate[num].size).height(rate[num].size);
        })
    }
})()
(function () {
    angular
        .module('appAdmin')
        .component('navbar', {
            templateUrl: '../admin/components/navbar/navbar.template.html',
            bindings: {

            },
            controller: navbarCtrl,
            controllerAs: 'vm'
        })


    navbarCtrl.$inject = ['$scope']
    function navbarCtrl($scope) {
        var vm = this;
        preProcess();
        init();



        function preProcess() {
            
            vm.curView = getView(location.hash);
        }

        function init() {

            decideView()




            function decideView() {
                $scope.$watch(function () {
                    return location.hash;
                }, function (val) {
                    vm.curView = getView(val);
                })
            }
        }

        function getView(locationHash){
            var curView = locationHash.substr(3);
            //capitalize the first charecter to match the style of view
            return (curView) ? curView[0].toUpperCase() + curView.substr(1) : '';
        }
    }
})()
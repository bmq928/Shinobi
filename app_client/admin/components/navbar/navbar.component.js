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
    function navbarCtrl() {
        var vm = this;
        preProcess();
        init();



        function preProcess() {


            vm.curView = '';
            var curView = location.hash.substr(3);
            //capitalize the first charecter to match the style of view
            if (curView) vm.curTab = curView[0].toUpperCase() + curView.substr(1);
            vm.curView = curView;
        }

        function init() {

            function decideView() {
                $scope.$watch()
            }
        }
    }
})()
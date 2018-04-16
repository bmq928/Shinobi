(function () {
    angular
        .module('app')
        .directive('sidebar', sidebar)

    sidebar.$inject = ['viewManage']
    function sidebar(viewManage) {
        return {
            restrict: 'E',
            templateUrl: 'user/common/directives/sidebar/sidebar.template.html',
            controller: 'sidebarCtrl as vm',
            link: function (scope, el, attr) {

                //decide what is chosen for the first time
                //first remove all selection
                //choose only one that is current view
                var $li = $('ul.nav > li');
                var curView = viewManage.getCurView();
                console.log(curView);

                $li.each(function () {
                    var $this = $(this)
                    $this.removeClass('active'); //remove all selection

                    if ($this.children().first().attr('ui-sref') === curView.toLowerCase())
                        $this.addClass('active');
                })





                //make animation for nav selection


                $li.on('click', function () {
                    var $this = $(this);
                    $li.removeClass('active');
                    $this.addClass('active');
                })

            }
        }
    }
})()
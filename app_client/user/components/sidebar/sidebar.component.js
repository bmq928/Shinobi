(function () {
    angular
    .module('app')
    .component('sidebar', {
        templateUrl: './user/components/sidebar/sidebar.template.html',
        bindings: {

        },
        controller: sidebarCtrl,
        controllerAs: 'vm'
    })

    sidebarCtrl.$inject = ['viewManage']
    function sidebarCtrl(viewManage) {
        var vm = this;

        //init ui
        vm.$onInit = function() {
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

        vm.setCurView = viewManage.setCurView;
    }
})()
(function(){
    angular
        .module('app')
        .directive('sidebar', function(){
            return {
                restrict: 'E',
                templateUrl: '/common/directives/sidebar/sidebar.template.html',
                link: function(scope, el, attr){

                    //make animation for nav selection
                    var $li = $('ul.nav > li');

                    $li.on('click', function(){
                        var $this = $(this);
                        $li.removeClass('active');
                        $this.addClass('active');
                    })

                }
            }
        })
})()
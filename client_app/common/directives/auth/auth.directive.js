(function () {
    angular
        .module('app')
        .directive('auth', auth)

    function auth() {
        return {
            restrict: 'E',
            scope: {
                device: '='
            },
            templateUrl: '/common/directives/auth/auth.template.html',
            link: function (scope, el, attrs) {
                var $ = window.jQuery;
                var isSmallScreen = window.matchMedia('(max-width: 993px)');
                scope.$watch(isSmallScreen, function(){
                    console.log('screen change');
                });

                $("auth[device='MOBILE']").each(function () {
                    var $this = $(this);
                    $this.find('#auth-desktop').remove();
                    if (isSmallScreen) $this.show();
                    else $this.hide();

                    console.log(this)
                })
                $("auth[device='DESKTOP']").each(function () {
                    var $this = $(this);
                    $this.find('#auth-mobile').remove();
                    if (!isSmallScreen) $this.hide();
                    else $this.show();

                    console.log(this)
                })
                // if (isSmallScreen) {
                //     $('#auth-desktop').show();
                //     $('#auth-mobile').hide();
                //     console.log('less than')
                // } else {
                //     $('#auth-desktop').show();
                //     $('#auth-mobile').hide();
                //     console.log('bigger than')

                // }
            }
        }
    }
})()

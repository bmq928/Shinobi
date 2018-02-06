// var $ = require('../../../../public/jquery/dist/jquery');
(function () {
    angular
        .module('app')
        .directive('navbarTabs', navbarTabs)

    function navbarTabs() {
        return {
            restrict: 'EA',
            scope: {},
            templateUrl: '/common/directives/navbarTabs/navbarTabs.template.html',
            link: function (scope, el, attr) {
                var $ = window.jQuery;
                //default
                var $firstTab = $('.tab:first')
                var $indicator;
                var notClickYet = true;


                $firstTab.prepend().prepend('<li class="indicator" width=></li>');
                $indicator = $('.indicator')
                $indicator.width($firstTab.width());

                //handle slection
                $('.tab a').on('click', function () {
                    var $this = $(this);
                    var $thisTab = $this.parent();

                    //remove selection
                    $('.tab a').each(function () {
                        var el = $(this);
                        if (el.hasClass('active')) el.removeClass('active');
                    })


                    //selection
                    if (notClickYet) {
                        $indicator.velocity({ "left": calcLeftPos($this) }, { duration: 300, queue: false, easing: 'easeOutQuad' });
                        $indicator.velocity({ "right": calcRightPos($this) }, { duration: 300, queue: false, easing: 'easeOutQuad', delay: 90 });
                    } else {
                        $indicator.velocity({ "right": calcRightPos($this) }, { duration: 300, queue: false, easing: 'easeOutQuad' });
                        $indicator.velocity({ "left": calcLeftPos($this) }, { duration: 300, queue: false, easing: 'easeOutQuad', delay: 90 });
                        notClickYet = false;
                    }

                    $thisTab.prepend($indicator);
                    $this.addClass('active');
                    $indicator.width($thisTab.width());

                    //helper
                    function calcRightPos(el) {
                        return Math.ceil($thisTab.width() - el.position().left - el[0].getBoundingClientRect().width - $this.scrollLeft());
                    };

                    // Finds left attribute for indicator based on active tab.
                    // el: jQuery Object
                    function calcLeftPos(el) {
                        return Math.floor(el.position().left + $this.scrollLeft());
                    };
                })

            }
        }
    }
})()
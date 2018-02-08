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
            controller: 'navbarTabsCtrl as vm',
            link: function (scope, el, attr) { //just handle the visual effect
                var $ = window.jQuery;
                //default
                var defaultTab = getChosenTab();
                var $indicator;
                var notClickYet = true;


                defaultTab.prepend().prepend('<li class="indicator" width=></li>');
                $indicator = $('.indicator')
                $indicator.width(defaultTab.width());

                //handle click slection
                $('.tab a').on('click', function () {
                    var $this = $(this);
                    var $thisTab = $this.parent();

                    //remove selection
                    $('.tab a').each(function () {
                        var el = $(this);
                        if (el.hasClass('active')) el.removeClass('active');
                    })


                    //move the indicator (the underline)
                    if (notClickYet) {
                        $indicator.velocity({ "left": calcLeftPos($this) }, { duration: 300, queue: false, easing: 'easeOutQuad' });
                        $indicator.velocity({ "right": calcRightPos($this) }, { duration: 300, queue: false, easing: 'easeOutQuad', delay: 90 });
                    } else {
                        $indicator.velocity({ "right": calcRightPos($this) }, { duration: 300, queue: false, easing: 'easeOutQuad' });
                        $indicator.velocity({ "left": calcLeftPos($this) }, { duration: 300, queue: false, easing: 'easeOutQuad', delay: 90 });
                        notClickYet = false;
                    }

                    // add selection
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

                function getChosenTab(){
                    var view = scope.$root.curView;
                    var first =  $('.tab:first');

                    switch(view){
                        case "PLAYBACK": return first.next();
                        case "CONFIG" : return first.next().next();
                    }

                    return first;
                }

            }
        }
    }
})()
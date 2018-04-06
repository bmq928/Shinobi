(function () {
    angular
        .module('app')
        .filter('pagination', pagination)

    function pagination() {
        return function (input, pageth) {

            if (!input || !input.length) return;

            var VIDEO_PER_PAGE = window.constants.VIDEO_PER_PAGE;
            var numVideos = input.length;
            var start = (pageth - 1) * VIDEO_PER_PAGE;
            var end = start + VIDEO_PER_PAGE > numVideos ? numVideos - 1 : start + VIDEO_PER_PAGE - 1;

            if (pageth > numVideos / VIDEO_PER_PAGE + 1) return; // pageth > num pages
            return input.slice(start, end + 1);

        }
    }
})()
(function () {
    angular
        .module('app')
        .filter('pagination', pagination)

    function pagination() {
        return function (input, pageth, videoPerPage) {

            if (!input || !input.length) return;

            // var videoPerPage = window.constants.VIDEO_PER_PAGE;
            var numVideos = input.length;
            var start = (pageth - 1) * videoPerPage;
            var end = start + videoPerPage > numVideos ? numVideos - 1 : start + videoPerPage - 1;

            if (pageth > numVideos / videoPerPage + 1) return; // pageth > num pages
            return input.slice(start, end + 1);

        }
    }
})()
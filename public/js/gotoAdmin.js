function gotoAdmin() {

    window.onload = function () {
        if (isRoot()) {
            var hash = location.hash;
            var url = '/admin/' + hash;

            location.replace(url);
        }
    }

    function isRoot() {
        if (localStorage.getItem('jwt-token')) {
            var info = localStorage.getItem('jwt-token').split('.')[1];
            return JSON.parse(atob(info)).isRoot;
        }

        return false;
    }
}

gotoAdmin();
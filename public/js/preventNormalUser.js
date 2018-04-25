function preventNormalUser() {
    window.onload = function (){
        if(!isRoot()) {
            // location.href = '/';
            location.replace('/');
            console.log('not root');
        }
    }

    function isRoot() {
        if(localStorage.getItem('jwt-token')){
            var info = localStorage.getItem('jwt-token').split('.')[1];
            return JSON.parse(atob(info)).isRoot;
        }

        return false;
    }
}

preventNormalUser();
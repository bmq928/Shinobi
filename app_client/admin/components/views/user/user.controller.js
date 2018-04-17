(function(){
    angular
        .module('appAdmin')
        .controller('userCtrl', userCtrl)

    userCtrl.$inject = ['userService']
    function userCtrl(userService){

        var vm = this;
        init();


        function init(){
            vm.addUser = {
                mail: '',
                ke: '',
                password: '',
                detail: '',
                err: '',
                resp: '',
                save: function(){
                    var self = vm.addUser;
                    var mail = self.mail;
                    var ke = self.ke;
                    var password = self.password;
                    var detail = self.detail;

                    userService.addUser(mail, ke, password, detail, function(err, resp){
                        if(err) {
                            self.err = err;
                            self.resp = '';
                        } else {
                            self.err = '';
                            self.resp = resp;
                        }
                    })
                }
            }


            vm.removeUser = {
                mail: '',
                err: '',
                resp: '',
                save: function(){
                    var self = vm.removeUser;
                    var mail = self.mail;
                    console.log(mail);

                    userService.removeUser(mail, function(err, resp){
                        if(err) {
                            self.err = err;
                            self.resp = '';
                        } else {
                            self.err = '';
                            self.resp = resp;
                        }
                    })
                }
            }
        }
    }
})()
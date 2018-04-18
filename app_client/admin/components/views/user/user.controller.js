(function () {
    angular
        .module('appAdmin')
        .controller('userCtrl', userCtrl)

    userCtrl.$inject = ['userService', 'monitorService']
    function userCtrl(userService, monitorService) {
        var vm = this;
        preProcess();
        init();





        function preProcess() {
            vm.users = [];
            vm.err = '';
            vm.resp = '';
            vm.monitors = [];

            //init almonitor modal
            //for control modal 
            vm.alMonitorModal = {
                targetUser: null,
                targetMonitor: '',
                monitorOption: [],
                onClick: almonitorOnclick,
                onSubmit: almonitorOnSubmit,
                err: '',
                resp: ''
            }

            //init almonitor modal
            //for control modal 
            vm.unalMonitorModal = {
                targetUser: null,
                targetMonitor: '',
                monitorOption: [],
                onClick: unalmonitorOnclick,
                onSubmit: unalmonitorOnSubmit,
                err: '',
                resp: ''
            }
        }

        function init() {
            initUser();
            initMonitor();
            
        }

        function initUser (){
            userService.getAll(function (err, users) {
                if (err) vm.err = err;
                else {
                    vm.err = '';
                    vm.users = users;
                }
            })
        }

        function initMonitor(){
            monitorService.getAll(function (err, monitors) {
                if (err) vm.err = err;
                else {
                    vm.err = '';
                    vm.monitors = monitors;
                    console.log(monitors);
                }
            })
        }

        function almonitorOnclick(uid) {
            var self = vm.alMonitorModal;

            refreshMessage();

            self.targetUser = uid;
            console.log(uid);
            console.log(self.monitorOption);

            //find monitor already allocate for the user
            var alreadyMonitors = vm.users.find(function (u) {
                return u._id === uid;
            }).alMonitors;



            self.monitorOption = vm.monitors.filter(function (m) {
                for (var i in alreadyMonitors) {
                    if (m === alreadyMonitors[i]) return false;
                }

                return true;
            })
        }

        function unalmonitorOnclick(uid) {
            var self = vm.unalMonitorModal;

            refreshMessage();

            self.targetUser = uid;


            self.monitorOption = vm.users.find(function (u) {
                return u._id === uid;
            }).alMonitors;
        }

        function almonitorOnSubmit() {
            var self = vm.alMonitorModal;

            monitorService
                .alMonitor(self.targetMonitor, self.targetUser, function(err, message){
                    if(err) {
                        self.err = err;
                        self.resp = '';
                    } else {
                        self.err = '';
                        self.resp = message;

                        //refresh user info
                        initUser();
                    }
                })
        }   

        function unalmonitorOnSubmit() {
            
        }
        
        function refreshMessage(){
            vm.alMonitorModal.err = '';
            vm.alMonitorModal.resp = '';

            vm.unalMonitorModal.err = '';
            vm.unalMonitorModal.resp = '';

            vm.err = '';
            vm.resp = '';
        }
    }


    // function userCtrl(userService){

    //     var vm = this;
    //     init();


    //     function init(){
    //         vm.addUser = {
    //             mail: '',
    //             ke: '',
    //             password: '',
    //             detail: '',
    //             err: '',
    //             resp: '',
    //             save: function(){
    //                 var self = vm.addUser;
    //                 var mail = self.mail;
    //                 var ke = self.ke;
    //                 var password = self.password;
    //                 var detail = self.detail;

    //                 userService.addUser(mail, ke, password, detail, function(err, resp){
    //                     if(err) {
    //                         self.err = err;
    //                         self.resp = '';
    //                     } else {
    //                         self.err = '';
    //                         self.resp = resp;
    //                     }
    //                 })
    //             }
    //         }


    //         vm.removeUser = {
    //             mail: '',
    //             err: '',
    //             resp: '',
    //             save: function(){
    //                 var self = vm.removeUser;
    //                 var mail = self.mail;
    //                 console.log(mail);

    //                 userService.removeUser(mail, function(err, resp){
    //                     if(err) {
    //                         self.err = err;
    //                         self.resp = '';
    //                     } else {
    //                         self.err = '';
    //                         self.resp = resp;
    //                     }
    //                 })
    //             }
    //         }
    //     }
    // }
})()
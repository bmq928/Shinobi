(function () {
    // angular
    //     .module('appAdmin')
    //     .controller('userCtrl', userCtrl)

    angular
        .module('appAdmin')
        .component('userView', {
            templateUrl: '../admin/components/views/user/user.template.html',
            controller: userCtrl,
            controllerAs: 'vm'
        })

    userCtrl.$inject = ['userService', 'monitorService']
    function userCtrl(userService, monitorService) {
        var vm = this;
        preProcess();
        init();

        vm.changePage = function (page) {
            vm.curPage = page;
        }

        // vm.chooseDeleteUser = function (id) {
        //     vm.deleteUsers.push(id);
        // }

        // vm.unChooseDeleteUser = function (id) {
        //     vm.deleteUsers = vm.deleteUsers.filter(function (e) {
        //         return e !== id;
        //     })
        // }

        vm.deleteOnSubmit = function () {

            refreshMessage();

            var listUser = [];

            for (var key in vm.deleteUsers) {
                if (vm.deleteUsers[key]) listUser.push(key);
            }

            console.log(listUser);

            if (confirm('are you sure to remove all that users ?')) {
                userService.removeGroupUser(listUser, function (err, resp) {
                    if (err) {
                        vm.err = err;
                        vm.resp = '';
                    }
                    else {
                        vm.err = '';
                        vm.resp = resp;

                        initUser();

                        //reinit the delelete list
                        //for the future action
                        vm.deleteUsers = {};
                    }
                })
            }
        }



        function preProcess() {

            //main
            vm.users = [];
            vm.err = '';
            vm.resp = '';
            vm.monitors = [];
            vm.deleteUsers = {};

            //pagination
            vm.numPage = 0;
            vm.curPage = 0;
            vm.videoPerPage = window.constants.ELEMENT_PER_PAGE;

            preProcessModal();
        }

        //init every thing for modal
        function preProcessModal() {
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

            vm.addUserModal = {
                mail: '',
                password: '',
                ke: '',
                detail: '',
                err: '',
                resp: '',
                onClick: addUserOnclick,
                onSubmit: addUserOnSubmit
            }
        }

        function init() {
            initUser();
            initMonitor();
        }


        function initUser() {
            userService.getAll(function (err, users) {
                if (err) vm.err = err;
                else {
                    vm.err = '';
                    vm.users = users;

                    //for pagination
                    vm.numPage = users.length / window.constants.ELEMENT_PER_PAGE + 1;
                    vm.curPage = 1;
                }
            })
        }

        function initMonitor() {
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
            refreshModalChoosing();
            // preProcessModal();

            self.targetUser = uid;
            console.log(self.monitorOption);
            console.log(self);

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
            refreshModalChoosing();
            // preProcessModal();

            self.targetUser = uid;


            self.monitorOption = vm.users.find(function (u) {
                return u._id === uid;
            }).alMonitors;
        }

        function addUserOnclick() {
            refreshMessage();
            refreshModalChoosing();
        }

        function addUserOnSubmit() {
            var self = vm.addUserModal;

            userService
                .addUser(self.mail, self.ke, self.password, self.detail,
                    function (err, resp) {
                        if (err) {
                            self.err = err;
                            self.resp = '';
                        } else {
                            self.err = '';
                            self.resp = resp;

                            initUser();
                        }
                    })
        }

        function almonitorOnSubmit() {
            var self = vm.alMonitorModal;

            monitorService
                .alMonitor(self.targetMonitor, self.targetUser, function (err, resp) {
                    if (err) {
                        self.err = err;
                        self.resp = '';
                    } else {
                        self.err = '';
                        self.resp = resp;

                        //refresh user info
                        initUser();
                    }
                })
        }

        function unalmonitorOnSubmit() {
            var self = vm.unalMonitorModal;

            monitorService
                .unalMonitor(self.targetMonitor, self.targetUser, function (err, resp) {
                    if (err) {
                        self.err = err;
                        self.resp = '';
                    } else {
                        self.err = '';
                        self.resp = resp;

                        //refresh user info
                        initUser();
                    }
                })
        }

        function refreshMessage() {
            vm.alMonitorModal.err = '';
            vm.alMonitorModal.resp = '';

            vm.unalMonitorModal.err = '';
            vm.unalMonitorModal.resp = '';

            vm.err = '';
            vm.resp = '';

            vm.addUserModal.err = '';
            vm.addUserModal.resp = '';
        }

        function refreshModalChoosing() {
            vm.alMonitorModal.targetMonitor = '';
            vm.alMonitorModal.targetUser = '';

            vm.unalMonitorModal.targetMonitor = '';
            vm.unalMonitorModal.targetUser = '';

            vm.addUserModal.mail = '';
            vm.addUserModal.password = '';
            vm.addUserModal.ke = '';
            vm.addUserModal.detail = '';
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
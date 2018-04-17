(function () {
    angular
        .module('appAdmin')
        .controller('monitorCtrl', monitorCtrl)

    monitorCtrl.$inject = ['monitorService']
    function monitorCtrl(monitorService) {
        var vm = this;
        init();
    



        function init(){
            vm.alMonitor = {
                err: '',
                mid: '',
                uir: '',
                resp: '',
                save: function() {
                    var self = vm.alMonitor;
                    var uid = self.uid;
                    var mid = self.mid;
                    monitorService
                        .alMonitor(mid, uid, function(err, resp){
                            if(err) {
                                self.err = err;
                                self.resp = '';
                            }
                            else {
                                self.err = '';
                                self.resp = resp;
                            }
                        })
                }
            }

            vm.unalMonitor = {
                err: '',
                mid: '',
                uir: '',
                resp: '',
                save: function() {
                    var self = vm.unalMonitor;
                    var uid = self.uid;
                    var mid = self.mid;
                    monitorService
                        .unalMonitor(mid, uid, function(err, resp){
                            if(err) {
                                self.err = err;
                                self.resp = '';
                            }
                            else {
                                self.err = '';
                                self.resp = resp;
                            }
                        })
                }
            }
            
        }


        // function preProcess() {
        //     vm.forms = [];
        // }

        // function init() {
        //     var allocateMonitorForUser = function () {

        //         var self = {
        //             formTitle: 'Allocate monitor for user',
        //             options: [
        //                 {
        //                     type: 'text',
        //                     title: 'monitor id : ',
        //                     show: true
        //                 }, {
        //                     type: 'text',
        //                     title: 'user mail : ',
        //                     show: true
        //                 }, {
        //                     type: 'text',
        //                     title: 'user id : ',
        //                     show: false
        //                 }, {
        //                     type: 'select',
        //                     title: 'allocate user by:  ',
        //                     show: true,
        //                     chooseOption: function () {

        //                         console.log('choose option in form')

        //                         var options = self.options;
        //                         for (var i in options) {
        //                             if(option[i].type === 'text') option[i].show = !option[i].show;
        //                         }
        //                     },
        //                     options: [
        //                         {
        //                             value: 'by mail'
        //                             // onClick: function () {
        //                             //     self.options[2].show  = false;
        //                             //     self.options[1].show  = true;
        //                             //     console.log(self);
        //                             //     console.log('click on options in form');
        //                             // }
        //                         }, {
        //                             value: 'by id'
        //                             // onClick: function () {
        //                             //     self.options[2].show  = true;
        //                             //     self.options[1].show  = false;
        //                             //     console.log(self);
        //                             //     console.log('click on options in form');
        //                             // }
        //                         }
        //                     ]
        //                 }
        //             ]
        //         };

        //         return self;
        //     }
        //     vm.forms.push(allocateMonitorForUser());
        // }
    }
})()
angular.module('ContactsApp').value('mvToastr', toastr);

angular.module('ContactsApp')
    .factory('mvNotifier', function (mvToastr) {
        return {
            notify: function (msg, type) {

                switch (type) {
                    case 'success':
                        mvToastr.success('<strong>Success:</strong><br />'+msg);
                        break;
                    case 'info':
                        mvToastr.info(msg);
                        break;
                    case 'warning':
                        mvToastr.warning(msg);
                        break;
                    case 'error':
                        mvToastr.error('<strong>Error:</strong><br />'+msg);
                        break;
                    default:
                        mvToastr.error('<strong>Error:</strong><br />'+msg);
                }
            }
        }
    });

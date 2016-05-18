angular.module('ContactsApp')
    .controller('ListController', function ($scope, Api, $location, $compile, mvNotifier) {
        $scope.contacts = Api.User.get();
        $scope.fields = ['firstName', 'lastName', 'email', 'homePhone'];

        $scope.sort = function (field) {
            $scope.sort.field = field;
            $scope.sort.order = !$scope.sort.order;
        };

        $scope.sort.field = 'firstName';
        $scope.sort.order = false;

        $scope.show = function (id) {
            $location.url('/contact/' + id);
        };

        $scope.delete = function (index, contact) {
            Api.User.delete({id: contact.id},
            function(data) {
                // success handler
                $scope.contacts._embedded.user.splice(index, 1);
                mvNotifier.notify(contact.firstName+' '+contact.lastName+' has been deleted.', 'success');
            },
            function(error) {
                // error handler
                mvNotifier.notify(contact.firstName+' '+contact.lastName+' could not be deleted.', 'error');

            });
        }
    })
    .controller('NewController', function ($scope, Api, $location) {
        $scope.contact= new Api.User();
        $scope.save = function () {
            if ($scope.newContact.$invalid) {
                $scope.$broadcast('record:invalid');
            } else {
                $scope.contact.$save();
                $location.url('/contacts');
            }
        };
    })
    .controller('SingleController', function ($scope, Api, $location, $routeParams, $compile, $timeout) {
        userId = parseInt($routeParams.id, 10);
        $scope.contact = Api.User.get({id: userId},
            function(data) {
                // success handler
            },
            function(error) {
                // error handler
                mvNotifier.notify(error.data.title+error.data.detail+'. Redirecting....', 'error');
                $timeout( function() { $location.url('/contacts'); }, 2000);

            });

        $scope.note = new Api.Note();
        $scope.notes = Api.Note.get({'userId': userId});

        $scope.saveNote = function () {
            if ($scope.newNote.$invalid) {
                $scope.$broadcast('record:invalid');
            } else {
                $scope.note.$save();
            }
        };

    });

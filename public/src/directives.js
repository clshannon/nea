angular.module('ContactsApp')
    .value('FieldTypes', {
        text: ['Text', 'should be text'],
        email: ['Email', 'should be an email address'],
        number: ['Number', 'should be a number'],
        date: ['Date', 'should be a date'],
        datetime: ['Datetime', 'should be a datetime'],
        time: ['Time', 'should be a time'],
        month: ['Month', 'should be a month'],
        week: ['Week', 'should be a week'],
        url: ['URL', 'should be a URL'],
        tel: ['Phone Number', 'should be a phone number'],
        color: ['Color', 'should be a color']
    })
    .directive('formField', function($timeout, FieldTypes, mvNotifier) {
        return {
            // Restrict the way the directive can be used; E=element, A=attribute
            restrict: 'EA',
            templateUrl: 'templates/form-field.html',
            // Forces the form-field.html template to replace the form-field HTML in new.html instead of being placed inside of <form-field></form-field> element
            replace: true,
            // Choose what attributes are available to this scope from the <form-field> element
            scope: {
                // two-way binding; changes to record attribute will change the 'contact' object which it references
                record: '=',
                // one-way bindings; no need to change outside of element
                field: '@',
                live: '@',
                required: '@',
                type: '@'
            },
            link: function ($scope, element, attr) {
                //
                $scope.$on('record:invalid', function () {
                    $scope[$scope.field].$setDirty();
                });

                // Make FieldTypes available to template
                $scope.types = FieldTypes;

                $scope.remove = function (field) {
                    delete $scope.record[field];
                    $scope.blurUpdate();
                };

                $scope.blurUpdate = function () {
                    // Make sure element allows live updating
                    if ($scope.live !== 'false') {
                        // Update record on server
                        $scope.record.$update(function (updatedRecord) {
                            // Set record = returned contact params
                            mvNotifier.notify(updatedRecord.firstName+' '+updatedRecord.lastName+' has been updated.', 'success');
                            $scope.record = updatedRecord;
                        })
                    }
                };

                /*
                -Method called on every keystroke inside element
                    -Sets/resets a 1 second timeout
                    -Calls blurUpdate() incase the element requires live updating
                -If more than 1 second lapses between keystrokes, the record is saved
                */
                var saveTimeout;
                $scope.update = function () {
                    // Cancel current timeout
                    $timeout.cancel(saveTimeout);
                    // Call
                    saveTimeout = $timeout($scope.blurUpdate, 1000);
                }
            }
        }
    })
    .directive('headerAlert', function($timeout) {
        return {
            templateUrl: 'vtemplates/alerts.html'
        };
    })
    .directive('notePanel', function($timeout) {
        return {
            templateUrl: 'templates/notes.html'
        };
    })

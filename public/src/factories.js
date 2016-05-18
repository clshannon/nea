angular.module('ContactsApp')
    .factory('Contact', function ($resource) {
        return $resource('/api/contact/:id', { id: '@id' }, {
            'update': { method: 'PUT'}
        })
    })
    .factory('Api', ['$resource',
        function($resource) {
        return {
            User:  $resource('http://api.papscnt.com/user/:id', {id: '@id'}, {
                'update': { method: 'PUT'}
            }),
            Note:  $resource('http://api.papscnt.com/note/:id', {id: '@id'}, {
                'update': { method: 'PUT'}
            })
        };
    }]);

angular.module('ContactsApp', ['ngRoute', 'ngResource', 'ngMessages'])
    // Function used to configure routes
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/contacts', {
                controller: 'ListController',
                templateUrl: 'views/list.html'
            })
            .when('/contact/new', {
                controller: 'NewController',
                templateUrl: 'views/new.html'
            })
            .when('/contact/:id', {
                controller: 'SingleController',
                templateUrl: 'views/single.html'
            });
        /*
        Because modern browsers support html5Mode with dynamic routing /#!/ not necessary
        If application loaded in browser that doesn't support dynamic routing, AngularJS
            will use #! auto-magically
        */
        $locationProvider.html5Mode(true);
    });

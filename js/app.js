
var app = angular.module('trakrApp', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngTouch', 'TaskManagerService', 'SettingsService']);

app.factory('CacheProvider', function ($cacheFactory) {
    // we can add a cache limit here if we'll need to
    return $cacheFactory('TrakrCache');
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'HomeController'
        });
}]);

app.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

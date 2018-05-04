'use strict';
require('../../node_modules/font-awesome/css/font-awesome.min.css');

angular.module('app', [
        require('angular-ui-router'),
        require('oclazyload'),
        require('./routing.js'),
        require('./directive.js')
    ])
    .config(function($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("home");
        $locationProvider.html5Mode(true);
    });

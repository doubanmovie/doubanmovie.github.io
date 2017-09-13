var app = angular.module('myApp', ['ui.router', 'movieServiceMod', 'controllerMod', 'configMod'])


    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        // 错误的路由重定向
       $urlRouterProvider.otherwise("in_theaters/1");

        $stateProvider
            //正在热映
            .state({
                url: "/in_theaters/:page",
                name: "in_theaters",
                templateUrl: "./views/movieList/movieList.html",
                controller: 'in_theatersCtrl'
            })

            //即将上映
            .state({
                url: "/coming_soon/:page",
                name: "coming_soon",
                templateUrl: "./views/movieList/movieList.html",
                controller: 'coming_soonCtrl'
            })

            //top250
            .state({
                url: "/topList/:page",
                name: "topList",
                templateUrl: "./views/movieList/movieList.html",
                controller: 'topListCtrl'
            })

            //北美票房榜
            .state({
                url: "/us_box/:page",
                name: "us_box",
                templateUrl: "./views/usBox/usBox.html",
                controller: 'us_boxCtrl'
            })

            //电影详情
            .state({
                url: '/subject/:id',
                name: 'subject',
                templateUrl: "./views/movieDetails/movieDetails.html",
                controller: 'movieDetailsCtrl'
            })

            //演员详情
            .state({
                url: '/celebrity/:id',
                name: 'celebrity',
                templateUrl: './views/celebrity/celebrity.html',
                controller: 'celebrityCtrl'
            })

            //搜索
            .state({
                url: '/search/:keyword/:page',
                name: 'search',
                templateUrl: "./views/searchList/searchList.html",
                controller: 'searchListCtrl'
            });
    }]);
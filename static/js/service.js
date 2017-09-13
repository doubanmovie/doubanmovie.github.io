var movieServiceMod = angular.module('movieServiceMod', [])

//封装jsonp函数
    .service('JSONP', [function () {
        this.myJSONP = function (options) {
            var url = options.url,
                data = options.data || null,
                callback = options.success;

            var fnName = 'myJsonp_' + Math.random().toString().replace('.', '');
            window[fnName] = callback;

            var queryString = '';
            for (var attr in data) {
                queryString += attr + '=' + data[attr] + '&';
            }
            var script = document.createElement('script');
            script.src = url + '?' + queryString + 'callback=' + fnName;
            script.onload = function () {
                document.body.removeChild(script);
            }
            document.body.appendChild(script);
        };

    }])

    //获取正在热映电影数据 (service())
    .service('in_theatersSer', ['$rootScope', 'JSONP', 'ENV', function ($rootScope, JSONP, ENV) {

        this.getList = function (start, count) {
            JSONP.myJSONP({
                url: ENV.movieApi + "in_theaters",
                data: {
                    start: start,
                    count: count
                },
                success: function (res) {
                    $rootScope.$broadcast("in_theatersData", res);
                }
            })
        };

    }])

    //即将上映电影列表  (service())
    .service('coming_soonSer', ['$rootScope', 'JSONP', 'ENV', function ($rootScope, JSONP, ENV) {

        this.getList = function (start, count) {
            JSONP.myJSONP({
                url: ENV.movieApi + "coming_soon",
                data: {
                    start: start,
                    count: count
                },
                success: function (res) {
                    // 向外广播
                    $rootScope.$broadcast("coming_soonData", res);
                }
            });
        };

    }])

    //top250列表     ((service())
    .service('top250Ser', ['$rootScope', 'JSONP', 'ENV', function ($rootScope, JSONP, ENV) {

        this.getList = function (start, count) {
            JSONP.myJSONP({
                url: ENV.movieApi + "top250",
                data: {
                    start: start,
                    count: count
                },
                success: function (res) {
                    // 向外广播
                    $rootScope.$broadcast("top250Data", res);
                }
            });
        }

    }])

    //北美票房榜    (factory())
    .factory('us_boxSer', ['$rootScope', 'JSONP', 'ENV', function ($rootScope, JSONP, ENV) {
        return {
            getList: function () {
                JSONP.myJSONP({
                    url: ENV.movieApi + "us_box",
                    success: function (res) {
                        // 向外广播
                        $rootScope.$broadcast("us_boxData", res);
                    }
                });
            }
        }
    }])

    //电影条目信息  (factory())
    .factory('movieDetailsSer', ['$rootScope', 'JSONP', 'ENV', function ($rootScope, JSONP, ENV) {
        return {
            getDetails: function (id) {
                JSONP.myJSONP({
                    url: ENV.movieApi + "subject/" + id,
                    success: function (res) {
                        // 向外广播
                        console.log(res);
                        $rootScope.$broadcast("movieDetailsData", res);
                    }
                })
            }
        }
    }])

    //影人条目信息  (factory())
    .factory('celebritySer', ['$rootScope', 'JSONP', 'ENV', function ($rootScope, JSONP, ENV) {
        return {
            getDetails: function (id) {
                JSONP.myJSONP({
                    url: ENV.movieApi + "celebrity/" + id,
                    success: function (res) {
                        // 向外广播
                        console.log(res);
                        $rootScope.$broadcast("celebrityData", res);
                    }
                })
            }
        }
    }])

    //电影条目搜索
    .factory('searchListSer', ['$rootScope', 'JSONP', 'ENV', function ($rootScope, JSONP, ENV) {
        return {
            getList: function (keyword, start, count) {
                JSONP.myJSONP({
                    url: ENV.movieApi + "search",
                    data: {
                        q: keyword,
                        start: start,
                        count: count
                    },
                    success: function (res) {
                        console.log(res);
                        // 向外广播
                        $rootScope.$broadcast("searchData", res);
                    }
                });
            }
        }

    }])


    .factory('bookSer', ['$http', function ($http) {

        return {
            getSwiper: function () {
                return $http.get('./static/data/poster.json');
            },
            getTags: function () {
                return $http.get('./static/data/tags.json');
            }
        }

    }])

    .service('bookSearchSer',['$rootScope',"JSONP",'ENV',function ($rootScope,JSONP,ENV) {

        this.getList = function (keyword,start,count) {
            JSONP.myJSONP({
                url: ENV.bookApi + "search",
                data: {
                    q: keyword,
                    start:start,
                    count:count
                },
                success: function (res) {
                    // 向外广播
                    $rootScope.$broadcast("bookSearchData", res);
                }
            });
        }
    }])

    .service('bookDetailsSer',['$rootScope',"JSONP",'ENV',function ($rootScope,JSONP,ENV) {

        this.getDetails = function (id) {
            JSONP.myJSONP({
                url: ENV.bookApi + id ,
                success: function (res) {
                    // 向外广播
                    $rootScope.$broadcast("bookDetailsData", res);
                }
            });
        }
    }])
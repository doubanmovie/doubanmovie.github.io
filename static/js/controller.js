var controllerMod = angular.module('controllerMod', [])


//正在热映
    .controller('in_theatersCtrl', ['$scope',
        '$stateParams',
        'in_theatersSer',
        function ($scope, $stateParams, in_theatersSer) {
            //当前页数
            $scope.page = Number($stateParams.page);
            //每页显示12部电影
            var count = 12;
            var start = ($scope.page - 1) * count;

            in_theatersSer.getList(start, count);

            $scope.$on("in_theatersData", function (event, data) {

                $scope.data = data;
                $scope.total = Math.ceil($scope.data.total / count);
                $scope.$apply()
            });

        }])

    //即将上映
    .controller('coming_soonCtrl', [
        '$scope',
        '$stateParams',
        'coming_soonSer',
        function ($scope, $stateParams, coming_soonSer) {


            //当前页数
            $scope.page = Number($stateParams.page);

            //每页显示12部电影
            var count = 12;
            var start = ($scope.page - 1) * count;

            coming_soonSer.getList(start, count);

            $scope.$on("coming_soonData", function (event, data) {

                $scope.data = data;
                $scope.total = Math.ceil($scope.data.total / count);
                $scope.$apply();
            });
        }])

    //top250
    .controller('topListCtrl', [
        '$scope',
        '$stateParams',
        'top250Ser',
        function ($scope, $stateParams, top250Ser) {

            //当前页数
            $scope.page = Number($stateParams.page);

            //每页显示12部电影
            var count = 12;
            var start = ($scope.page - 1) * count;

            top250Ser.getList(start, count);

            $scope.$on("top250Data", function (event, data) {
                $scope.data = data;
                console.log(data);
                $scope.total = Math.ceil($scope.data.total / count);
                $scope.$apply();
            });

        }])

    //北美票房榜
    .controller('us_boxCtrl', [
        '$scope',
        '$stateParams',
        'us_boxSer',
        function ($scope,  $stateParams,us_boxSer) {
            us_boxSer.getList();

            $scope.$on("us_boxData", function (event, data) {
                $scope.data = data;
                console.log(data);
                $scope.$apply();
            });
        }])

    //电影条目信息
    .controller('movieDetailsCtrl', ['$scope',
        '$stateParams',
        'movieDetailsSer',
        function ($scope, $stateParams, movieDetailsSer) {

            var id = $stateParams.id;

            movieDetailsSer.getDetails(id);
            $scope.$on("movieDetailsData", function (event, data) {
                $scope.data = data;
                $scope.total = data.total;
                $scope.$apply();
            });

        }])

    //影人条目信息
    .controller('celebrityCtrl', [
        '$scope',
        '$stateParams',
        'celebritySer',
        function ($scope, $stateParams, celebritySer) {

            var id = $stateParams.id;

            celebritySer.getDetails(id);

            $scope.$on("celebrityData", function (event, data) {
                $scope.data = data;
                $scope.total = data.total;
                $scope.$apply();
            });
        }])

    // 电影搜索 提供关键字
    .controller('searchCtrl', ['$scope',
        '$location',
        function ($scope, $location) {
            $scope.getSearchData = function () {
                if(!$scope.keyword){
                    return;
                }
                $location.path('/search/' + $scope.keyword + '/1');
            };

        }])

    //电影条目搜索
    .controller('searchListCtrl', [
        '$scope',
        '$stateParams',
        'searchListSer',
        function ($scope, $stateParams, searchListSer) {
            //获取关键字
            var keyword = $stateParams.keyword;

            //获取当前页数
            $scope.page = Number($stateParams.page);

            //每页显示12部电影
               var count = 12;
              var start = ($scope.page - 1) * count;

            searchListSer.getList(keyword, start, count);

            $scope.$on('searchData', function (event, data) {
                $scope.data = data;
                $scope.total = Math.ceil($scope.data.total / count);
                $scope.$apply();
            });
        }])

    //分页
    .controller('paginCtrl', ['$scope', '$location', function ($scope, $location) {
        //获取锚点值
        // $scope.anchor = $location.path().match(/\/(.*)\//)[1];
        $scope.anchor = $location.path().split('/')[1];


    }])

    //电影模块图片轮播
    .controller('movieSwiperCtrl',['$scope',function ($scope) {

      $scope.swiper = function () {
          new Swiper('.swiper-container', {
              pagination: '.swiper-pagination',
              slidesPerView: 4,
              centeredSlides: true,
              spaceBetween: 30,
              loop: true,
              autoplay:1000
          });
      };


    }])

    //图书模块
    .controller('bookCrtl',['$scope','$rootScope','bookSer',function ($scope,$rootScope,bookSer) {
        //轮播图
        bookSer.getSwiper()
            .then(function (res) {
                $scope.poster = res.data;
            });
        //标签
        bookSer.getTags()
            .then(function (res) {
                $scope.tags = res.data;
            })

    }])

    //控制图书模块图片轮播
    .controller('bookSwiperCtrl',['$scope',function ($scope) {

        $scope.swiper = function () {
            new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: '.swiper-pagination',
                spaceBetween: 30,
                effect: 'fade',
                loop: true,
                autoplay:3000
            });
        };
    }])

    // 图书搜索 提供关键字
    .controller('bookSearchCtrl', ['$scope',
        '$location',
        function ($scope, $location) {
            $scope.getBookData = function () {
                if(!$scope.keyword){
                    return;
                }
                $location.path('/bookSearch/' + $scope.keyword+'/1');
            };
        }])

    //图书条目搜索
    .controller('bookListCtrl', [
        '$scope',
        '$stateParams',
        'bookSearchSer',
        function ($scope, $stateParams, bookSearchSer) {
            //获取关键字
            var keyword = $stateParams.keyword;
            //获取当前页数
            $scope.page = Number($stateParams.page);
            var count = 12;
            var start = ($scope.page - 1) * count;
            bookSearchSer.getList(keyword,start,count);
            $scope.$on('bookSearchData', function (event, data) {
                $scope.data = data;
                $scope.total = Math.ceil($scope.data.total / count);
                $scope.$apply();
            });
        }])
    .controller('bookDetailsCrtl', [
        '$scope',
        '$stateParams',
        'bookDetailsSer',
        function ($scope, $stateParams, bookDetailsSer) {
            //获取关键字
            var id = $stateParams.id;
            bookDetailsSer.getDetails(id);
            $scope.$on('bookDetailsData', function (event, data) {
                $scope.data = data;
                $scope.$apply();
            });
        }])

































    //改变出生地格式 (报错原因未知)
   /* .filter('birthplaceFlt',[function () {
        return function (text) {
            // return text.replace(/[,]/g,' / ');
            return text.split(',').join(' / ');

        }
    }]);*/

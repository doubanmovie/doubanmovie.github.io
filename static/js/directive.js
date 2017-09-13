var direvtiveMod = angular.module('directiveMod', [])
    .directive('ngSwiper', [function () {
        return {
            link: function (scope, elem, attr) {
                if (scope.$last) {
                    elem.ready(function () {
                        eval("scope." + attr.ngSwiper);
                    });
                }
            }
        };
    }]);
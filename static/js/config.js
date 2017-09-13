var configMod = angular.module('configMod', []);

configMod.constant("ENV", {
    movieApi: "https://api.douban.com/v2/movie/",
    bookApi: "https://api.douban.com/v2/book/",
    musicApi: "https://api.douban.com/v2/music/"
});
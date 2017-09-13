## 项目简介

共分为正在热映、即将上映、豆瓣top250、北美电影榜、电影搜索、电影条目信息、影人条目信息、影人作品等模块。

使用 boostrap 搭建静态页面，响应式布局。

使用 angularjs 构建单页面应用，mvc模式。

使用 angular-ui-router 路由模块。

使用豆瓣Api免费接口 (https://developers.douban.com/)  跨域请求数据



## 注意事项

由于豆瓣Api callback只能包含数字、字母、下划线，长度不大于50,而angularjs  callback包含'.',所以无法使用，需要自己封装 jsonp 函数






# React工程


    本工程是为初涉学习前端三大框架之一的React而创建的练习项目

--------------------------------------------


**技术架构**

+ webpack
+ react-router-dom
+ immutable
+ react-redux
+ antd(蚂蚁金服)
+ antd-mobile(蚂蚁金服手机版)

---------------------------------------------

### immutable

	什么是immutable:
 	immutable是一种持久化数据结构,immutable数据就是一旦创建,就不能更改的数据,每当对immutable对象进行修改的时候,就会返回一个新的immutable对象,以此来保证数据的不可变。

---------------------------------------------

**修改默认端口**

于网上遍寻多篇博客,其所教之法皆为在package.json内,将scripts节点的start之value中增入"set PORT=某个三位上的数字 && ",然而无效.

于是,尝试于scripts/start.js文件中找到` const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000; `, 将3000改为自定义之端口数,如8081.

启动,yarn start,

终端输出

``````

Local:  http://localhost:8081


``````

浏览器地址也变更为:![http://localhost:8081]

OK,成功.
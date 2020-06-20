//1 引入express
const express = require("express");
//引入path
const path = require("path");
//2 创建app
const app = express();
//3 用户监听
app.listen("3002", () => {
  console.log("http://127.0.0.1:3002");
});
//4 页面和静态资源的托管!!!都存放在public文件夹下面去这里找就好了
app.use("/", express.static(path.join(__dirname, "public")));
//引入body-parser(接收post方式请求的参数)
const bodyParser = require("body-parser");
//app使用bodyParser的urlencoded方法 相当于以前post方式请求中的Content-Type的值
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
//app使用bodyParser中的json方法可以传递参数为对象
app.use(bodyParser.json());
const router = require("./router");
//4 请求监听  使用router来进行监听处理
app.use(router);

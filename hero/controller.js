//controller来进行请求处理
//引入model
const model = require("./model");
//引入formidable
const formidable = require("formidable");
//引入path
const path = require("path");
//引入fs
const fs = require("fs");
//挂载方法对象并暴露
module.exports = {
  //es6新语法 属性可以直接用作匿名函数的函数名
  getHeroList(req, res) {
    //获取数据要到sql服务器中去获取 -->交由model来进行连接数据库查询
    //错误优先的回调函数
    model.getHeroList((err, data) => {
      // console.log(data)
      if (err) {
        //使用json方法可以返回对象
        res.json({
          code: "201",
          msg: "获取失败啦!",
        });
      } else {
        res.json({
          code: "200",
          msg: "获取成功啦!",
          data,
        });
      }
    });
  },
  uploadFile(req, res) {
    //图片打开后就先上传到服务器-->使用formidable
    let form = new formidable.IncomingForm();
    //保留扩展名
    form.keepExtensions = true;
    //设置图片的存放路径
    form.uploadDir = __dirname + "/public/images";
    //使用parse进行上传parse(req,(err,fields,files)=>{})
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.json({
          code: 201,
          msg: "上传失败啦",
        });
      } else {
        let img = path.basename(files.img.path);
        res.json({
          code: 200,
          msg: "上传成功啦",
          //返回图片文件名实现 预览
          img,
        });
      }
    });
  },
  addHero(req, res) {
    //新增英雄数据使用post方式
    //post方式传递过来的参数使用body-parser来进行接收
    // console.log(req.body)
    model.addHero(req.body, (err) => {
      if (err) {
        res.json({
          code: 201,
          msg: "新增失败啦",
        });
      } else {
        res.json({
          code: 200,
          msg: "新增成功啦",
        });
      }
    });
  },
  getHeroById(req, res) {
    //传入要查询的英雄id和回调函数来处理结果并给前台做出响应
    //get方式传递过来的参数使用query来获取 query获取的是对象
    // console.log(req.query)
    model.getHeroById(req.query.id, (err, data) => {
      if (err) {
        res.json({
          code: 201,
          msg: "获取失败啦",
        });
      } else {
        res.json({
          code: 200,
          msg: "获取成功啦",
          //返回接收到的查询结果对象
          data,
        });
      }
    });
  },
  editHero(req, res) {
    // console.log(req.body)
    model.editHero(req.body.id, req.body, (err) => {
      if (err) {
        res.json({
          code: 201,
          msg: "编辑失败啦!",
        });
      } else {
        res.json({
          code: 200,
          msg: "编辑成功啦!",
        });
      }
    });
  },
  delHeroById(req, res) {
    //使用query方法获取get方式传递过来的id
    //query获取的是整个对象
    model.delHeroById(req.query.id, (err) => {
      if (err) {
        res.json({
          code: 201,
          msg: "删除失败啦!",
        });
      } else {
        res.json({
          code: 200,
          msg: "删除成功啦!",
        });
      }
    });
  },
  getLogin(req, res) {
    //读取登录页面返回
    fs.readFile(path.join(__dirname, 'public/login.html'), (err, data) => {
      if (err) {
        res.json({
          code: 201,
          msg: '页面读取失败'
        })
      } else {
        res.end(data)
      }
    })
  },
  doLogin(req, res) {
    // console.log(req.query)
    model.doLogin(req.query.userName, (err, data) => {
      //没有查到记录的话是data是undefined
      if (err) {
        res.json({
          code: 500,
          msg: '服务器异常'
        })
      } else if (!data) {
        res.json({
          code: 201,
          msg: '此用户不存在噢'
        })
      } else {
        //前台页面要的只是最后登录的结果 所以校验在后台做
        //判断密码
        if (req.query.password === data.password) {
          res.json({
            code: 200,
            msg: '登录成功',
            //返回token令牌
          })
        } else {
          res.json({
            code: 202,
            msg: '密码错误'
          })
        }
      }
    })
  }
};
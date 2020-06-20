//1 引入express
const express = require('express')
const path = require('path')
//2 创建路由  
//路由只复制指引处理请求的函数(并将req和res传递给处理的函数) 路由不做具体的处理!!
const router = express.Router()
//引入controller
const controller = require('./controller')
//router上面挂载请求
//3 获取所有英雄的信息 /getHeroList get
//get,post这些中间件上面可以操作请求和响应
router.get('/getHeroList', (req, res) => {
    //get方式的请求,具体的都交由controller去处理
    controller.getHeroList(req, res)
})
//4 上传图片 /uploadFile post
router.post('/uploadFile', (req, res) => {
    controller.uploadFile(req, res)
})
//5 新增英雄 /addHero post
router.post('/addHero', (req, res) => {
    controller.addHero(req, res)
})
//6 获取指定id的英雄数据 getHeroById get
router.get('/getHeroById', (req, res) => {
    //get方式的请求,具体的都交由controller去处理
    controller.getHeroById(req, res)
})
//7 修改英雄数据 /editHero post
router.post('/editHero', (req, res) => {
    controller.editHero(req, res)
})
//8 删除英雄
router.get('/delHeroById', (req, res) => {
    controller.delHeroById(req, res)
})
//9 获取登录页面
router.get('/login', (req, res) => {
    controller.getLogin(req, res)
})
//10 登录校验
router.get('/doLogin', (req, res) => {
    controller.doLogin(req, res)
})

//暴露router成员对象 -->使app可以访问并使用
module.exports = router
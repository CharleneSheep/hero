//引入jsonwebtoken
const jwt = require('jsonwebtoken')
//生成token
const creatToken = function (userName) {
    //返回promise构造函数-->对象 需要传入一个函数,里面包含resolve和reject两个回调函数
    //操作成功时会调用resolve函数  失败时会调用reject函数
    return new Promise((userName) => {
        //调用jsonwebtoken的sign方法创建token
        //sign(payload,secret,options) 
        //其中payload是json对象,用来存放实际需要传递的数据;
        //secret自定义的密钥;
        //options可选项可以指定加密方式(默认是HS256)设置过期时间 
        //payload中官方规定了7个字段可以选择使用(也可以自定义字段进行使用) 
        //iss(issuer)签发人
        //exp(expiration time) 过期时间
        //sub(subject)主题
        //aud(audience)受众
        //nbf(Not Before)生效时间
        //iat(Issued At)签发时间
        //jti(JWT ID)编号
        const token = jwt.sign({
            name: userName
        }, secret, {
            //设置过期时间(可以是2 days/1h/7d/1000(ms))
            expiresIn: '1h'
        })
    })
}
//1 引入mysql
const mysql = require('mysql')
//2 创建mysql连接 
//mysql.creatPool()创建连接池并配置数据库的信息 会自动连接数据库
//mysql.creatConnection()创建连接 需要手动设置连接数据库
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'heima'
})
module.exports = {
    getHeroList(callback) {
        //创建查询所有记录的sql语句
        let sql = 'select * from heros where isDelete = 0'
        //执行sql语句-->query方法
        connection.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                //成功查询到的话返回null和查询到的结果集
                // results是对象数组[{},{}]
                // console.log(results)
                callback(null, results)
            }
        })
    },
    //新增英雄数据
    addHero(obj, callback) {
        //创建插入的sql语句
        let sql = 'insert into heros set ?'
        //执行sql语句
        connection.query(sql, obj, (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    //使用id获取英雄的详细信息
    getHeroById(id, callback) {
        //创建sql语句
        let sql = 'select * from heros where id = ?'
        //执行sql语句
        connection.query(sql, [id], (err, result) => {
            if (err) {
                callback(err)
            } else {
                //result获取到的对象数组  数据里面只有一个对象因为是根据id进行查询的
                //为了方便前台的使用传回对象
                // console.log(result)
                callback(null, result[0])
            }
        })
    },
    //编辑数据-->进行sql语句的更新操作
    editHero(id, obj, callback) {
        //创建更新的sql语句
        let sql = 'update heros set ? where id = ? '
        //执行sql语句
        connection.query(sql, [obj, id], (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    delHeroById(id, callback) {
        //创建删除的sql语句
        let sql = 'delete from heros where id = ?'
        //执行sql语句
        connection.query(sql, id, (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    doLogin(user, callback) {
        //创建sql语句
        let sql = 'select * from users where userName = ?'
        //执行sql语句
        connection.query(sql, [user], (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null, results[0])
            }
        })
    }
}
$(function () {
    // 发起ajax请求
    init()
})

function init() {
    $.ajax({
        url: 'http://127.0.0.1:3002/getHeroList',
        dataType: 'json',
        success: function (res) {
            console.log(res)
            // 调用模板引擎
            let html = template('herosTemp', res)
            $('#tbody').html(html)
        }
    })
}

function del(id) {
    if (confirm('请问是否真的需要删除')) {
        $.ajax({
            url: 'http://127.0.0.1:3002/delHeroById?id=' + id,
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if (res.code) {
                    alert(res.msg)
                    // 刷新
                    // location.href='./index.html'
                    init()
                }
            }
        })
    }
}
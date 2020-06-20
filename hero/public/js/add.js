$(function(){
    // 实现文件上传
    // 一选择好文件就开始进行上传操作
    $('#img').on('change',function(){
        // 获取当前的图片对象
        // files只提供了原生访问的方式
        // 前面[0]是jq转js原生，后面的[0]是获取文件列表中的第一个文件对象
        let myfile = $('#img')[0].files[0]
        // 使用formdata收集图片数据
        let formdata = new FormData()
        // 追加参数到formdata
        formdata.append('img',myfile)

        // ajax实现文件上传的请求
        $.ajax({
            type:'post',
            url:'http://127.0.0.1:3002/uploadFile',
            data:formdata,
            dataType:'json',
            processData:false, // 告诉ajax不要进行数据的处理，formdata自己来处理
            contentType:false, // 造成ajax不要对数据编码，formdata自己来编码
            success:function(res){
                console.log(res)
                if(res.code == 200){
                    // 实现图片预览
                    $('#photo').attr('src','http://127.0.0.1:3002/images/'+res.img)
                    // 将图片名称存储到指定的隐藏域
                    $('.userimg').val(res.img)
                }
            }
        })
    })

    // 实现英雄数据的添加
    $('#sub').on('click',function(){
        console.log($('#myform').serialize())
        $.ajax({
            type:'post',
            url:'http://127.0.0.1:3002/addHero',
            data:$('#myform').serialize(),
            dataType:'json',
            success:function(res){
                console.log(res)
                if(res.code == 200){
                    alert(res.msg)
                    // 刷新--回到首页
                    location.href='./index.html'
                }
            }
        })
    })
})
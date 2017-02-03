/**
 * Created by MagicLizi on 2016/10/20.
 */


function upLoadFile()
{
    console.log('upload');
    var sendData =
    {
        bucket: "lizi-files",
        fileUri:$("#upLoad").val(),
    }

    $.ajax({
        url: "/upyun/uploadSign",    //请求的url地址
        dataType: "json",   //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: sendData,    //参数值
        type: "GET",   //请求方式
        beforeSend: function (request) {
            //请求前的处理
            request.setRequestHeader("appId", "lizi");
            request.setRequestHeader("signature", "a46790dc84378e52a641e654e50eee9dc65b796b");
        },
        success: function (result) {
            //请求成功时处理
            if(result.code === 200)
            {
                var signature = result.data.signature;
                var policy = result.data.policy;
                var upLoadUrl = result.data.upLoadUrl;
                var fileDomainUrl = result.data.fileLoadDomain;
                //上传
                var formData = new FormData();
                formData.append('policy', policy);
                formData.append('signature', signature);
                formData.append("file", $("#upLoad")[0].files[0]);
                console.log($("#upLoad")[0].files[0]);
                $.ajax({
                    url : upLoadUrl,
                    type : 'POST',
                    data : formData,
                    dataType:'json',
                    processData : false,
                    contentType : false,
                    success : function(responseStr)
                    {
                        console.log(responseStr);
                        alert('上传成功，文件地址:' + fileDomainUrl + responseStr.url);
                    },
                    error : function(responseStr)
                    {
                        alert('上传失败！');
                    }
                });


            }
        },
        complete: function ()
        {
            //请求完成的处理
        },
        error: function ()
        {
            //请求出错处理
        }
    })
}
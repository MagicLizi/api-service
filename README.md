# api-service
自己使用的一些第三方服务，短信，上传，ping++等


## api-service签名验证
所有**api-service**接口都遵循程序内部的签名验证规则

* 所有请求需在头部信息中添加以下字段:

```
appId : ""
signatrue : ""
```

* appId和appSecret获取方式：  

	1. 人肉
	2. 邮箱

* signature加密方式: 

```
var hashStr = appId + "&" + appSecret + "&" + JSON.stringify(params);//params为所有提交参数的JSON对象

var serverSignature = vrcrypto.toHash(hashStr);//crypto 使用sha1哈希即可
```


## 域
api.xiaolibaobao.love

## 基于SubMail的短信服务

* 注册subMail并且设置完成相应参数获取短信服务的appId以及appKey，提交于我

### 获取验证码

* 接口 : /submail/mobileVerifyCode

* 方法 : GET

* 参数 : 
	1. mobile 手机号码
	2. template 短信模板ID(subMail后台设置)

* Example :
	
	```
	Header : 
	{
		appId : lizi,
		signature : d9bc4a4aee29af264679cc6d711ba72b097a8afd
	}
	
	Request : api.xiaolibaobao.love/submail/mobileVerifyCode?mobile=13501801181&template=4SnDQ
	
	Response : 
	{
  		"code": 200,
  		"data": 
  		{
    		"coolDown": 60 //验证码冷却时间
  		},
  		"message": "消息发送成功"
	}
	```
	
### 验证验证码

* 接口 : /submail/verifyCode

* 方法 : POST

* 参数 : 
	1. mobile 手机号码
	2. verifyCode 验证码

* Example :
	
	```
	Header : 
	{
		appId : lizi,
		signature : 6f23707f11f4daa6295ff823da35ce0c99e5e52d
	}
	
	Request : api.xiaolibaobao.love/submail/verifyCode
	
	Body : 
	{
		mobile : 13501801181,
		verifyCode : 992063
	}
	
	Response : 
	{
  		"code": 200,
  		"data": {},
  		"message": "验证码正确!"
	}
	```
	
## upyun文件上传服务
主要是用upyun云的FORM API通过签名方式直接上传文件到对应bucket，注册又拍云并且创建服务，并且启用服务的表单API

### 获取签名

* 接口 ：/upyun/uploadSign

* 方法 ：GET 

* 参数 ：
    1. bucket  上传服务名
    2. fileUri 本地文件路径

* Example

```
    Header : 
    {
        appId : lizi,
        signature : 094edf5ac4c674950a8aee8043d6cd72d604a2ed
    }
    
    Request : api.xiaolibaobao.love/upyun/uploadSign
    
    Body : 
    {
        bucket : “lizi-files”,
        fileUri : “/Desktop/avatar.jpg”
    }
    
    Response : 
    {
      {
        "code": 200,
        "data": {
            "upLoadUrl": "http://v0.api.upyun.com/lizi-files",//上传路径
            "signature": "",//签名
            "policy":"",//policy
            "fileLoadDomain": "http://lizi-files.b0.upaiyun.com/"//上传成功后，图片url的域
        },
        "message": "获取上传签名信息成功！"
     }
    }
```


### 上传文件到upyun(http post)

获取签名后，客户端或者浏览器，直接向upyun上传文件,不经再经过服务器

* AJAX 上传（Example）

```
    //签名接口获取的数据
    var signature = result.data.signature;
    var policy = result.data.policy;
    var upLoadUrl = result.data.upLoadUrl;
    var fileDomainUrl = result.data.fileLoadDomain;
    
   //formData 参数
   var formData = new FormData();
   formData.append('policy', policy);
   formData.append('signature', signature);
   formData.append("file", $("#upLoad")[0].files[0]); //input 标签种的文件信息
 
   $.ajax({
           url : upLoadUrl,
           type : 'POST',
           data : formData,
           dataType:'json',
           processData : false,
           contentType : false,
           success : function(responseStr)
           {
              alert('上传成功，文件地址:' + fileDomainUrl + responseStr.url);
           },
           error : function(responseStr)
           {
              alert('上传失败！');
           }});
```


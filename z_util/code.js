/**
 * Created by MagicLizi on 16/9/18.
 */

module.exports =
{
    success : 200,
    unknowError : 500,
    pageNotFound : 404,
    submail:{
        getSubmailAppInfoError:100001,
        sendMessageError:100002,
        submailAppNotExist:100003,
        refreshVerifyCodeError:100004,
        getMobileVerifyCodeError:100005,
        verifyCodeError:100006,
        refreshVerifyCodeStateError:100007
    },
    log:{
        logError:200001
    },
    app:{
        getAppInfoError:300001,
        appIdNotExist:300002,
        signatureVerifyError:300003
    }
}
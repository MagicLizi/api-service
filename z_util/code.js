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
        refreshVerifyCodeError:10004
    },
    log:{
        logError:20001
    },
    app:{
        getAppInfoError:30001,
        appIdNotExist:30002,
        signatureVerifyError:30003
    }
}
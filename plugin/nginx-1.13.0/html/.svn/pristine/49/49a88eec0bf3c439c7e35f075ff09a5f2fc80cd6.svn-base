
/*
验证是否为空
*/
function IsNullOrEmpty(str) {
    var isOK = false;
    if (str == undefined || str == "" || str == 'null') {
        isOK = true;
    }
    return isOK;
}

/**
显示loading 返回当前索引
**/
function ShowLoading() {
    var index = layer.load(0, {
        shade: [0.6, '#fff'] //0.1透明度的白色背景
    });
    return index;
}
/**
关闭指定层 index为空则关闭全部
**/
function HideLoading(index) {
    if (IsNullOrEmpty(index)) {
        layer.closeAll();
    } else {
        layer.close(index);
    }
}


/**
短暂提示
msg: 显示消息
time：停留时间
type：类型 1：成功，2：失败，0：警告
**/
function tipDialog(msg, _type, long, callBack) {
    var msg = msg;
    var long = long || 2000;
    var type = _type || 0;
    var options = { icon: type, time: long, shift: 0 };

    layer.msg(msg, options, function () {
        if (callBack != undefined) {
            callBack();
        }
    });
}
/*
警告消息
msg: 显示消息
type：类型 1：成功，2：失败，0：警告
*/
function alertDialog(msg, _type, callBack) {

    var type = _type || 0;
    var options = { icon: type, title: '' };

    var index = layer.alert(msg, options, function () {
        if (callBack != undefined) {
            callBack();
        } else {
            layer.close(index);
        }
    });
}

/*删除数据
/*url:        表示请求路径
/*parm：      条件参数
--------------------------------------------------*/
//function delConfig(url, parm, count) {
//    if (count == undefined) {
//        count = 1;
//    }
//    confirmDialog("", "您确定要删除 " + count + " 笔记录？", function (r) {
//        if (r) {

//            //加载层
//            var index = ShowLoading();
//            AjaxJson(url, parm, function (data) {
//                HideLoading(index);
//                if (data.Code == 0) {
//                    tipDialog('删除成功', 1, 1000, function () {
                       
//                    });
//                } else {
//                    layer.msg(data.Message, { icon: 2 });

//                }

//            });

//        }
//    });
//}
/*
确认对话框
*/
function confirmDialog(_title, msg, callBack) {

    layer.confirm(msg, {
        icon: 3,
        title: _title, //显示标题   
        shift: 0, //0-6的动画形式，-1不开启             
        //area: ['300px', '200px'],
        //skin: 'layer-add',
        btn: ['确定', '取消'], //按钮
        shade: 0.6 //不显示遮罩
    }, function () {
        callBack(true)

    }, function () {
        callBack(false)

    });
}
/*
弹出页面(捕获页)
*/
function openDialog(url, _title, _width, _height) {
    _width = _width ? _width : "60%";
    _height = _height ? _height : "80%";
    layer.open({
        type: 2,
        title: _title,
        shadeClose: false,
        shade: 0.5,
        area: [_width, _height],
        content: url //iframe的url

    });
}
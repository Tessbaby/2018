///*******************************插件新功能-设置插件validator的默认参数*****************************************/
//$.validator.setDefaults({
//	/*关闭键盘输入时的实时校验*/
//	onkeyup: null,
//	/*添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)*/
//	success: function (label) {
//		/*label的默认正确样式为valid，需要通过validClass来重置，否则这里添加的其他样式不能被清除*/
//		label.text('').addClass('valid');
//	},
//	/*重写校验元素获得焦点后的执行函数--增加[1.光标移入元素时的帮助提示,2.校验元素的高亮显示]两个功能点*/
//	onfocusin: function (element) {
//		this.lastActive = element;

//		/*1.帮助提示功能*/
//		this.addWrapper(this.errorsFor(element)).hide();
//		var tip = $(element).attr('tip');
//		if (tip && $(element).parent().children(".tip").length === 0) {
//			$(element).parent().append("<label class='tip'>" + tip + "</label>");
//		}

//		/*2.校验元素的高亮显示*/
//		$(element).addClass('highlight');

//		// Hide error label and remove error class on focus if enabled
//		if (this.settings.focusCleanup) {
//			if (this.settings.unhighlight) {
//				this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
//			}
//			this.hideThese(this.errorsFor(element));
//		}
//	},
//	/*重写校验元素焦点离开时的执行函数--移除[1.添加的帮助提示,2.校验元素的高亮显示]*/
//	onfocusout: function (element) {
//		/*1.帮助提示信息移除*/
//		$(element).parent().children(".tip").remove();

//		/*2.校验元素高亮样式移除*/
//		$(element).removeClass('highlight');

//		/*3.替换下面注释的原始代码，任何时候光标离开元素都触发校验功能*/
//		this.element(element);

//		/*if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
//            this.element( element );
//        }*/
//	}
//});
/*******************************插件字段校验*****************************************/
jQuery.validator.addMethod("amtCheck", function (value, element) {
    /*var dotPos = value.indexOf('.');
    return value > 0 && dotPos < 0 && (dotPos > 0 && value.substring(dotPos + 1) <= 2);*/
    if (value) {
        return value && /^\d*\.?\d{0,2}$/.test(value);
    } else {
        return true;
    }
},
    "金额必须不小于0且小数位数不超过2位"
);
jQuery.validator.addMethod("isMobile", function (value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
},
"请正确填写您的手机号码");

jQuery.validator.addMethod("isPhone", function (value, element) {
    var reg = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
    return reg.test(value);

},
"请正确填写正确的电话号码");

// 判断整数value是否大于或等于0
jQuery.validator.addMethod("isIntGteZero", function (value, element) {
    value = parseInt(value);
    return this.optional(element) || value >= 0;
}, "必须是大于或等于0的整数");
// 手机号码验证    


//// 电话号码验证    
//jQuery.validator.addMethod("isPhone", function (value, element) {
//    var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
//    return this.optional(element) || (tel.test(value));
//}, "请正确填写您的电话号码。");

// 联系电话(手机/电话皆可)验证   
jQuery.validator.addMethod("isTel", function (value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    var tel = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
    return this.optional(element) || tel.test(value) || (length == 11 && mobile.test(value));
}, "请正确填写您的联系方式");

jQuery.validator.addMethod("isMobile", function (value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
},
"请正确填写您的手机号码");


jQuery.validator.addMethod("isPhone", function (value, element) {
    var reg = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
    return reg.test(value);

},
"请正确填写正确的电话号码");
// 判断整数value是否大于或等于0
jQuery.validator.addMethod("isIntGteZero", function (value, element) {
    value = parseInt(value);
    return this.optional(element) || value >= 0;
}, "必须是大于或等于0的整数");

// 联系电话(手机/电话皆可)验证   
jQuery.validator.addMethod("isTel", function (value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    var tel = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
    return this.optional(element) || tel.test(value) || (length == 11 && mobile.test(value));
}, "请正确填写您的联系方式");

// 身份证号码验证 
jQuery.validator.addMethod("isIdCardNo", function (value, element) {
    if (value) {
        return this.optional(element) || idCardNoUtil.checkIdCardNo(value);
    } else {
        return true;
    }
}, "请正确输入您的身份证号码");

//护照编号验证
jQuery.validator.addMethod("passport", function (value, element) {
    return this.optional(element) || checknumber(value);
}, "请正确输入您的护照编号");

/*******************************card.js*****************************************/
var idCardNoUtil = {
    provinceAndCitys: {
        11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江",
        31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东",
        45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏",
        65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
    },

    powers: ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"],

    parityBit: ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"],

    genders: { male: "男", female: "女" },

    checkAddressCode: function (addressCode) {
        var check = /^[1-9]\d{5}$/.test(addressCode);
        if (!check) return false;
        if (idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
            return true;
        } else {
            return false;
        }
    },

    checkBirthDayCode: function (birDayCode) {
        var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
        if (!check) return false;
        var yyyy = parseInt(birDayCode.substring(0, 4), 10);
        var mm = parseInt(birDayCode.substring(4, 6), 10);
        var dd = parseInt(birDayCode.substring(6), 10);
        var xdata = new Date(yyyy, mm - 1, dd);
        if (xdata > new Date()) {
            return false;//生日不能大于当前日期
        } else if ((xdata.getFullYear() == yyyy) && (xdata.getMonth() == mm - 1) && (xdata.getDate() == dd)) {
            return true;
        } else {
            return false;
        }
    },

    getParityBit: function (idCardNo) {
        var id17 = idCardNo.substring(0, 17);
        var power = 0;
        for (var i = 0; i < 17; i++) {
            power += parseInt(id17.charAt(i), 10) * parseInt(idCardNoUtil.powers[i]);
        }
        var mod = power % 11;
        return idCardNoUtil.parityBit[mod];
    },

    checkParityBit: function (idCardNo) {
        var parityBit = idCardNo.charAt(17).toUpperCase();
        if (idCardNoUtil.getParityBit(idCardNo) == parityBit) {
            return true;
        } else {
            return false;
        }
    },

    checkIdCardNo: function (idCardNo) {
        //15位和18位身份证号码的基本校验
        var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
        if (!check) return false;

        //判断长度为15位或18位
        if (idCardNo.length == 15) {
            return idCardNoUtil.check15IdCardNo(idCardNo);
        } else if (idCardNo.length == 18) {
            return idCardNoUtil.check18IdCardNo(idCardNo);
        } else {
            return false;
        }
    },

    //校验15位的身份证号码
    check15IdCardNo: function (idCardNo) {
        //15位身份证号码的基本校验
        var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
        if (!check) return false;
        //校验地址码
        var addressCode = idCardNo.substring(0, 6);
        check = idCardNoUtil.checkAddressCode(addressCode);
        if (!check) return false;
        var birDayCode = '19' + idCardNo.substring(6, 12);
        //校验日期码
        return idCardNoUtil.checkBirthDayCode(birDayCode);
    },

    //校验18位的身份证号码
    check18IdCardNo: function (idCardNo) {
        //18位身份证号码的基本格式校验
        var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
        if (!check) return false;

        //校验地址码
        var addressCode = idCardNo.substring(0, 6);
        check = idCardNoUtil.checkAddressCode(addressCode);
        if (!check) return false;

        //校验日期码
        var birDayCode = idCardNo.substring(6, 14);
        check = idCardNoUtil.checkBirthDayCode(birDayCode);
        if (!check) return false;

        //验证校检码
        return idCardNoUtil.checkParityBit(idCardNo);
    },
    formateDateCN: function (day) {
        var yyyy = day.substring(0, 4);
        var mm = day.substring(4, 6);
        var dd = day.substring(6);
        return yyyy + '-' + mm + '-' + dd;
    },
    //获取信息
    getIdCardInfo: function (idCardNo) {
        var idCardInfo = {
            gender: "", //性别
            birthday: "" // 出生日期(yyyy-mm-dd)
        };
        if (idCardNo.length == 15) {
            var aday = '19' + idCardNo.substring(6, 12);

            idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);

            if (parseInt(idCardNo.charAt(14)) % 2 == 0) {
                idCardInfo.gender = idCardNoUtil.genders.female;
            } else {
                idCardInfo.gender = idCardNoUtil.genders.male;
            }
        } else if (idCardNo.length == 18) {
            var aday = idCardNo.substring(6, 14);

            idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);

            if (parseInt(idCardNo.charAt(16)) % 2 == 0) {
                idCardInfo.gender = idCardNoUtil.genders.female;
            } else {
                idCardInfo.gender = idCardNoUtil.genders.male;
            }
        }
        return idCardInfo;
    },

    getId15: function (idCardNo) {
        if (idCardNo.length == 15) {
            return idCardNo;
        } else if (idCardNo.length == 18) {
            return idCardNo.substring(0, 6) + idCardNo.substring(8, 17);
        } else {
            return null;
        }
    },

    getId18: function (idCardNo) {
        if (idCardNo.length == 15) {
            var id17 = idCardNo.substring(0, 6) + '19' + idCardNo.substring(6);
            var parityBit = idCardNoUtil.getParityBit(id17);
            return id17 + parityBit;
        } else if (idCardNo.length == 18) {
            return idCardNo;
        } else {
            return null;
        }
    }
};

//验证护照是否正确
function checknumber(number) {
    var str = number;
    //在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
    var Expression = /(P\d{7})|(G\d{8})/;
    var objExp = new RegExp(Expression);

    if (objExp.test(str) == true) {
        return true;
    } else {
        return false;
    }
};

jQuery.validator.addMethod('stringCheck', function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9\u4e00-\u9fa5]*$/.test(value);
}, '只能包含字母、数字和汉字');
jQuery.validator.addMethod('isPhone', function (value, element) {
    var mobileRgx = /^1[3-8][0-9]\d{8}$/;
    var telRgx = /^(\d{3,4}-){0,1}\d{7,9}$/;
    return this.optional(element) || mobileRgx.test(value) || telRgx.test(value);
}, '请输入正确格式的手机或电话号码');
jQuery.validator.addMethod('isExist', function (value, element, params) {
    var isTrue = false;
    jQuery.ajax({
        url: params[0],
        type: 'GET',
        async: false,
        data: {
            userId: params[1],
            param: value
        },
        dataType: 'json',
        success: function (resData) {
            isTrue = resData.success;
        }
    });
    return this.optional(element) || isTrue;
});
jQuery.validator.addMethod('maxLengthB', function (value, element, params) {
    var b = 0, l = value.length;
    for (var i = 0; i < l; i++) {
        if (value.charCodeAt(i) > 255) {
            b += 2;
        } else {
            b++;
        }
    }
    return this.optional(element) || b <= params[0];
});

/* add by tmw - 验证网址是否正确*/
jQuery.validator.addMethod('isUrl', function (value, element) {
    var urlRgx = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    return urlRgx.test(value);
});
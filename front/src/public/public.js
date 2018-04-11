
/*
 * @(#) public.js
 * 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
 *
 * <br> Copyright:  Copyright (c) 2017
 * <br> Company:厦门畅享信息技术有限公司
 * <br> @author weixl
 * <br> 2017-10-12 19:37:08
 */

//导入jquery
import $ from 'jquery';
//导入fetch
import 'whatwg-fetch';

//fetch POST请求  用fetch的原因是我们可以获取自己的json文件而不需要从服务器获取
export const getByFetch = (url, data,callback) => {
     //传入的数据转换为JSON对象
     let form  = JSON.parse(JSON.stringify(data));
    //新建formData对象  fetch不能自己封装formData因此我们需要自己new一个formData对象
    let formData = new FormData();
    //遍历参数放入到fromData
    for (var key in form)
    {
        formData.append(key,form[key]);
    }
    //调用fecth获取数据
    fetch(url,{
        method: 'POST',
        // headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
        body: formData
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            callback(data);
        })
}
//从后台获取数据
export const get =  (url,data,isAsync,callback) => {
    $.ajax({
        url:url,
        dataType:'json',
        type:'POST',
        async:isAsync,
       /**
        *  1、跨域访问时通过设置 withCredentials: true ，发送Ajax时，Request header中便会带上 Cookie 信息
        *  2、服务端设置"Access-Control-Allow-Credentials", "true"
        *  3、此时"Access-Control-Allow-Origin"不能为*
        */
       xhrFields: {
           withCredentials: true
       },
        data:data,
        success :function (data){
            callback(data);
        },
        error:function(){
            console.error('请求数据错误！')
        }
     }
    )
}

//获取当前时间
export const getCurrentTime =()=>{
    var date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.date = date.getDate();
    this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
    this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var currentTime =  this.year + "年" + this.month + "月" + this.date + "日 " + this.hour + ":" + this.minute + ":" + this.second + " " + this.day;
    return currentTime;
}


 //时间转换
export const toDisDate = function(dateStr, formatType){
    if (!dateStr || dateStr.length < 6 || dateStr.length > 14)
    {
        return dateStr;
    }
    else
    {
        var charArr = [];
        switch (formatType)
        {
            case "HY":
                charArr = ['-', '-', ' ', ':', ':'];
                break;
            case "DOT":
                charArr = ['.', '.', ' ', ':', ':'];
                break;
            case "CN":
                charArr =['年', '月', '日', ':', ':'];
                break;
            case "XX":
                charArr = ['/', '/', '', ':', ':'];
                break;
            default:charArr =['-', '-', ' ', ':', ':'];
        }
        try
        {
            dateStr = dateStr.replace(/ /g,"").replace(/-/g,"").replace(/:/g,"");
            switch (dateStr.length)
            {
                case 6:
                    dateStr = dateStr.substr(0,4) + charArr[0] + dateStr.substr(4,2);
                    break;
                case 8:
                    dateStr = dateStr.substr(0,4) + charArr[0] + dateStr.substr(4,2) + charArr[1] + dateStr.substr(6,2);
                    break;
                case 10:
                    dateStr = dateStr.substr(0,4) + charArr[0] + dateStr.substr(4,2) + charArr[1] + dateStr.substr(6,2) + charArr[2] + dateStr.substr(8,2);
                    break;
                case 12:
                    dateStr = dateStr.substr(0,4) + charArr[0] + dateStr.substr(4,2) + charArr[1] +
                              dateStr.substr(6,2) + charArr[2] + dateStr.substr(8,2) + charArr[3] + dateStr.substr(10,2);
                    break;
                case 14:
                    dateStr = dateStr.substr(0,4) + charArr[0] + dateStr.substr(4,2) + charArr[1] +
                              dateStr.substr(6,2) + charArr[2] + dateStr.substr(8,2) + charArr[3] + dateStr.substr(10,2) +
                              charArr[4] + dateStr.substr(12,2) ;
                    break;
                default:
                    return dateStr;
            }
            return dateStr;
        }
        catch (ex)
        {
            return dateStr;
        }
    }
}


//根据参数名获取参数
export const getQueryString = function(location, name){
    // 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
    if(location.search.indexOf("?")==-1 || location.search.indexOf(name+'=')==-1)
    {
        return '';
    }

    // 获取链接中参数部分
    var queryString = location.search.substring(location.search.indexOf("?")+1);
    queryString = queryString.replace(/#.*$/, '');
    // 分离参数对 ?key=value&key2=value2
    var parameters = queryString.split("&");

    var pos, paraName, paraValue;
    for(var i=0; i<parameters.length; i++)
    {
        // 获取等号位置
        pos = parameters[i].indexOf('=');
        if(pos == -1) { continue; }

        // 获取name 和 value
        paraName = parameters[i].substring(0, pos);
        paraValue = parameters[i].substring(pos + 1);

        // 如果查询的name等于当前name，就返回当前值，同时，将链接中的+号还原成空格
        if(paraName == name)
        {
            return decodeURIComponent(paraValue.replace(/\+/g, " "));
        }
    }
    return '';

}

/**
 *  根据出生日期转换为年龄
 * @param str
 * @returns {*}
 */
export const getAgeByBrithday = (str)=>{
    if(str.match(/^[0-9]*$/)){
        if(str.length>8){
            str = str.substr(0,8)
        }
        str = `${str.substr(0,4)}-${str.substr(4,2)}-${str.substr(6,2)}`;
    }
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) {
        return str;
    }
    var d = new Date(r[1], r[3] - 1, r[4]);
    if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
        var Y = new Date().getFullYear();
        return (Y - r[1]);
    }
    return ("输入的日期格式错误！");
}


/**
 * 根据出生日期算出年龄精确到天
 * @param strBirthday
 * @returns {*}
 */
export const jsGetAge = (strBirthday) => {
    if (strBirthday.match(/^[0-9]*$/)) {
        if (strBirthday.length > 8) {
            strBirthday = strBirthday.substr(0, 8)
        }
        strBirthday = `${strBirthday.substr(0, 4)}-${strBirthday.substr(4, 2)}-${strBirthday.substr(6, 2)}`;
    }
    var returnAge = strBirthday;
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
        returnAge = 0;//同年 则为0岁
    }
    else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                }
                else {
                    returnAge = ageDiff;
                }
            }
            else {
                var monthDiff = nowMonth - birthMonth;//月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                }
                else {
                    returnAge = ageDiff;
                }
            }
        }
        else {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }

    return returnAge;//返回周岁年龄

}
/**
 * 获取坐标
 */
export const getCoordinate = (url) => {
    let result = [];
    get(url, '', false, (data) => {
        if (data.status == 'Y') {
            //数据库中的经度纬度为字符串，地图初始化需要float
            result = [ parseFloat(data.LATITUDE),parseFloat(data.LONGITUDE)];
        }
    });
    return result;
}
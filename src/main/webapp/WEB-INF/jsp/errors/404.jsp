<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%--
  ~ @(#) 404.jsp
  ~ 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
  ~
  ~ <br> Copyright:  Copyright (c) 2018
  ~ <br> Company:厦门畅享信息技术有限公司
  ~ <br> @author weixl
  ~ <br> 2018-01-16 14:04:58
  --%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>找不到请求的页面</title>
<style>
.itpub_404{width:750px; margin:0 auto; padding:58px 0 74px; overflow:hidden}
.itpub_404_l{width:480px; float:left}
.itpub_404_r{width:222px; float:right}
.itpub_404_r p{color:#666; font-size:12px;}
.itpub_404_r p.text1{color:#cc0000; font-weight:bold; font-size:16px; padding:20px 0 10px}
.itpub_404_r p.text2{padding-top:20px; line-height:22px}
.itpub_404_r p.text2 a{text-decoration:underline}
</style>
</head>
<body>
<div class="itpub_404">
    	<div class="itpub_404_l">	<img title="找不到请求的页面" src="<c:url value="/images/404page.jpg"/>"  alt="404page " width="480" height="202" /></div>
        <div class="itpub_404_r">
        	<p class="text1">哎呀！你访问的页面不存在</p>
            <p>可能网页地址输入错了，请再核对下吧^-^</p>
        </div>
    </div>
</body>
</html>
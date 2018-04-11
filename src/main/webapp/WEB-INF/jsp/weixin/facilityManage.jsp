<%@ page import="com.sunsharing.party.ConfigParam" %><%--
  ~ @(#) facilityManage.jsp
  ~ 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
  ~
  ~ <br> Copyright:  Copyright (c) 2018
  ~ <br> Company:厦门畅享信息技术有限公司
  ~ <br> @author weixl
  ~ <br> 2018-01-16 14:04:59
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/1/16
  Time: 12:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE HTML>
<html>
<head>
    <title>设施管理</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="description" content=" ">
    <link rel="stylesheet" href="<c:url value="/lib/weui2.0/css/weui.min.css"/>">
    <link rel="stylesheet" href="<c:url value="/jcss/weui-individual.css"/>"><!-- weui框架特殊化样式 -->
    <link rel="stylesheet" href="<c:url value="/lib/font-awesome/css/font-awesome.min.css"/>">
    <link rel="stylesheet" href="<c:url value="/jcss/party.css"/>"><!-- 自定义补充样式 -->
<html>
<head>
    <title>Title</title>
</head>
<body ontouchstart>
<article class="weui-article" style="padding-bottom: 80px;">
    <h1>${facilityName}</h1>
    <section>
        <!-- 设备位置 start -->
        <p><span class="c999">设备位置：</span>${address} <!--  <i class="fa fa-map-marker"style="width:13px; color: #f64d00; margin-left: 3px"></i> --></p>
        <!-- 设备位置 end -->

        <!-- 设备图片或简介 start -->
        <%--<p><img src="./images/temp/u1528.png" alt=""></p>--%>
        ${content}
        <!-- 设备图片或简介 end -->

    </section>

</article>

<div class="weui-footer weui-footer_fixed-bottom we-join">
    <div class="weui-cell p0">
        <a href="<%= ConfigParam.thirdWeixinurl%>${facilityId}" class="weui-btn weui-btn_warn we-join-a cfff">设施报修</a>
    </div>
</div>
<script src="<c:url value="/jjs/jquery/jquery-1.9.1.min.js"/>"></script>
<script src="<c:url value="/jjs/public.js"/>"></script>
</body>
</html>

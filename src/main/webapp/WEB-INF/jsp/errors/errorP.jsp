<%@page import="java.util.Map"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%--
  ~ @(#) errorP.jsp
  ~ 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
  ~
  ~ <br> Copyright:  Copyright (c) 2018
  ~ <br> Company:厦门畅享信息技术有限公司
  ~ <br> @author weixl
  ~ <br> 2018-01-16 14:04:59
  --%>

<html>
<head><title>Exception!</title></head>
<body>
<H2>未知错误: ${ex.title }</H2>
<hr />
<P>错误描述：</P>
${ex.message }
</body>
</html>
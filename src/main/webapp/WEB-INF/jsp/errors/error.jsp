<%@ page contentType="text/html; charset=UTF-8"%>
<%--
  ~ @(#) error.jsp
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
<% Exception e = (Exception)request.getAttribute("ex"); %>
<H2>未知错误: <%= e.getClass().getSimpleName()%></H2>
<hr />
<P>错误描述：</P>
<%= e.getMessage()%>
<P>错误信息：</P>
<% e.printStackTrace(new java.io.PrintWriter(out)); %>
</body>
</html>
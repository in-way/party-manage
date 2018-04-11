<%@ page language="java" contentType="text/html; charset=UTF-8"
         import="com.baidu.ueditor.ActionEnter"
         pageEncoding="UTF-8"%>
<%@ page import="com.alibaba.fastjson.JSON" %>
<%@ page import="com.baidu.ueditor.define.ActionMap" %>
<%@ page import="com.alibaba.fastjson.JSONObject" %>
<%@ page import="com.sunsharing.party.common.dfs.FileFactory" %>
<%@ page import="java.io.File" %>
<%@ page import="org.apache.log4j.Logger" %>
<%@ page import="com.sunsharing.party.util.RequestUtils" %>
<%@ page import="com.sunsharing.component.utils.base.DateUtils" %>
<%@ page import="java.util.Date" %>
<%@ page import="com.sunsharing.component.utils.base.StringUtils" %>
<%@ page import="com.sunsharing.party.ConfigParam" %>
<%@ page import="java.io.IOException" %>
<%@ page import="com.sunsharing.party.constant.FileStoreNameUrl" %>
<%@ page import="org.springframework.web.multipart.MultipartHttpServletRequest" %>
<%@ page import="org.springframework.web.multipart.MultipartFile" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%-- <% 

//     request.setCharacterEncoding( "utf-8" );
// 	response.setHeader("Content-Type" , "text/html");
	
// 	String rootPath = application.getRealPath( "/" );
	
// 	out.write( new ActionEnter( request, rootPath ).exec() );
	
 %> --%>
<%
    Logger logger = Logger.getLogger("Application");
    request.setCharacterEncoding( "utf-8" );
    response.setHeader("Content-Type" , "text/html");
    String rootPath = application.getRealPath("/");
    String actionType = request.getParameter("action");
    String stateJson = new ActionEnter( request, rootPath ).exec();
    int actionCode = ActionMap.getType(actionType);

    if(actionCode==ActionMap.UPLOAD_IMAGE
            || actionCode==ActionMap.UPLOAD_SCRAWL
            || actionCode==ActionMap.UPLOAD_VIDEO
            || actionCode==ActionMap.UPLOAD_FILE
            ){
        //上传文件的，重新保存到文件存储系统。
        JSONObject state = JSON.parseObject(stateJson);
        logger.info("state：" + state);
        if("SUCCESS".equals(state.getString("state"))){
            String filename = state.getString("url");
            String phyFilePath = rootPath + filename.substring(1);
//            logger.info("物理文件位置：" + phyFilePath);
            try{
                String relativeName = FileFactory.create().saveFile(new File(phyFilePath)).replace( "\\", "/" );
                int last = filename.lastIndexOf("/");
                String temp = filename.substring(0,last);
                last = temp.lastIndexOf("/");
                String basePath = temp.substring(0,last);//倒数第二个斜杠
                state.put("url",ConfigParam.entryName+basePath+relativeName);
                stateJson = state.toJSONString();
            }catch (Exception e){
                logger.error("保存文件到文件存储系统失败！",e);
            }
        }
    }
    // 获取本地服务器访问跟路径
  /*  String rootPaths = application.getRealPath("/");
    String actionType = request.getParameter("action");
    MultipartHttpServletRequest mReq = null;//=======================
    MultipartFile file = null;//=======================
    mReq = (MultipartHttpServletRequest)request;//=======================
    // 从config.json中取得上传文件的ID
    file = mReq.getFile("upfile");
*//*    // 取得文件的原始文件名称
    fileName = file.getOriginalFilename();*//*
    String stateJson = new ActionEnter( request, rootPaths ).exec();
    //上传文件的，重新保存到文件存储系统。
    JSONObject state = JSON.parseObject(stateJson);
    final String rootPath = request.getSession().getServletContext().getRealPath("/");
    // 文件所在服务器目录地址
    final String directory = "upload" + File.separator + DateUtils.getDBString(new Date()).substring(0, 8);
    // 判断文件目录是否创建
    final File directoryFile = new File(rootPath + directory);
    if (!directoryFile.exists()) {
        directoryFile.mkdirs();// 创建目录并且连带父目录一起创建
    }
    final String fileName = StringUtils.generateUUID();// 文件新名称
    final String oldFileName = file.getOriginalFilename();// 文件原名称
    logger.info("图片原名称是："+oldFileName);
//    final String oldFileName = "test";// 文件原名称
    final String suffix = oldFileName.substring(oldFileName.lastIndexOf("."), oldFileName.length());// 获取图片后缀类型
    final File newFile = new File(directoryFile, fileName + suffix);// 创建文件
    try {
        if (!newFile.exists()) {// 文件不存在则创建一个新文件
            newFile.createNewFile();
        }
        file.transferTo(newFile);
        final String filePath = FileFactory.create().saveFile(newFile,
                ConfigParam.entryName + "/"  + FileStoreNameUrl.TEMP  + "/" + ConfigParam.imgType);// 将本地文件上传至HDFS
        state.put("url", FileStoreNameUrl.PREFIX_IMG + filePath);
        stateJson = state.toJSONString();
        logger.info("图片上传成功");
    } catch (final IllegalStateException e) {
        if (newFile.exists()) {
            newFile.delete();
            logger.info("图片上传发生异常错误已删除源文件");
        }
        e.printStackTrace();
        logger.info("图片上传发生异常错误");
    } catch (final IOException e) {
        if (newFile.exists()) {
            newFile.delete();
            logger.info("图片上传发生异常错误已删除源文件");
        }
        e.printStackTrace();
        logger.info("图片上传发生异常错误");
    }*/
    out.write( stateJson );


%>
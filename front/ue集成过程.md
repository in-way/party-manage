# [简介]

>ueditor集成过程

#1、下载ueditor java 版本
#2、打开下载的ueditor>jsp>config.json 修改图片访问路径和图片存储名
     "imageUrlPrefix": "../../", /* 图片访问路径前缀 */
     "imagePathFormat": "/static/images/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
#3、打开ueditor>jsp>controller.jsp 编写后台存储图片代码
    <%@ page language="java" contentType="text/html; charset=UTF-8"
             import="com.baidu.ueditor.ActionEnter"
             pageEncoding="UTF-8"%>
    <%@ page import="com.alibaba.fastjson.JSON" %>
    <%@ page import="com.baidu.ueditor.define.ActionMap" %>
    <%@ page import="com.alibaba.fastjson.JSONObject" %>
    <%@ page import="com.sunsharing.party.common.dfs.FileFactory" %>
    <%@ page import="java.io.File" %>
    <%@ page import="org.apache.log4j.Logger" %>
    <%@ page import="com.sunsharing.party.ConfigParam" %>
    <%@ page trimDirectiveWhitespaces="true" %>
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
        out.write( stateJson );
    %>
#4、新建ueditor.js
     import React from 'react';
     import BaseComponent from '@share/scurd/component/BaseComponent';
      require('../../static/lib/ueditor/ueditor.config.js');
      require('../../static/lib/ueditor/ueditor.all.min.js');
      require('../../static/lib/ueditor/lang/zh-cn/zh-cn.js');
     import {UrlUtils} from "@share/scurd/block/Utils";
     class UeditorComponent extends BaseComponent {
       constructor(props){
         super(props);
         this.state = {
         };
       }
       componentDidMount(){
           let that = this;
           this.initEditor();
       }
       componentWillUnmount() {
         // 组件卸载后，清除放入库的id
         UE.delEditor(this.props.id);
       }
       // 编辑器配置项初始化
       initEditor() {
         var id = this.props.id;
         var ue = UE.getEditor(id, {
           // 工具栏，不配置有默认项目
           toolbars: [[
             'fullscreen', 'source', '|', 'undo', 'redo', '|',
             'bold', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch',
             '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
             'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
             'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
             'indent', '|',
             'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
             'emotion',
             'horizontal', '|', 'date', 'time', '|', 'insertimage'
           ]],
           lang: 'zh-cn',
           // 字体
           'fontfamily': [
             {label: '', name: 'songti', val: '宋体,SimSun'},
             {label: '', name: 'kaiti', val: '楷体,楷体_GB2312, SimKai'},
             {label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei'},
             {label: '', name: 'heiti', val: '黑体, SimHei'},
             {label: '', name: 'lishu', val: '隶书, SimLi'},
             {label: '', name: 'andaleMono', val: 'andale mono'},
             {label: '', name: 'arial', val: 'arial, helvetica,sans-serif'},
             {label: '', name: 'arialBlack', val: 'arial black,avant garde'},
             {label: '', name: 'comicSansMs', val: 'comic sans ms'},
             {label: '', name: 'impact', val: 'impact,chicago'},
             {label: '', name: 'timesNewRoman', val: 'times new roman'}
           ],
           // 字号
           'fontsize': [10, 11, 12, 14, 16, 18, 20, 24, 36],
     
           // 为编辑器实例添加一个路径，必需项
           //   开发
           // 'UEDITOR_HOME_URL': '../../../node_modules/ueditor/',
             // 正式
           'UEDITOR_HOME_URL': 'node_modules/ueditor/',
           // 上传图片时后端提供的接口
           serverUrl:UrlUtils.getContextPath()+`/node_modules/ueditor/jsp/controller.jsp`,
           enableAutoSave: false,
           autoHeightEnabled: false,
           initialFrameHeight: this.props.height,
           initialFrameWidth: '100%',
           // 是否允许编辑
           readonly: this.props.disabled
         });
         this.editor = ue;
         var self = this;
         this.editor.ready(function (ueditor) {
           if (!ueditor) {
           // 如果初始化后ueditor不存在删除后重新调用
             UE.delEditor(self.props.id);
             self.initEditor();
           }
         });
           //监听用户输入，用于及时及时反馈，事件中调用父组件的callback回调函数
           ue.addListener('selectionchange', function(type) {
               self.props.callback(this.getContent());
           });
           //页面回显示
           ue.addListener("ready", function () {
               // editor准备好之后才可以使用
               ue.setContent(self.props.changeContent || '');
           });
     
       }
       render(){
         return (
           <div id={this.props.id}  name="content" type="text/plain"></div>
         )
       }
     }
     export default UeditorComponent;
#5、修改ueditor.js中资源访问路径'UEDITOR_HOME_URL': 'node_modules/ueditor/'和服务器上传地址serverUrl:UrlUtils.getContextPath()+`/node_modules/ueditor/jsp/controller.jsp`(第三步中修改的jsp),
    **注：node_modules 为自己在webapp下定义的目录名**
#6、调用ueditor.js
    import React from 'react'
    import UeditorComponent from './component/ueditors.js'
    import BaseComponent from '@share/scurd/component/BaseComponent';
     class TestUComponent extends BaseComponent {
        constructor(props){
            super(props);
        }
        render(){
            return(
                <div>
                    <UeditorComponent  changeContent={this.val()}
                                       callback={ (content)=>this.props.stateChange(this.props.itemData.column,content)}
                                       id="content"
                                       height="200" />
                </div>
            )
        }
    };
    export default TestUComponent;
#7、正式环境时在prod.js中把刚才编辑的ueditor拷贝到webapp的node_modeles目录下
     new CopyWebpackPlugin([
                      {
                          from: 'src/static/lib/ueditor',
                          to: 'node_modules/ueditor'
                      }
                ])
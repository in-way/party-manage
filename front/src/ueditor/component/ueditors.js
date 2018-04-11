/*
 * @(#) ueditors.js
 * 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
 *
 * <br> Copyright:  Copyright (c) 2018
 * <br> Company:厦门畅享信息技术有限公司
 * <br> @author weixl
 * <br> 2018-01-11 14:55:00
 */
import './ueditor.css'
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
      readonly: this.props.disabled,
      //关闭字数提示
      wordCount:false
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
/*
 * @(#) XldCode.js
 * 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
 *
 * <br> Copyright:  Copyright (c) 2018
 * <br> Company:厦门畅享信息技术有限公司
 * <br> @author weixl
 * <br> 2018-03-14 10:06:38
 */
import React, { Component } from 'react';
import {
    withRouter
} from 'react-router-dom';
import CodePanel from "../Component/CodePanel";
import {
    Panel,
    FormControl,
    Button,
    Radio,
    Alert,
    FormGroup,
    TextTip,
    InputGroup,
    Form,
    Table,
    ButtonToolBar,
    Checkbox,
    DateTime,
    PicBox,
    Select
} from '@share/shareui';
class XldCode extends Component{
    constructor(props){
        super(props);
        //引入路由参数
        let{match}=props;
        //获取巡逻点id
        this.params = match.params.pointId;
        //获取巡逻点Id
        this.state={
            showmore:'none',
            size:'240'
        }
    }

    render (){
        let that = this;
        let params = this.params;
        //巡逻点编号
        let pointId = params.substring(params.indexOf('=') + 1, params.indexOf('&'));
        //巡逻点名称
        let xldmc = params.substring(params.lastIndexOf('=') + 1);
        //查看二维码链接
        let showUrl = `http://${window.location.host}/party-manage/xld/generatingXldCode.do?pointId=${pointId}&xldmc=${xldmc}`;
        //下载二维码链接
        let downLoadUrl = `http://${window.location.host}/party-manage/xld/downloadXldCode.do?pointId=${pointId}&xldmc=${xldmc}&size=`;
        return(
            <CodePanel  name={xldmc}
                        showUrl={showUrl}
                        downLoadUrl={downLoadUrl}/>
        )
    }
}

export default withRouter(XldCode);
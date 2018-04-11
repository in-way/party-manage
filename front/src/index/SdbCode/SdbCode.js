/*
 * @(#) SdbCode.js
 * 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
 *
 * <br> Copyright:  Copyright (c) 2018
 * <br> Company:厦门畅享信息技术有限公司
 * <br> @author weixl
 * <br> 2018-03-21 16:57:32
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
class SdbCode extends Component{
    constructor(props){
        super(props);
        //引入路由参数
        let{match}=props;
        //获取学生
        this.params = match.params.xsId;
        this.state={
            size:'240'
        }
    }
    render (){
        let that = this;
        let params = this.params;
        //巡逻点编号
        let xsId = params.substring(params.indexOf('=')+1,params.indexOf('&'));
        //巡逻点名称
        let xsName = params.substring(params.lastIndexOf('=')+1);
        let showUrl = `http://${window.location.host}/party-manage/sdb/generatingSdbCode.do?xsId=${xsId}&xsName=${xsName}`;
        let downLoadUrl = `http://${window.location.host}/party-manage/sdb/downloadSdbCode.do?xsId=${xsId}&xsName=${xsName}&size=`;
        return(
            <CodePanel name={xsName}
                       showUrl={showUrl}
                       downLoadUrl={downLoadUrl}/>
        )
    }
}

export default withRouter(SdbCode);
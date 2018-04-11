/*
 * @(#) TrkCode.js
 * 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
 *
 * <br> Copyright:  Copyright (c) 2018
 * <br> Company:厦门畅享信息技术有限公司
 * <br> @author weixl
 * <br> 2018-03-06 16:20:32
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
class TrkCode extends Component{
    constructor(props){
        super(props);
        //引入路由参数
        let{match}=props
        //获取身份证id
        this.params = match.params.idCard;
        this.state={
            size:'240'
        }
    }
    render (){
        let that = this;
        let params = this.params;
        //身份证号
        let idCard = params.substring(params.indexOf('=')+1,params.indexOf('&'));
        //姓名
        let name = params.substring(params.lastIndexOf('=')+1);
        let showUrl = `http://${window.location.host}/party-manage/trk/generatingTrkCode.do?idCard=${idCard}`;
        let downLoadUrl = `http://${window.location.host}/party-manage/trk/downloadTrkCode.do?idCard=${idCard}&name=${name}&size=`;
        return(
            <CodePanel name={name}
                       showUrl={showUrl}
                       downLoadUrl={downLoadUrl}/>
        )
    }
}

export default withRouter(TrkCode);
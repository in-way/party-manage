/*
 * @(#) QrCode.js
 * 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
 *二维码展示页面
 * <br> Copyright:  Copyright (c) 2018
 * <br> Company:厦门畅享信息技术有限公司
 * <br> @author weixl
 * <br> 2018-01-15 14:26:24
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
class QrCode extends Component{
    constructor(props){
        super(props);
        //引入路由参数
        let{match}=props
        //获取设备Id
        this.params = match.params.facilityId;
        // this.facilityId = getQueryString(this.props.location,'facilityId')
        // this.facilityId = this.facilityId.substring("facilityId=");
        this.state={
            size:'240'
        }
    }


    render (){
        let that = this;
        let params = this.params;
        //设备编号
        let facilityId = params.substring(params.indexOf('=')+1,params.indexOf('&'));
        //设备名称
        let facilityName = params.substring(params.lastIndexOf('=')+1);
        let showUrl = `http://${window.location.host}/party-manage/generatingQrCode.do?facilityId=${facilityId}&facilityName=${facilityName}`
        let downLoadUrl = `http://${window.location.host}/party-manage/downloadQrCode.do?facilityId=${facilityId}&facilityName=${facilityName}&size=`;

        return(
            <CodePanel name={facilityName}
                       showUrl={showUrl}
                       downLoadUrl={downLoadUrl}/>
        )
    }
}

export default withRouter(QrCode);
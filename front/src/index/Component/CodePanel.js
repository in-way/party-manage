/*
 * @(#) CodePanel.js
 * 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
 *  二维码展示公共面板
 * <br> Copyright:  Copyright (c) 2018
 * <br> Company:厦门畅享信息技术有限公司
 * <br> @author weixl
 * <br> 2018-03-14 10:06:38
 */
import React, { Component } from 'react';
import {
    Button,
    Radio
} from '@share/shareui';
import './css/CodePanel.scss';
/**
 * 二维码展示面板大小
 * @type {number}
 */
const width = 800;
const height = 400;
/**
 * 二维码下载尺寸
 * @type {number}
 */
const size1 = 240;
const size2 = 450;
const size3 = 1284;

class CodePanel extends Component{
    constructor(props){
        super(props);
        this.state={
            size:size1
        }
        this.onChange = this.onChange.bind(this);
        this.downLoadQcode = this.downLoadQcode.bind(this);
    }
    //修改二维码下载尺寸
    onChange(size) {
        return (e) => {
            this.state.size = size;
            this.setState(this.state);
        }
    }
    //下载二维码
    downLoadQcode(){
        window.open(`${this.props.downLoadUrl}${this.state.size}`);
    }
    render (){
        let that = this;
        return(
            <div>
                <dl className="twoCode-dl">
                    <dt ><img src={this.props.showUrl} alt="二维码"/></dt>
                    {/*<dt><img  src={require('./1.jpg')} alt="二维码"/></dt>*/}
                    <dd>
                        <b>{this.props.name}</b>
                        <p><Radio name="radio" inline checked={that.state.size==size1?'checked':''} onChange={that.onChange(size1)}>
                            {`${size1}*${size1}`}
                        </Radio></p>
                        <p><Radio name="radio" inline  onChange={that.onChange(size2)}>
                            {`${size2}*${size2}`}
                        </Radio></p>
                        <p><Radio name="radio" inline  onChange={that.onChange(size3)}>
                            {`${size3}*${size3}`}
                        </Radio></p>
                        <Button  className="btn-lg download-btn" type="button" bsStyle="primary" onClick={this.downLoadQcode}
                        >下载二维码</Button>
                    </dd>
                </dl>
         </div>
        )
    }
}

export default CodePanel;
export {width, height};
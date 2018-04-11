/*
 * @(#) ueditor.js
 * 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
 *
 * <br> Copyright:  Copyright (c) 2018
 * <br> Company:厦门畅享信息技术有限公司
 * <br> @author weixl
 * <br> 2018-01-11 14:32:55
 */

import React from 'react'
import UeditorComponent from '../../../ueditor/component/ueditors.js'
import BaseComponent from '@share/scurd/component/BaseComponent';
 class TestUComponent extends BaseComponent {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <UeditorComponent  changeContent={this.val()} ref="ADMINNAME"
                                   callback={ (content)=>this.props.stateChange(this.props.itemData.column,content)}
                                   id="content"
                                   height="200" />
            </div>
        )
    }
};
export default TestUComponent;
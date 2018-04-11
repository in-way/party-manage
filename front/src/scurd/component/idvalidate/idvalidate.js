/*
 * @(#) validate.js
 * 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
 *
 * <br> Copyright:  Copyright (c) 2018
 * <br> Company:厦门畅享信息技术有限公司
 * <br> @author weixl
 * <br> 2018-01-25 09:06:49
 */
import React from 'react';
import {
    Select,Modal,Button,FormControl
} from '@share/shareui';
import BaseComponent from '@share/scurd/component/BaseComponent';
class ValidateComponent extends  BaseComponent{
    constructor(props){
        super(props);
    }
    render (){
        let { itemData, stateChange, children } = this.props;
        let { type, ext, val, search_type, readOnly, column, style } = itemData;
        let onlyRead = readOnly === true ?true:false;
        return (
                <div>
                    <FormControl  style ={{style,maxWidth:"300px"}}
                                  inline
                                  type={type}
                                  id={column}
                                  name={ column }
                                  disabled = { onlyRead}
                                  value={stateChange(itemData.column)}
                                  onChange={e => {stateChange(itemData.column,e.target.value);this.trigger("change")}}
                    />&nbsp;&nbsp;
                    <input type="button" value="检索"
                           className={"btn btn-primary"} id ={`${column}Button`} /*onClick={()=>{this.trigger("jiaoyanClick")}} *//>&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
               )

    }
}
export default ValidateComponent;
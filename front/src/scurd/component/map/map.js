/*
 * @(#) map.js
 * 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
 *
 * <br> Copyright:  Copyright (c) 2018
 * <br> Company:厦门畅享信息技术有限公司
 * <br> @author weixl
 * <br> 2018-01-11 14:06:57
 */

import './map.css';
// import '../../../map/src/index.scss';
import '@share/map/src/index.scss';
import React from 'react';
import BaseComponent from '@share/scurd/component/BaseComponent';
import Map from '@share/map';
import {
    Select,Modal,Button,FormControl
} from '@share/shareui';
import {UrlUtils} from "@share/scurd/block/Utils";
import {getCoordinate} from '../../../public/public'
/**
 * 天地图获取详细地址配置项
 * @type {{url: string, key: string}}
 */
const config = {
    url:window.location.host.indexOf('172.') == -1 ? "http://23.140.1.6:7009/query.shtml" : "http://www.tianditu.com/query.shtml" ,
    key:"8a7b9aac0db21f9dd995e61a14685f05"
}

class MapComponent extends BaseComponent {
    constructor(props){
        super(props);
        this.state = {
            "form":{"dz":"","x":"","y":"","initX":106.4735393611908,"initY":29.434929977493283},
            data : {},
            "showModal":false
        };
        this.mapMark = this.mapMark.bind(this);
        this.stopMark = this.stopMark.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.mapStateChange = this.mapStateChange.bind(this);
        this.confirmMark = this.confirmMark.bind(this);
        this.getAddressBySky = this.getAddressBySky.bind(this);
    }
    componentWillMount() {
        //获取坐标
        let coordinate = getCoordinate(`${UrlUtils.getContextPath()}/weixin/getCoordinate.do`);
        if (coordinate.length >= 2) {
            console.info(`当前社区的经度为:${coordinate[1]}纬度为：${coordinate[0]}`)
            this.setState({
                              form: {
                                  initX: coordinate[0]||this.state.form.initX,
                                  initY: coordinate[1]||this.state.form.initY
                              }
                          })
        }
    }
    componentDidMount(){

    }
    //标注坐标点
    mapMark(){
        let {map} = this.state;

        let tag = null;
        //实例化画图工具
        let drawTool = new esri.toolbars.Draw(map.toObject());
        this.state.drawTool = drawTool
        drawTool.deactivate();//结束画图工具
        map.tempLayer.point.clear();
        //激活画点功能
        drawTool.activate(esri.toolbars.Draw.POINT);
        //画图结束事件
        drawTool.on("draw-end", function (e) {
            //drawTool.deactivate();//结束画图工具
            // map.tempLayer.point.clear();
            if (tag !== null) {
                map.tempLayer.point.remove(tag.toJson());
                tag = null
            }
            console.info(e);
            window.x = e.geometry.x;
            window.y = e.geometry.y;
            console.info("x坐标"+ window.x+"y坐标"+window.y);
            // console.info(e.geometry.x);
            let grap = new SkySeaMap.Graphic();
            grap.setGeometry(e.geometry);//设置几何
            grap.setSymbol({
                               "type" : "esriPMS",
                               "url" : require("./point.png"),
                               "contentType" : "image/png",
                               "width" : 19.5,
                               "height" : 19.5,
                               "angle" : 0,
                               "xoffset" : 0,
                               "yoffset" : 0
                           });//设置样式

            map.tempLayer.point.add(grap);
            tag = grap
            // alert("end")
        });

    }
    //关闭标注功能
    stopMark(){
        let {map} = this.state;
        window.x='0';
        window.y='0';
        window.address='';
        let {drawTool} = this.state;
        drawTool.deactivate();
        map.tempLayer.point.clear();
    }
    //显示地图模态框
    show(){
        this.setState({
                          "showModal":true
                      });
        // setTimeout(()=>{ this.defaultTag()},1000)
    }
    //默认标注
   /* defaultTag(){
         let x = 0;
         let y = 0;
         let weizhi = document.getElementById("weizhi").name;
         if(weizhi&&weizhi.split(",").length==3){
             let zuobiao = weizhi.split(",");
             x = zuobiao[0];
             y = zuobiao[1];
             window.x = x ;
             window.y = y ;
         }
        let {map} = this.state;
        var infoTemplate = {
            "title": "测试点",
            "content": "标注 123123,<br>地点: 3231123"
        };
        var grgp = new SkySeaMap.Graphic(
            {
                x: x , y: y, type: "point"
            }, {
                "type" : "esriPMS",
                "url" : require("./point.png"),
                "contentType" : "image/png",
                "width" : 19.5,
                "height" : 19.5,
                "angle" : 0,
                "xoffset" : 0,
                "yoffset" : 0
            });
        var options = { layerId: "1", opacity: 100, infoTemplate: infoTemplate, renderer: null };
        var tempLayer = new SkySeaMap.GraphicsLayer(options);
        map.tempLayer.point.add(tempLayer);
    }*/
    //默认标注
    defaultTag(){
        let x = 0;
        let y = 0;
        let weizhi = document.getElementById("weizhi").name;
        if(weizhi&&weizhi.split(",").length==3){
            let zuobiao = weizhi.split(",");
            x = zuobiao[0];
            y = zuobiao[1];
            window.x = x ;
            window.y = y ;
        }
        let {map} = this.state;
       /* var infoTemplate = {
            "title": "测试点",
            "content": "标注 123123,<br>地点: 3231123"
        };*/
        var grgp = new SkySeaMap.Graphic(
            {
                x: x , y: y, type: "point"
            }, {
                "type" : "esriPMS",
                "url" : require("./point.png"),
                "contentType" : "image/png",
                "width" : 19.5,
                "height" : 19.5,
                "angle" : 0,
                "xoffset" : 0,
                "yoffset" : 0
            });
   /*     var options = { layerId: "1", opacity: 100, infoTemplate: infoTemplate, renderer: null };
        var tempLayer = new SkySeaMap.GraphicsLayer(options);
        map.addLayer(tempLayer); //把临时图层添加到地图上
        tempLayer.onClick(function (data) {//要素点击事件
            console.info(data);
        });
        tempLayer.add(grgp);*/
        map.tempLayer.point.add(grgp);
    }
    //隐藏地图模态框
    hide(){
        window.x='0';
        window.y='0';
        window.address='';
        this.setState({
                          "showModal":false
                      })
    }
    //确认坐标点
    confirmMark(e){
        e.preventDefault();
        if( typeof(window.x) =='undefined'||typeof(window.y) =='undefined'||window.x==='0'||window.y==='0'){
            alert('您没有选中任何地址！')
            return ;
        }
         let that = this;
         let x = window.x;
         let y = window.y;
         let res = [x,y];
         //通过百度地图获取地址
        // this.accessBaiDuAddr(res);
        //通过天地图获取地址
        this.getAddressBySky(res);
    }
    //监听地图值变化
    mapStateChange()
    {
        let {itemData, stateChange} = this.props;
        let x  = window.x;
        let y = window.y;
        let dz = this.state.form['dz'];
        let rst = [ x, y,dz].join(",");
         stateChange(itemData.column,rst);
    }
    //通过天地图获取地址
    getAddressBySky(res){
        var self =this;
        let getLocationUrl = `${config.url}?postStr={'lon':${res[0]},'lat':${res[1]},'appkey':${config.key},'ver':1}&type=geocode`;
        console.log('获取详情位置的url:'+ getLocationUrl);
        $.ajax({
                   method: "GET",
                   dataType: "JSON",
                   url: getLocationUrl,
                   success: function (data) {
                       if(data.status==='0'){
                           window.address = data.result.formatted_address;
                           console.log('ajax获取的地址：'+ window.address );
                       } else {
                           console.log(data);
                           alert("获取位置失败");
                       }
                   },
                   error:function (e) {
                       console.log(e);
                       alert("获取位置失败");
                   }
               }).done(function () {
            self.setState({
                              form: {
                                  ...self.state.form,
                                  ['dz']: window.address,
                                  ['x']: window.x,
                                  ['y']:window.y,
                              },
                              "showModal":false
                          })//, () => console.log("=========="+self.state.form['dz']));
            self.mapStateChange();
            //清空坐标信息
            window.x='0';
            window.y='0';
            window.address='';
        });
    }
    render(){
        let that = this;
        let {itemData, stateChange} = this.props;

        let dzItemData = {
            column: "SECRET",
            column_name: "地址",
            type: "text",
            readOnly:itemData.readOnly
        };
        return (
            <div>
                <FormControl id="weizhi"  name ={this.val()} style ={{maxWidth:"300px"}}//{ ...super.defaultProps()}
                   value={this.val().substring(this.val().lastIndexOf(",")+1)||that.state.form['dz']}
                    //value={stateChange(itemData.column)}
                   // onChange={e => {stateChange(itemData.column,e.target.value === null ? '' :e.target.value);this.trigger("change")}}
                   //  onChange={this.mapStateChange}
                    inline
                />&nbsp;
                <input type="button" value="标注" onKeyPress={e => this.manchangedz = true}
                       className={"btn btn-primary"} onClick={this.show} />
                <Modal bsSize="lg" show={this.state.showModal}   backdrop={'static'} onHide={this.hide}>
                    <Modal.Header  closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{height:"500px",overflow: "hidden!important"}} >
                        <Map
                            className="noToolBar"
                            mapInstance = 'map1'
                            initSource = 'default'
                            onMapInited = {
                                function(map){
                                    console.info(`地图初始化的经度:${that.state.form.initY}纬度：${that.state.form.initX}`);
                                    //定位
                                    var params = {
                                        center: {x: that.state.form.initX,y:that.state.form.initY},
                                        zoom: 16,
                                        isHighLight: true,
                                        symbol: null
                                    };
                                    map.location(params, function (result) {
                                    });
                                    that.state.map = map;
                                    setTimeout(()=>{ that.defaultTag()},1000);
                                }
                            }
                            mapAction = {[
                                {
                                    type: 'showPoint',
                                    data: [],
                                    focus : true,
                                    mouseOver : function(){
                                        console.info("over",123)
                                    },
                                    mouseOut : function(){
                                        console.info("out",123)
                                    },
                                    mouseClick : function(){
                                        console.info("click",123)
                                    },
                                    tip_mouseOver : function(attributes){
                                        return (
                                            `<div class="default">${attributes.name}</div>`
                                        )
                                    },
                                    tip_mouseClick : function(attributes){
                                        return (
                                            `<div class="default">${attributes.name}</div>`
                                        )
                                    },
                                    autoCloseTip : true

                                },
                                {
                                    type: 'showPolygon',
                                    data: {
                                        source : [
                                            {id: 2410,name:"123",yoyoyo:111},
                                            {id: 2607,name:"123",yoyoyo:222},
                                            {id: 2609,name:"123",yoyoyo:333},
                                        ]
                                    },
                                    mouseOver : function(){
                                        console.info("over",123)
                                    },
                                    mouseOut : function(){
                                        console.info("out",123)
                                    },
                                    mouseClick : function(){
                                        console.info("click",123)
                                    },
                                    focus : true,
                                    tip_mouseOver : function(attributes){
                                        return (
                                            `<div class="default">${attributes.name}</div>`
                                        )
                                    },
                                    tip_mouseClick : function(attributes){
                                        return (
                                            `<div class="default">${attributes.name}</div>`
                                        )
                                    },
                                    autoCloseTip : true
                                }
                            ]}
                        />
                       {/* <button onClick={this.mapMark}>标注</button>
                        <button onClick={this.stopMark}>关闭标注功能</button>*/}
                        <ul className="btn-list">
                            <li>
                                <button type="button" className="ui-btn ui-btn-default"  onClick={this.mapMark}>标注</button>
                            </li>
                            <li>
                                <button type="button" className="ui-btn ui-btn-default" onClick={this.stopMark} >关闭标注</button>
                            </li>
                            {/*<li>
                                <button type="button" className="ui-btn ui-btn-default" id="js-goto-save2" style={{display: 'none'}}>保存</button>
                            </li>*/}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.confirmMark}>确认</Button>
                    </Modal.Footer>
                </Modal>

            </div>
      )
    }
}
export default MapComponent;
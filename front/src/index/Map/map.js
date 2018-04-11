/*
 * @(#) map.js
 * 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
 *
 * <br> Copyright:  Copyright (c) 2018
 * <br> Company:厦门畅享信息技术有限公司
 * <br> @author weixl
 * <br> 2018-01-22 11:15:48
 */

import './map.css';

import '@share/map/src/index.scss';
import React from 'react';
import BaseComponent from '@share/scurd/component/BaseComponent';
import Map from '@share/map';
import {
    Select,Modal,Button,FormControl
} from '@share/shareui';
class MapComponent extends BaseComponent {
    constructor(props){
        super(props);
        this.state = {
            "form":{"dz":"","x":"","y":""},
            data : {},
            "showModal":false,
            "markTag":"",
            "showLine":false
        };
        this.mapMark = this.mapMark.bind(this);
        this.stopMark = this.stopMark.bind(this);
        // this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.mapStateChange = this.mapStateChange.bind(this);
        this.showPositionByBaidu = this.showPositionByBaidu.bind(this);
        this.confirmMark = this.confirmMark.bind(this);
        this.addLine = this.addLine.bind(this);
        this.showLine = this.showLine.bind(this);
        this.mapMarkStart = this.mapMarkStart.bind(this);
        this.mapMarkEnd = this.mapMarkEnd.bind(this);
        this.getAddressBySky = this.getAddressBySky.bind(this);
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
    //标注坐标终点
    mapMarkEnd(){
        let {map} = this.state;
        let tag = null;
        //实例化画图工具
        let drawTool = new esri.toolbars.Draw(map.toObject());
        this.state.drawTool = drawTool
       /* drawTool.deactivate();//结束画图工具
        map.tempLayer.point.clear();*/
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
            window.endx = e.geometry.x;
            window.endy = e.geometry.y;
            console.info("终点x坐标"+ window.endx+"终点y坐标"+window.endy);
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
    //标注坐标起点
    mapMarkStart(){
        let {map} = this.state;
        let tag = null;
        //实例化画图工具
        let drawTool = new esri.toolbars.Draw(map.toObject());
        this.state.drawTool = drawTool;
      /*  drawTool.deactivate();//结束画图工具
        map.tempLayer.point.clear();*/
        //激活画点功能
        drawTool.activate(esri.toolbars.Draw.POINT);
        //画图结束事件
        drawTool.on("draw-end", function (e) {
            if (tag !== null) {
                map.tempLayer.point.remove(tag.toJson());
                tag = null
            }
            console.info(e);
            window.startx = e.geometry.x;
            window.starty = e.geometry.y;
            console.info("起始点x坐标"+ window.startx+"起始点y坐标"+ window.starty );
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
        });

    }
    //画线
    addLine(){
        let {map} = this.state;
       /* var infoTemplate = {
            "title": "测试点",
            "content": "标注 123123,<br>地点: 3231123"
        };*/
        // var options = { layerId: "2", opacity: 100, infoTemplate: infoTemplate, renderer: null };
        var options = { layerId: "2", opacity: 100,  renderer: null };
        var tempLayer1 = new SkySeaMap.GraphicsLayer(options);
        map.addLayer(tempLayer1); //把临时图层添加到地图上
        tempLayer1.onClick(function (data) {//要素点击事件
            console.info(data);
        });
        var grgp1 = new SkySeaMap.Graphic(
            {"paths" : [
                [ [window.startx,window.starty], [window.endx,window.endy] ]
            ], "type": "polyline"
            }, {
                "type": "esriSLS",
                "style": "esriSLSLine",
                "color": [37, 165, 206],
                "width": 2
            });
        tempLayer1.add(grgp1);
        //定位
       var params1 = { center: { x:  window.startx, y: window.starty }, zoom:16, isHighLight: true, symbol: null };
        map.location(params1, function (result) {
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
    show(e) {
        let that = this;
        this.setState({
                          "showModal": true,
                          "markTag":e,
                          "showLine":false
                      })
        // setTimeout(()=>{ this.defaultTag()},1000)
    }
    //显示画线
    showLine(){
        this.setState({
                          "showModal": true,
                          "showLine":true
                      })
        setTimeout(()=>{ this.addLine()},1000)
    }
    //默认标注
    defaultTag(){
        let {map} = this.state;
        var infoTemplate = {
            "title": "测试点",
            "content": "标注 123123,<br>地点: 3231123"
        };
        var grgp = new SkySeaMap.Graphic(
            {
                x: 106.47378402023729 , y: 29.41100616951404, type: "point"
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
        //var tempLayer = new SkySeaMap.GraphicsLayer({ layerId: '194887be-caf9-447f-bb43-9cab74b82b79' });
        var options = { layerId: "1", opacity: 100, infoTemplate: infoTemplate, renderer: null };
        var tempLayer = new SkySeaMap.GraphicsLayer(options);
        map.addLayer(tempLayer); //把临时图层添加到地图上
        tempLayer.onClick(function (data) {//要素点击事件
            // alert("被点击了")
            console.info(data);
        });
        tempLayer.add(grgp);
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
       /* if( typeof(window.x) =='undefined'||typeof(window.y) =='undefined'||window.x==='0'||window.y==='0'){
            alert('您没有选中任何地址！')
            return ;
        }*/
         let that = this;
         let x = window.x;
         let y = window.y;
         let res = [x,y];
        this.getAddressBySky(res)
    }
    //监听地图值变化
    mapStateChange()
    {
        let {itemData, stateChange} = this.props;
        let x  = window.x;
        let y = window.y;
        let dz = this.state.form['dz'];
        let rst = [ x, y,dz].join(",");
         // stateChange(itemData.column,rst);
    }
    //通过天海图接口获取地址
    getAddressBySky(res){
        let getLocationUrl = `http://www.tianditu.com/query.shtml?postStr={'lon':${res[0]},'lat':${res[1]},'appkey':8a7b9aac0db21f9dd995e61a14685f05,'ver':1}&type=geocode`;
        $.ajax({
                   method: "GET",
                   dataType: "JSON",
                   url: getLocationUrl,
                   success: function (data) {
                       if(data.status==='0'){
                           window.address = data.result.formatted_address;
                           console.log('ajax获取的地址：'+ window.address );
                       } else {
                           position = "";
                       }
                       if (position == "") {
                           alert("获取位置失败");
                       } else {
                           console.info("position=" + position)
                       }
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
    /**
     * @param x,y 火星坐标系的坐标值
     * 使用百度api把标注地址转为百度详细地址
     */
    accessBaiDuAddr(res) {
        var Gps=this.gcj02_To_Bd09(res[1],res[0]);
        var coords = {};
        coords.latitude = Gps.bd_lat;
        coords.longitude = Gps.bd_lon;
        if (coords) {
            return this.showPositionByBaidu({"coords": coords})
        } else {
            alert("获取当前地址出错啦！请稍后重试！")
        }
    }


    // 圆周率
    /**
     * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 将 GCJ-02 坐标转换成 BD-09 坐标
     *
     * @param gg_lat
     * @param gg_lon
     */
    gcj02_To_Bd09(gg_lat, gg_lon) {
        var pi = 3.14159265358979324;
        var Gps = {};
        var x = gg_lon, y = gg_lat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * pi);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * pi);
        Gps.bd_lon = z * Math.cos(theta) + 0.0065;
        Gps.bd_lat = z * Math.sin(theta) + 0.006;
        return Gps;
    }

//使用百度JS-SDK
    showPositionByBaidu(position) {
        var self =this;
        var coords = position.coords;
        var getLocationUrl = "http://api.map.baidu.com/geocoder/v2/?output=json&ak=xLmfFX84gDQrKVLBdKgGEdq9&" +
                             "location=" + coords.latitude + "," + coords.longitude;
        $.ajax({
                   method: "GET",
                   dataType: "JSONP",
                   url: getLocationUrl,
                   success: function (data) {
                       console.info(JSON.stringify(data))
                       if ('0' == data.status) {
                           var location = data.result.formatted_address;
                           var addressComponent = data.result.sematic_description;
                           console.info(location+addressComponent);
                           window.address = location+addressComponent;
                           console.log('ajax获取的地址：'+ window.address )
                       } else {
                           position = "";
                       }
                       if (position == "") {
                           alert("获取位置失败");
                       } else {
                           console.info("position=" + position)
                       }
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
    };
    render(){
        let that = this;
        let {itemData, stateChange} = this.props;

        return (
            <div>
                <FormControl  style ={{maxWidth:"300px"}}//{ ...super.defaultProps()}

                    //value={stateChange(itemData.column)}
                   // onChange={e => {stateChange(itemData.column,e.target.value === null ? '' :e.target.value);this.trigger("change")}}
                onChange={this.mapStateChange}
                    inline
                />&nbsp;
                <input type="button" value="标注起点"
                       className={"btn btn-primary"} onClick={() => this.show("start")} />&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="button" value="标注终点"
                       className={"btn btn-primary"} onClick={() => this.show("end")} />&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="button" value="预览"
                       className={"btn btn-primary"} onClick={this.showLine} />

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FormControl  style ={{maxWidth:"300px"}}//{ ...super.defaultProps()}
                              onChange={this.mapStateChange}
                              inline
                />&nbsp;&nbsp;
                <input type="button" value="校验"
                       className={"btn btn-primary"} onClick={() => this.show("start")} />&nbsp;&nbsp;&nbsp;&nbsp;
                <FormControl  style ={{maxWidth:"300px"}}//{ ...super.defaultProps()}
                              onChange={this.mapStateChange}
                              inline
                />&nbsp;&nbsp;
                <FormControl  style ={{maxWidth:"300px"}}//{ ...super.defaultProps()}
                              onChange={this.mapStateChange}
                              inline
                />&nbsp;&nbsp;
                <Modal bsSize="lg" show={this.state.showModal}   backdrop={'static'} onHide={this.hide}>
                    <Modal.Header  closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{height:"500px",overflow: "hidden!important"}} >
                        <Map
                            className="noToolBar"
                            mapInstance = 'map1'
                            initSource = 'fromsys'
                            onMapInited = {
                                function(map){
                                    console.info("mapmapmap",map);
                                    that.state.map = map;
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
                                <button type="button" className="ui-btn ui-btn-default"  onClick={this.state.markTag==='start'?this.mapMarkStart:this.mapMarkEnd}>标注</button>
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
                        <Button onClick={this.state.showLine===true?this.hide:this.confirmMark}>确认</Button>
                    </Modal.Footer>
                </Modal>

            </div>
      )
    }
}
export default MapComponent;
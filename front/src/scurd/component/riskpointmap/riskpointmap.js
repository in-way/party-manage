/*
 * @(#) map.js
 * 版权声明 厦门畅享信息技术有限公司, 版权所有 违者必究
 *
 * <br> Copyright:  Copyright (c) 2018
 * <br> Company:厦门畅享信息技术有限公司
 * <br> @author weixl
 * <br> 2018-01-23 11:44:21
 */

import '../map/map.css';
import '@share/map/src/index.scss';
import React from 'react';
import BaseComponent from '@share/scurd/component/BaseComponent';
import Map from '@share/map';
import {UrlUtils} from "@share/scurd/block/Utils";
import {
    Select, Modal, Button, FormControl
} from '@share/shareui';
import {getCoordinate} from '../../../public/public'
/**
 * 天地图获取详细地址配置项
 * @type {{url: string, key: string}}
 */
const config = {
    url:window.location.host.indexOf('172.') == -1 ? "http://23.140.1.6:7009/query.shtml" : "http://www.tianditu.com/query.shtml" ,
    key: "8a7b9aac0db21f9dd995e61a14685f05"
}

class RiskMapComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            "form": {"startdz": "", "enddz": "", "startx": "", "starty": "", "endx": "", "endy": "","initX":106.4735393611908,"initY":29.434929977493283},
            data: {},
            "showModal": false,
            "markTag": "",
            "showLine": false
        };
        this.stopMark = this.stopMark.bind(this);
        this.hide = this.hide.bind(this);
        this.mapStateChange = this.mapStateChange.bind(this);
        this.confirmMark = this.confirmMark.bind(this);
        this.addLine = this.addLine.bind(this);
        this.showLine = this.showLine.bind(this);
        this.mapMarkStart = this.mapMarkStart.bind(this);
        this.mapMarkEnd = this.mapMarkEnd.bind(this);
        this.defaultTag = this.defaultTag.bind(this);
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
    componentDidMount() {

    }

    //关闭标注功能
    stopMark() {
        let {map} = this.state;
        let {drawTool} = this.state;
        drawTool.deactivate();
        //清除坐标
        map.tempLayer.point.clear();
    }

    //默认标注
    defaultTag() {
        let {map} = this.state;
        let x = '';
        let y = '';
        let weizhi = document.getElementById("start").name;
        let flag = true;
        if (this.state.markTag === 'end') {
            flag = false;
        }
        if (weizhi && weizhi.split(",").length == 6) {
            let zuobiao = weizhi.split(",");
            if (flag) {
                x = zuobiao[0];
                y = zuobiao[1];
                window.startx = x;
                window.starty = y
            } else {
                x = zuobiao[3];
                y = zuobiao[4];
                window.endx = x;
                window.endy = y;
            }

        }
        var grgp = new SkySeaMap.Graphic(
            {
                x: x, y: y, type: "point"
            }, {
                "type": "esriPMS",
                "url": require("./point.png"),
                "contentType": "image/png",
                "width": 19.5,
                "height": 19.5,
                "angle": 0,
                "xoffset": 0,
                "yoffset": 0
            });
        map.tempLayer.point.add(grgp);
    }

    //标注坐标起点
    mapMarkStart() {
        let {map} = this.state;
        let tag = null;
        //实例化画图工具
        let drawTool = new esri.toolbars.Draw(map.toObject());
        this.state.drawTool = drawTool
        //激活画点功能
        drawTool.activate(esri.toolbars.Draw.POINT);
        //清除之前的标注
        map.tempLayer.point.clear();
        //画图结束事件
        drawTool.on("draw-end", function (e) {
            if (tag !== null) {
                map.tempLayer.point.remove(tag.toJson());
                tag = null
            }
            console.info(e);
            window.startx = e.geometry.x;
            window.starty = e.geometry.y;
            console.info("起始点x坐标" + window.startx + "起始点y坐标" + window.starty);
            // console.info(e.geometry.x);
            let grap = new SkySeaMap.Graphic();
            grap.setGeometry(e.geometry);//设置几何
            grap.setSymbol({
                               "type": "esriPMS",
                               "url": require("./point.png"),
                               "contentType": "image/png",
                               "width": 19.5,
                               "height": 19.5,
                               "angle": 0,
                               "xoffset": 0,
                               "yoffset": 0
                           });//设置样式

            map.tempLayer.point.add(grap);
            tag = grap
        });
    }

    //标注坐标终点
    mapMarkEnd() {
        let {map} = this.state;
        let tag = null;
        //实例化画图工具
        let drawTool = new esri.toolbars.Draw(map.toObject());
        this.state.drawTool = drawTool
        drawTool.deactivate();//结束画图工具
        //清除之前的标注
        map.tempLayer.point.clear();
        //激活画点功能
        drawTool.activate(esri.toolbars.Draw.POINT);
        //画图结束事件
        drawTool.on("draw-end", function (e) {
            if (tag !== null) {
                map.tempLayer.point.remove(tag.toJson());
                tag = null
            }
            console.info(e);
            window.endx = e.geometry.x;
            window.endy = e.geometry.y;
            console.info("终点x坐标" + window.endx + "终点y坐标" + window.endy);
            // console.info(e.geometry.x);
            let grap = new SkySeaMap.Graphic();
            grap.setGeometry(e.geometry);//设置几何
            grap.setSymbol({
                               "type": "esriPMS",
                               "url": require("./point.png"),
                               "contentType": "image/png",
                               "width": 19.5,
                               "height": 19.5,
                               "angle": 0,
                               "xoffset": 0,
                               "yoffset": 0
                           });//设置样式

            map.tempLayer.point.add(grap);
            tag = grap
        });

    }

    //画线
    addLine() {
        let {map} = this.state;
        let weizhi = document.getElementById("start").name;
        //线条初始化，修改的时候显示
        if (weizhi && weizhi.split(",").length == 6) {
            let zuobiao = weizhi.split(",");
            window.startx = zuobiao[0];
            window.starty = zuobiao[1];
            window.endx = zuobiao[3];
            window.endy = zuobiao[4];
        }
        var options = {layerId: "2", opacity: 100, renderer: null};
        var tempLayer1 = new SkySeaMap.GraphicsLayer(options);
        map.addLayer(tempLayer1); //把临时图层添加到地图上
        tempLayer1.onClick(function (data) {//要素点击事件
            console.info(data);
        });
        //开始点坐标样式
        var startgrgp = new SkySeaMap.Graphic(
            {
                x: window.startx, y: window.starty, type: "point"
            }, {
                "type": "esriPMS",
                "url": require("./point.png"),
                "contentType": "image/png",
                "width": 19.5,
                "height": 19.5,
                "angle": 0,
                "xoffset": 0,
                "yoffset": 0
            });
        //结束点坐标样式
        var endgrgp = new SkySeaMap.Graphic(
            {
                x: window.endx, y: window.endy, type: "point"
            }, {
                "type": "esriPMS",
                "url": require("./point.png"),
                "contentType": "image/png",
                "width": 19.5,
                "height": 19.5,
                "angle": 0,
                "xoffset": 0,
                "yoffset": 0
            });
        //线条样式
        var grgp1 = new SkySeaMap.Graphic(
            {
                "paths": [
                    [[window.startx, window.starty], [window.endx, window.endy]]
                ], "type": "polyline"
            }, {
                "type": "esriSLS",
                "style": "esriSLSLine",
                "color": [37, 165, 206],
                "width": 2
            });
        //添加线条
        tempLayer1.add(grgp1);
        //添加开始点
        tempLayer1.add(startgrgp);
        //添加结束点
        tempLayer1.add(endgrgp);
        //定位
        var params1 = {center: {x: window.startx, y: window.starty}, zoom: 12, isHighLight: true, symbol: null};
        map.location(params1, function (result) {
        });
    }

    //显示地图模态框
    show(e) {
        let that = this;
        let weizhi = document.getElementById("start").name;
        if (weizhi && weizhi.split(",").length == 6) {
            let zuobiao = weizhi.split(",");
            window.startx = zuobiao[0];
            window.starty = zuobiao[1];
            window.startaddress = zuobiao[2];
            window.endx = zuobiao[3];
            window.endy = zuobiao[4];
            window.endaddress = zuobiao[5];
        }
        if (e === 'end' && (window.startx === '' || typeof (window.startx) === 'undefined')) {
            alert("请先选择起点！")
            return;
        }
        this.setState({
                          "showModal": true,
                          "markTag": e,
                          "showLine": false
                      })
        // setTimeout(()=>{ this.defaultTag()},1000)
    }

    //显示画线
    showLine() {
        let weizhi = document.getElementById("start").name;
        //线条初始化，修改的时候显示
        if (weizhi && weizhi.split(",").length == 6) {
            let zuobiao = weizhi.split(",");
            window.startx = zuobiao[0];
            window.starty = zuobiao[1];
            window.endx = zuobiao[3];
            window.endy = zuobiao[4];
        }
        if (typeof(window.startx) == 'undefined' || window.startx == '') {
            alert("请选择起点坐标");
            return;
        }
        if (typeof(window.endx) == 'undefined' || window.endx == '') {
            alert("请选择终点坐标");
            return;
        }
        this.setState({
                          "showModal": true,
                          "showLine": true
                      })
        setTimeout(() => {
            this.addLine()
        }, 2000)

    }

    //隐藏地图模态框
    hide() {
        this.setState({
                          "showModal": false,
                          "showLine": false
                      })
    }

    //确认坐标点
    confirmMark(e) {
        e.preventDefault();
        let that = this;
        let x = '';
        let y = '';
        if (that.state.markTag === 'start') {
            if (typeof(window.startx) == 'undefined' || typeof(window.starty) == 'undefined' || window.startx === '' || window.starty
                                                                                                                        === '') {
                alert('您没有选中任何地址！')
                return;
            }
            x = window.startx;
            y = window.starty;
        } else if (that.state.markTag === 'end') {
            if (typeof(window.endx) == 'undefined' || typeof(window.endy) == 'undefined' || window.endx === '' || window.endy === '') {
                alert('您没有选中任何地址！')
                return;
            }
            x = window.endx;
            y = window.endy;
        }
        let res = [x, y];
        this.getAddressBySky(res);
    }

    //监听地图值变化
    mapStateChange() {
        let {itemData, stateChange} = this.props;
        let startx = window.startx;
        let starty = window.starty;
        let startaddress = window.startaddress;
        let endx = window.endx;
        let endy = window.endy;
        let endaddress = window.endaddress;
        // let dz = this.state.form['dz'];
        let rst = [startx, starty, startaddress, endx, endy, endaddress].join(",");
        stateChange(itemData.column, rst);
    }

    //通过天地图获取地址
    getAddressBySky(res) {
        var self = this;
        let getLocationUrl = `${config.url}?postStr={'lon':${res[0]},'lat':${res[1]},'appkey':${config.key},'ver':1}&type=geocode`;
        console.log('获取详情位置的url:' + getLocationUrl);
        $.ajax({
                   method: "GET",
                   dataType: "JSON",
                   url: getLocationUrl,
                   success: function (data) {
                       if (data.status === '0') {
                           var address = data.result.formatted_address;
                           self.state.markTag === 'start' ? window.startaddress = address : window.endaddress = address
                           console.log('ajax获取的地址：' + window.address);
                       } else {
                           alert("获取位置失败");
                       }
                   },
                   error: function (e) {
                       console.log(e);
                       alert("获取位置失败");
                   }
               }).done(function () {
            self.setState({
                              form: {
                                  ...self.state.form,
                                  ['startdz']: window.startaddress,
                                  ['enddz']: window.endaddress,
                                  ['startx']: window.startx,
                                  ['starty']: window.starty,
                                  ['endx']: window.endx,
                                  ['endy']: window.endy,
                              },
                              "showModal": false
                          })//, () => console.log("=========="+self.state.form['dz']));
            self.mapStateChange();
        });
    };

    render() {
        let that = this;
        let {itemData, stateChange} = this.props;
        let {type, ext, val, search_type, readOnly, column, style} = itemData;
        let onlyRead = readOnly === true ? true : false;
        let showTag = that.state.showLine === true ? showTag = 'none' : showTag = 'block';
        let dzItemData = {
            column: "SECRET",
            column_name: "地址",
            type: "text",
            readOnly: itemData.readOnly
        };
        return (
            <div>
                <FormControl id="start" name={this.val()} style={{maxWidth: "300px"}}
                             value={this.val().split(',')[2]}
                             inline
                             disabled={ onlyRead}
                />&nbsp;&nbsp;
                <input type="button" value={onlyRead == true ? "起点" : "标注起点"}
                       className={"btn btn-primary"} onClick={() => this.show("start")}/>&nbsp;&nbsp;
                <FormControl id="end" name={this.val()} style={{maxWidth: "300px"}}//{ ...super.defaultProps()}
                             value={this.val().split(',')[5]}
                             inline
                             disabled={ onlyRead}
                />&nbsp;&nbsp;
                <input type="button" value={onlyRead == true ? "终点" : "标注终点"}
                       className={"btn btn-primary"} onClick={() => this.show("end")}/>&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="button" value="预览"
                       className={"btn btn-primary"} onClick={this.showLine}/>
                <Modal bsSize="lg" show={this.state.showModal} backdrop={'static'} onHide={this.hide}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{height: "500px", overflow: "hidden!important"}}>
                        <Map
                            className="noToolBar"
                            mapInstance='map1'
                            initSource='default'
                            onMapInited={
                                function (map) {
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
                                    setTimeout(() => {
                                        that.defaultTag()
                                    }, 1000);

                                }
                            }
                            mapAction={[
                                {
                                    type: 'showPoint',
                                    data: [],
                                    focus: true,
                                    mouseOver: function () {
                                        console.info("over", 123)
                                    },
                                    mouseOut: function () {
                                        console.info("out", 123)
                                    },
                                    mouseClick: function () {
                                        console.info("click", 123)
                                    },
                                    tip_mouseOver: function (attributes) {
                                        return (
                                            `<div class="default">${attributes.name}</div>`
                                        )
                                    },
                                    tip_mouseClick: function (attributes) {
                                        return (
                                            `<div class="default">${attributes.name}</div>`
                                        )
                                    },
                                    autoCloseTip: true

                                },
                                {
                                    type: 'showPolygon',
                                    data: {
                                        source: [
                                            {id: 2410, name: "123", yoyoyo: 111},
                                            {id: 2607, name: "123", yoyoyo: 222},
                                            {id: 2609, name: "123", yoyoyo: 333},
                                        ]
                                    },
                                    mouseOver: function () {
                                        console.info("over", 123)
                                    },
                                    mouseOut: function () {
                                        console.info("out", 123)
                                    },
                                    mouseClick: function () {
                                        console.info("click", 123)
                                    },
                                    focus: true,
                                    tip_mouseOver: function (attributes) {
                                        return (
                                            `<div class="default">${attributes.name}</div>`
                                        )
                                    },
                                    tip_mouseClick: function (attributes) {
                                        return (
                                            `<div class="default">${attributes.name}</div>`
                                        )
                                    },
                                    autoCloseTip: true
                                }
                            ]}
                        />
                        <ul style={{display: showTag}} className="btn-list">
                            <li>
                                <button type="button" className="ui-btn ui-btn-default"
                                        onClick={this.state.markTag === 'start' ? this.mapMarkStart : this.mapMarkEnd}>标注
                                </button>
                            </li>
                            <li>
                                <button type="button" className="ui-btn ui-btn-default" onClick={this.stopMark}>关闭标注</button>
                            </li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.state.showLine === true ? this.hide : this.confirmMark}>确认</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}
export default RiskMapComponent;
/**
 *  * Created by liaoyf on 2017/11/1 0001.
 */
import React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Bundle from '@share/bundle';
import loadQrCode from 'bundle-loader?lazy&name=js/QrCode!./QrCode/QrCode';
import loadTrkCode from 'bundle-loader?lazy&name=js/TrkCode!./TrkCode/TrkCode';
import loadXldCode from 'bundle-loader?lazy&name=js/XldCode!./XldCode/XldCode';
import loadSdbCode from 'bundle-loader?lazy&name=js/SdbCode!./SdbCode/SdbCode';
let QrCode =()=>(
    <Bundle load={loadQrCode}>
        {QrCode => <QrCode/>}
    </Bundle>
);
let TrkCode =()=>(
    <Bundle load={loadTrkCode}>
        {TrkCode => <TrkCode/>}
    </Bundle>
);
let XldCode =()=>(
    <Bundle load={loadXldCode}>
        {XldCode => <XldCode/>}
    </Bundle>
);
let SdbCode =()=>(
    <Bundle load={loadSdbCode}>
        {SdbCode => <SdbCode/>}
    </Bundle>
);
class Container extends React.Component{
    render(){
        return (
            <Router>
                <Switch>
                    <Route path="/qrCode/:facilityId" component={QrCode}/>
                    <Route path="/trkCode/:idCard" component={TrkCode}/>
                    <Route path="/xldCode/:pointId" component={XldCode}/>
                    <Route path="/sdbCode/:xsId" component={SdbCode}/>
                </Switch>
            </Router>
        );
    }
}

export default Container;
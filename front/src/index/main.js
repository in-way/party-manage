//样式
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '@share/shareui-html';
import '@share/shareui-font/dist/style.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from './router';

//如果用EOS请去掉下一行注释
// import '../static/lib/eos3/eos3.min';
// 如有用EOS请移除下面一行注释
// eos.rewriteUrl(CONTEXT_PATH + '/remote');

const render = Component => {
    ReactDOM.render(
        <Component />,
        document.getElementById('root')
    );
};

render(Container);

if (module.hot) {
    module.hot.accept('./router.js', () => {
        const NextRootContainer = require('./router').default;
        render(NextRootContainer);
    });
}
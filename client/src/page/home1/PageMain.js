require("babel-polyfill")
import React, {Component} from 'react';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {syncHistoryWithStore, ConnectedRouter} from 'react-router-redux'
import createMemoryHistory from 'history/createMemoryHistory'
import createBrowserHistory from 'history/createHashHistory'
import defaultStoreState from "./store/defaultStoreState";
import routeDom from "./route/route"
require("../../global/utils/polyfill");
//引用全局资源
var g = require("../../res/global.scss");

var tempHistory;
if (process.browser) {
    tempHistory = createBrowserHistory;
} else {
    tempHistory = createMemoryHistory;
}

const history = tempHistory();
const store = configureStore(defaultStoreState, history);
// const history = syncHistoryWithStore(browserHistory, store)
//<DevTools/>

class APP extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

    }

    render() {
        return <Provider store={store}>
            <ConnectedRouter history={history}>
                {routeDom}
            </ConnectedRouter>
        </Provider>
    }
}
export default APP;

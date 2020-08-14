import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import asyncComponent from '@/utils/AsyncComponent';

import HomePage from '@/views/home/HomePage';

const record = asyncComponent(() => import("@/views/record/Record"));

const helpCenter = asyncComponent(() => import("@/views/helpCenter/HelpCenter"));

const production = asyncComponent(() => import("@/views/production/Production"));

const balance = asyncComponent(() => import("@/views/balance/Balance"));

// react-router4不推荐将所有路由规则放在同一地点之集中式路由,子路由应由超组件动态配置,组件在哪匹配就在哪渲染,更加灵活
export default class RouteConfig extends Component {
    render() {
        return (
    <HashRouter>
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/production" exact component={production} />

            <Route path="/record" exact component={record} />
			<Route path="/helpCenter" exact component={helpCenter} />
			<Route path="/balance" exact component={balance} />

            <Redirect to="/" />
        </Switch>
    </HashRouter>
        );
    }
}
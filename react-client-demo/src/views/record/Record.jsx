import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';

import './Record.less';

import PublicHeader from '@/components/header/PublicHeader';
import RecordList from './components/RecordList';

/**
 * This class describes a record.
 *
 * @class      Record (name)
 */
class Record extends Component {
    state = {
        flagBarPos: '17%'
    }

    /**
     * Sets the flag bar position.设置头部与底部标签位置
     *
     * @param      {<type>}  type    The type
     */
    setFlagBarPos = type => {
        let flagBarPos;

        console.dir(type);
        switch (type) {
            case 'passed':
                flagBarPos = '17%';
                break;
            case 'audited': //已审核
                flagBarPos = '50%';
                break;
            case 'failed':
                flagBarPos = '83%';
                break;
            default:
                flagBarPos = '50%';

        }
        this.setState({ flagBarPos });
    }

    // \\\\\\\\\\\\\\

    constructor(props) {
        super(props);
        console.dir(this);
    }

    componentWillReceiveProps(nextProps) {
        // 属性变化时设置头部And底部标签位置
        let currentType = this.props.location.pathname.split('/')[2];
        let type = nextProps.location.pathname.split('/')[2];
        if (currentType !== type) {
            this.setFlagBarPos(type);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }

    componentWillMount() {
        // 初始化设置头部And底部标签设置
        let type = this.props.location.pathname.split('/')[2];
        this.setFlagBarPos(type);
    }

    // \\\\\\\\\\\\\\\\\\\\\

    render() {
        return (
            <main className="common-con-top">
        <PublicHeader title="记录" />
        <section className="record-nav-con">
            <nav className="record-nav">
                <NavLink to={`${this.props.match.path}/passed`} className="nav-link">已通过</NavLink>
                <NavLink to={`${this.props.match.path}/audited`} className="nav-link">待审核</NavLink>
                <NavLink to={`${this.props.match.path}/failed`} className="nav-link">未通过</NavLink>
            </nav>
            <i className="nav-flag-bar" style={{left:this.state.flagBarPos}}></i>
        </section>

        {/*子路由在父级配置，react-router4新特性，更加灵活*/}
        <Switch>
            <Route path={`${this.props.match.path}/:type`} component={RecordList} />
            <Redirect from={`${this.props.match.path}`} to={`${this.props.match.path}/passed`} exact component={RecordList} />
        </Switch>
    </main>
        );
    }

}

export default Record;
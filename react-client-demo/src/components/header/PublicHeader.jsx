import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './PublicHeader.less';

export default class PublicHeader extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    };

    componentDidMount() {
        console.log('PublicHeader Component DID MOUNT!');
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }

    // \\\\\\\\\\\\\\\\\\\

    static propTypes = {
        record: PropTypes.any,
        title: PropTypes.string.isRequired,
        confirm: PropTypes.any
    };

    state = {
        author: 'all-star-k',
        navState: false //是否显示导航栏
    };

    /**
     * 切换左侧导航栏状态
     */
    toggleNav = () => {
        this.setState({ navState: !this.state.navState })
    };

    render() {
        return (
            <header className="header-container">
            <span className="header-slide-icon icon-catalog" onClick={this.toggleNav}></span>
            <span className="header-title">{this.props.title}</span>

            {
                this.props.record && <NavLink to="/record" exact className="header-link"></NavLink>
            }

            {
                this.props.confirm && <NavLink to="/" exact className="header-link header-link-confirm"></NavLink>
            }

            {/*<span></span>*/}
        <ReactCSSTransitionGroup
                component={this.FirstChild}
                transitionName="nav"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
        {
        this.state.navState  && <aside key='nav-slide' className="nav-slide"
        onClick="{this.toggleNav}">

        <NavLink to="/record" exact className="header-link home_page_link_tag"> 首页 </NavLink>
        <NavLink to="/balance" exact className="header-link balance_link_tag"> 提现 </NavLink>
        <NavLink to="/helpCenter" exact className="header-link help_center_link_tag"> 帮助中心 </NavLink>
        </aside>
        }

        </ReactCSSTransitionGroup>
        </header>
        );
    }
}
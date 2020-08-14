import React, { Component } from 'react';
import { is, fromJS } from 'immutable';

import PublicHeader from '@/components/header/PublicHeader';

import './HelpCenter.less';

/**
 * This class describes a help center.
 *
 * @class      HelpCenter (name)
 */
export default class HelpCenter extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }

    // \\\\\\\\\\\\\\\\

    render() {
        return (
    <main>
        <PublicHeader title="帮助中心" record />
        <article className="context-con">
            <h2>简介</h2>
            <p>技术要点:</p>
            <p>react</p>
            <p>redux</p>
            <p>webpack</p>
            <p>react-router</p>
            <p>ES 6/7/8</p>
            <p>code split</p>
            <p>hot loader</p>
            <p>axios</p>
            <p>less</p>
            <p>immutable</p>
            <p>项目地址 <a href="https://github.com/"> github </a></p>
        </article>
    </main>
        );
    }
}
import React, { Component } from 'react';

import './NavigationListTest.css';

/**
 * This class describes a navigation list test.
 *
 * @class      NavigationListTest (name)
 */
export default class NavigationListTest extends Component {
    constructor(props) {
        super(props);
        console.info("NavigationListTest.constructor...");
        console.log(this);
    };

    componentDidMount() {
        console.log('NavigationListTest Component DID MOUNT!');
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\\

    state = {
        author: 'AllStarGH',
        buildTool: "webpack",
        addressText: '跃迁',
        addressTitle: 'Next One Page',
        localHtmlAddress: 'https://gitee.com/yuanjingpeng',
    };

    // \\\\\\\\\\\\\\\\\\\\\\\\\\

    render() {
        return (
            <div className="list_div_1">
        <ul>
            <li>作者:{this.state.author}</li>
            <li>自动化构建工具:{this.state.buildTool}</li>
            <li> <a id="address_1" href={this.state.localHtmlAddress} title={this.state.addressTitle}> {this.state.addressText} </a> </li>
        	{/*传入props*/}
            <li>{this.props.message}</li>
        </ul>
    </div>
        );
    }
}
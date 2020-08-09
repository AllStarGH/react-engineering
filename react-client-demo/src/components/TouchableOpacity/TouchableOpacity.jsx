import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { is, fromJS } from 'immutable';

/**
 * This class describes a touchable opacity.
 * 点击状态组件
 *
 * @class      TouchableOpacity (name)
 */
export default class TouchableOpacity extends Component {
    constructor(props) {
        console.info('...TouchableOpacity...')
        console.log(this.props);
        console.log(this.state);
    };

    componentDidMount() {
        console.log('TouchableOpacity Component DID MOUNT!')
        console.log(this);
    }

    componentWillUnmount() {
        console.log('TouchableOpacity Component WILL UNMOUNT!')
    }

    // \\\\\\\\\\\\\\\\\\\\\\

    static propTypes = {
        clickCallBack: PropTypes.func,
        text: PropTypes.string,
        className: PropTypes.string
    }

    handleTouchStart = () => {
        this.refs.btn.style.opacity = '0.3';
    }

    handleTouchEnd = () => {
        this.refs.btn.style.opacity = '1';
        this.props.clickCallBack();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    render() {
        return (
            <div className={`btn-con ${this.props.className}`}           onTouchStart={this.handleTouchStart} 	           onTouchEnd={this.handleTouchEnd}
                 ref='btn'>
        			{this.props.text||'确认'}
        	</div>
        );
    }
}
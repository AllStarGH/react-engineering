import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { is, fromJS } from 'immutable';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';

import './Alert.less';

export default class Alert extends Component {
    constructor(props) {
        super(props);
        console.log(this);
    }

    componentDidMount() {
        console.log('Alert Component DID MOUNT!')
        console.log(this);
    }

    componentWillUnmount() {
        console.log('Alert Component WILL UNMOUNT!')
    }

    // \\\\\\\\\\\\\\\\\\\\\\

    static propTypes = {
        closeAlert: PropTypes.func.isRequired,
        alertTip: PropTypes.string.isRequired,
        alertStatus: PropTypes.bool.isRequired
    }

    // css动画组件设置为目标组件
    First = props => {
        const childrenArray = React.Childen.toArray(props.children);
        console.log(childrenArray);
        return childrenArray[0] || null;
    }

    //关闭弹窗
    confirm = () => {
        this.props.closeAlert()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }

    // \\\\\\\\\\\\\\\\\\\\\\\\

    render() {
        return (
            <ReactCSSTransitionGroup
                component={this.FirstChild}
                transitionName="alert"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
		{
    		this.props.alertStatus && <div className="alert-con">
				<div className="alert-context">
					<div className="alert-context-detail">
						{this.props.alertTip}
					</div>
				<TouchableOpacity className="confirm-btn" clickCallBack={this.confirm} />

				</div>
    		</div>
		}
        </ReactCSSTransitionGroup>
        );

    }
}
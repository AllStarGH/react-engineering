import React, { Component } from 'react';
import { is, fromJS } from 'immutable';

import PublicHeader from '@/components/header/PublicHeader';

import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';

import PublicAlert from '@/component/alert/PublicAlert';

import api from '@/api/api';

import './Balance.less';

// Broke Rage:暴怒
class BrokeRage extends Component {
    state = {
        // 输入值
        applyNum: '',

        // 弹框状态
        alertStatus: false,

        // 弹框提示文字
        alertTip: '',

        // 可提现额度
        balance: {
            balance: 0
        }
    }


    /**
     * Initializes the data.初始化数据
     */
    initData = async () => {
        try {
            let result = await api.getBalance()
            console.dir(result)

            this.setState({ balance: result });
        } catch (err) {
            console.error(err)
        }

    }

    /**
     * 格式化输入数据,格式为微信红包格式,最大200.00
     * event:事件对象
     *
     * @param      {<type>}  event   The event
     */
    handleInput = event => {
        console.dir(event);
        let value = event.target.value;
        if ((/^\d*?\.?\d{0,2}?$/gi).test(value)) {
            if ((/^0+[1-9]+/).test(value)) {
                value = value.replace(/^0+/, '');
            }

            if ((/^0{2}\./).test(value)) {
                value = value.replace(/^0+/, '0');
            }

            value = value.replace(/^\./gi, '0.');

            if (parseFloat(value) > 200) {
                value = '200.00';
            }
            this.setState({ applyNum: value })
        }
    }


    /**
     * 提交判断条件
     */
    submitForm = () => {
        let alertTip;
        if (!this.state.applyNum) {
            alertTip = '请输入提现金额';
        } else if (parseFloat(this.state.applyNum) > this.state.balance.balance) {
            alertTip = '申请提现金额不可大于余额';
        } else {
            alertTip = '申请提现成功';
        }

        this.setState({
            alertStatus: true,
            alertTip,
            applyNum: ''
        })
    }

    /**
     * Closes an alert.关闭弹窗
     */
    closeAlert = () => {
        this.setState({
            alertStatus: false,
            alertTip: ''
        })
    }

    // \\\\\\\\\\\\\\\\\\

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }

    componentDidMount() {
        this.initData();
    }

    constructor() {
        console.dir(this);
    }

    // \\\\\\\\\\\\\\\\\

    render() {
        return (
            <main>
        <PublicHeader title='体现' record />
        <selection className="broke-main-content">
            <p className="broke-header">您的可提现额度为: ¥ {this.state.balance.balance} </p>
            <form className="broke-form">
                <p>请输入体现金额(圆)</p>
                <p> ¥ <input type="text" value={this.state.applyNum} placeholder="0.00" onInput={this.handleInput} maxLength="5">
                </p>
            </form>
            <TouchableOpacity className="submit-con" clickCallBack={this.submitForm} text="申请提现" />
        </selection>
        <PublicAlert closeAlert={this.closeAlert} alertTip={this.state.alertTip} alertStatus={this.state.alertStatus} />
    </main>
        );
    }

}

export default BrokeRage;
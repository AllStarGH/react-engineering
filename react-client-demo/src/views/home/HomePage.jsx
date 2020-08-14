import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import PropTypes from 'prop-types';


import Api from '@/api/api';
import envConfig from '@/envConfig/envConfig';
import { clearSelected } from '@/store/production/Action';
import { saveFormData, saveImg, clearData } from '@/store/home/Action';


import PublicHeader from '@/components/header/PublicHeader';
import Alert from '@/components/alert/Alert';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';

import mixin, { filledStr } from '@/utils/mixin';

import './HomePage.less';

@mixin({ filledStr })
class HomePage extends Component {
    constructor(props) {
        super(props);
        console.dir(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!is(fromJS(this.props.prodData), fromJS(nextProps.prodData))) {
            this.initData(nextProps);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }

    componentWillMount() {
        console.dir(this.props);
        this.initData(this.props);
    }

    // \\\\\\\\\\\\\\\\\\\\\\

    static propType = {
        formData: PropTypes.object.isRequired,
        saveFormData: PropTypes.func.isRequired,
        saveImg: PropTypes.func.isRequired,
        clearData: PropTypes.func.isRequired,
        clearSelected: PropTypes.func.isRequired,
    }

    state = {
        // 弹框状态
        alertStatus: false,
        //弹框提示文字
        alertTip: "",
    }

    //已选择的商品数据
    selectedProdList = [];

    /**
     * 将表单数据保存至redux,保留状态
     *
     * type  数据类型 orderNum||name||mobile
     * event 事件对象
     *
     * @param      {<type>}  type    The type
     * @param      {<type>}  event   The event
     */
    handleInput = (type, event) => {
        console.dir(event);
        console.info(type);
        let value = event.target.value;
        switch (type) {
            case 'orderNum':
                value = value.replace(/\D/g, "");
                break;

            case 'name':
                break;

            case 'mobile':
                value = this.filledStr(value.replace(/\D/g, ""), [3, 7], " ", event.target);
                break;

            default:
                ;
        }
        console.log(value);
        this.props.saveFormData(value, type);
    }

    // 上传图片,并将图片地址存至redux,保留状态
    uploadImg = async event => {
        try {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);

            let result = await Api.uploadImg({ data: formData });
            this.props.saveImg(envConfig.imgUrl + result.image_path);

            console.log(result);
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * 提交表单
     */
    submitForm = () => {
        console.log(this);
        const { orderSum, name, mobile } = this.props.formData;
        let alertTip = "";
        if (!orderSum.toString().length) {
            alertTip = "请填写金额";
        } else if (!name.toString().length) {
            alertTip = "请填写姓名";
        } else if (!mobile.toString().length) {
            alertTip = "请填写正确的手机号码";
        } else {
            alertTip = "添加数据成功";
            this.props.clearSelected();
            this.props.clearData();
        }

        this.setState({
            alertStatus: true,
            alertTip
        })
    }

    /**
     * Closes an alert.关闭弹窗
     */
    closeAlert = () => {
        this.setState({
            alertStatus: false,
            alertTip: ""
        })
    }

    /**
     * Initializes the data. 初始化数据,获取已选择的商品
     *
     * @param      {<type>}  props   The properties
     */
    initData = props => {
        this.selectedProdList = [];
        props.prodData.dataList.forEach(item => {
            if (item.selectStatus && item.selectNum) {
                console.log(item);
                this.selectedProdList.push(item);
            }
        })
        console.dir(this.selectedProdList);
    }

    // \\\\\\\\\\\\\\\\

    render() {
        return (
            <main className="home-container">
        <PublicHeader title='首页' record />
        <p className="common-title">请录入您的信息</p>
        <form className="home-form">
            <div className="home-form-item">
                <span>销售金额:</span>
                <input type="text" placeholder="请输入订单金额" value={this.props.formData.orderSum} onChange={this.handleInput.bind(this,'orderSum')} />
            </div>
            <div className="home-form-item">
                <span>客户姓名:</span>
                <input type="text" placeholder="请输入客户姓名" value={this.props.formData.name} onChange={this.handleInput.bind(this,'name')} />
            </div>
            <div className="home-form-item">
                <span>客户电话:</span>
                <input type="text" placeholder="请输入客户电话" value={this.props.formData.mobile} onChange={this.handleInput.bind(this,'mobile')} />
            </div>
        </form>
        <div>
            <p className="common-title">请选择销售的商品</p>
            <Link to="/production" className="common-select-btn">
            {
            this.selectedProdList.length ? <ul className="select-prod-list">
                {
                this.selectedProdList.map((item,index)=>{
                return <li key={index} className="selected-prod-item ellipis">{item.product_name}x{item.selectNum}</li>
                })

                }
                </ul>:'选择产品'
            }
            </Link>
        </div>
        <div className="upload-img-con">
            <p className="common-title">请上传发票凭证</p>
            <div className="file-table">
                <span className="common-select-btn">上传图片</span>

                <input type="file" onChange={this.uploadImg} />

            </div>
            <img src={this.props.formData.imgAddress} className="select-img" alt="" />
        </div>
        <TouchableOpacity className="submit-btn" clickCallBack={this.submitForm} text="提交" />

            <Alert closeAlert={this.closeAlert} alertTip={this.state.alertTip} alertStatus={this.state.alertStatus} />
    </main>
        );
    }
}

export default connect(state => ({
    formData: state.formData,
    prodData: state.prodData,
}), {
    saveFormData,
    saveImg,
    clearData,
    clearSelected,
})(HomePage);
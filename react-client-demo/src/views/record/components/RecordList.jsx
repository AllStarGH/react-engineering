import React, { Component } from 'react';
import { is, fromJS } from 'immutable';

import './RecordList.less';

import api from '@/api/api';

class RecordList extends Component {
    state = {
        recordData: []
    }

    // 初始化获取数据
    getRecord = async type => {
        try {
            let result = await api.getRecords({ type });
            this.setState({recordData: result.data || []});
        } catch (err) {
            console.error(err)
        }
    }

    // \\\\\\\\\\\\\\\\\\\\

    componentWillReceiveProps(nextProps) {
        // 判断类型是否重复
        let currentType = this.props.location.pathname.split('/')[2];
        let type = nextProps.location.pathname.split('/')[2];

        console.info('type==' + type + ',currentType==' + currentType);

        if (currentType !== type) {
            this.getRecord(type);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }

    componentWillMount() {
        let type = this.props.location.pathname.split('/')[2];
        this.getRecord(type);
    }

    constructor(props) {
        super(props);
        console.dir(this);
    }

    // \\\\\\\\\\\\\\\\\\\\

    render() {
        return (
    <div>
        <ul className="record-list-con">
            {
            this.state.recordData.map((item,index)=>{
            return <li className="record-item" key={index}>
                <section className="record-item-header">
                    <span>创建时间:{item.created_at}</span>
                    <span>{item.type_name}</span>
                </section>
                <section className="record-item-content">
                    <p> <span>用户名:</span>{item.customers_name} <span>,手机号码:</span> {item.customers_mobile}</p>
                    <p> <span>商品:</span> {item.product[0].product_name}</p>
                    <p> <span>金额:</span> {item.sales_money} <span>,佣金: </span>{item.commission} </p>
                </section>
                <p className="record-item-footer">等待管理员审核,通过审核后,佣金将结算至账户</p>
            </li>
            })
            }
        </ul>
    </div>
        );
    }

}

export default RecordList;
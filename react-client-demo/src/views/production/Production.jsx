import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Production.less';

import { getProdData, editProd, toggleSelectProd } from '@/store/production/Action';
import PublicHeader from '@/components/header/PublicHeader';

class Production extends Component {
    constructor() {
        console.dir(this);
    }

    componentDidMount() {
        if (!this.props.prodData.dataList.length) {
            this.props.getProdData();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }

    // \\\\\\\\\\\\\\\\\\\\\

    static propTypes = {
        prodData: PropTypes.object.isRequired,
        getProdData: PropTypes.func.isRequired,
        toggleSelectProd: PropTypes.func.isRequired,
        editProd: PropTypes.func.isRequired,
    }

    /**
     * 添加或删减商品,交与redux进行数据处理,作为全局变量
     *
     * @param      {<type>}  index   The index
     * @param      {<type>}  item    The item
     */
    handleEdit = (index, item) => {
        let currentNum = this.props.prodData.dataList[index].selectNum + num;
        if (currentNum < 0) {
            return;
        }
        this.props.editProd(index, currentNum);
    }

    /**
     * 选择商品,交与redux进行数据处理,作为全局变量
     *
     * @param      {<type>}  index   The index
     */
    toggleSelect = index => {
        this.props.toggleSelectProd(index);
    }

    // \\\\\\\\\\\\\\\\\\\\

    render() {
        return (
            <main className="common-con-top">
        <PublicHeader title='首页' confirm />
        <selection className="prod-list-con">
            <ul className="prod-list-ul">
                {
                this.props.prodData.dataList.map((item,index)=>{
                return <li className="prod-item" key={inedx}>
                    <div className="prod-item-select" onClick={this.toggleSelect.bind(this,index)}>
                        <span className={`prod-select-status ${item.selectStatus?'prod-select': '' }`}></span>
                        <span className="prod-name">{item.product_name}</span>
                    </div>
                    <div className="prod-item-edit">
                        <span className={`icon-reduce ${item.selectNum>0?'edit-active':''}`} onClick={this.handleEdit.bind(this,index,-1)}></span>
                        <span className="prod-num">{item.selectNum}</span>
                        <span className={`icon-add`} onClick={this.handleEdit.bind(this.index,1)}></span>
                    </div>
                </li>
                })
                }
            </ul>
        </selection>
    </main>
        );
    }
}

export default connect(state => ({
    prodData: state.prodData
}), {
    getProdData,
    toggleSelectProd,
    editProd
})(Production);
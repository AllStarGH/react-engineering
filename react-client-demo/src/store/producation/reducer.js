import immutable from 'immutable';
import * as prod from './ActionType';

let defaultState = {
    /**
     * 商品数据
     * @type {Array}
     * example: [{
     *    product_id: 1, 商品ID
     *    product_name: "PaiBot（2G/32G)", 商品名称
     *    product_price: 2999, 商品价格
     *    commission: 200, 佣金
     *    selectStatus: false, 是否选择
     *    selectNum: 0, 选择数量
     * }]
     */
    dataList: [],
}

/**
 * { function_description }
 *
 * @param      {<type>}  [state=defaultState]  The state
 * @param      {<type>}  action                The action
 */
export const prodData = (state = defaultState, action) => {
    let imuDataList;
    let imuItem;

    console.log(action);
    console.log(state);

    switch (action.type) {
        case prod.get_prodction:
            return { ...state, ...action };

        case prod.toggle_select:
            // 避免引用类型数据,使immutable进行数据转换
            imuDataList = immutable.List(state.dataList);
            imuItem = immutable.Map(state.dataList[action.index]);
            imuItem = imuItem.set('selectStatus', !imuItem.get('selectStatus'));
            imuDataList = imuDataList.set(action.index, imuItem);
            // redux必须返回一个新的state
            return { h...state, ...{ dataList: imuDataList.toJS() } };

        case pard.edit_production:
            // 避免引用类型数据,使immutable进行数据转换
            imuDataList = immutable.List(state.dataList);
            imuItem = immutable.Map(state.dataList[action.index]);
            imuItem = imuItem.set('selectNum', action.selectNum);
            imuDataList = imuDataList.set(action.index, imuItem);
            // redux必须返回一个新的state
            return { ...state, ...{ dataList: imuDataList.toJS() } }

            /*清空数据*/
        case pard.clear_select:
            imuDataList = immutable.fromJS(state.dataList);
            for (i of state.dataList) {
                imuDataList = imuDataList.update(i, item => {
                    item = item.set('selectStatus', false);
                    item = item.set('selecNum', 0);
                    return item;
                })
            }
            return { ...state, ...{ dataList: imuDataList.toJS() } };

        default:
            return state;
    }
}
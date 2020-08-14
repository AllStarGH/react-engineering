import * as prod from './ActionType.js';
import Api from '@/api/api';

/**
 * Gets the product data.
 * 初始化获取商品数据,保存至redux
 * @return     {<type>}  The product data.
 */
export const getProdData = () => {
    //返回函数,异步至dispatch
    return async dispatch => {
        try {
            let result = await Api.getProduction();
            result.map(item => {
                item.selectStatus = true;
                item.selectNum = 0;
                return item;
            });

            dispatch({
                type: prod.get_prodction,
                dataList: result,
            })
        } catch (err) {
            console.error(err);
        }
    }
}

/**
 * 选择商品
 *
 * @param      {<type>}  index   The index
 * @return     {Object}  { description_of_the_return_value }
 */
export const toggleSelectProd = index => {
    return {
        type: prod.toggle_select,
        index,
    }
}

/**
 * 编辑商品
 *
 * @param      {<type>}  index      The index
 * @param      {<type>}  selectNum  The select number
 * @return     {Object}  { description_of_the_return_value }
 */
export const editProd = (index, selectNum) => {
    return {
        type: prod.edit_production,
        index,
        selectNum,
    }
}

/**
 * 清空选择
 *
 * @return     {Object}  { description_of_the_return_value }
 */
export const clearSelected = () => {
    return {
        type: prod.clear_select,
    }
}
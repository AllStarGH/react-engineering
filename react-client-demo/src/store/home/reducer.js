//reducer: 还原剂,减速器

import * as home from './ActionType';

let defaultState = {
    // 金额
    orderSum: '',

    // 姓名
    name: "",

    // 手机号
    mobile: '',

    // 图片地址
    imgAddress: ''
}

/**
 * 首页表单数据
 *
 * @param      {<type>}  [state=defaultState]  The state
 * @param      {<type>}  [action={}]           The action
 * @return     {Object}  { description_of_the_return_value }
 */
export const formData = (state = defaultState, action = {}) => {
    console.log('首页表单数据===');
    console.log(action);

    switch (action.type) {
        case home.save_form_data:
            return {
                ...state,
                ...{
                    [action.dataType]: action.value
                }
            };

        case home.save_img:
            return { ...state, ...{ imgAddress: action.path } };

        case home.clear_data:
            return { ...state, ...defaultState };

        default:
            return state;
    }
}
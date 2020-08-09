import * as home from './ActionType.js';

/**
 * Saves a form data.
 *
 * @param      {<type>}  value     The value
 * @param      {<type>}  dataType  The data type
 * @return     {Object}  { description_of_the_return_value }
 */
export const saveFormData = (value, dataType) => {
    return {
        type: home.save_form_data,
        value,
        dataType
    }
}

/**
 * Saves an image.
 *
 * @param      {<type>}  path    The path
 * @return     {Object}  { description_of_the_return_value }
 */
export const saveImg = path => {
    return {
        type: home.save_img,
        path
    }
}

/**
 * { 清空数据 }
 *
 * @return     {Object}  { description_of_the_return_value }
 */
export const clearData = () => {
    return {
        type: home.clear_data
    }
}
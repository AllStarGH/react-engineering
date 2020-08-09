export default methods => {
    return target => {
        Object.assign(target.prototype, methods);
    }
}

/**
 * 字符串填充函数
 *
 * @param      {string}  value      	The value 		 目标字符串
 * @param      {<type>}  position   	The position     需要填补之位置
 * @param      {string}  fillStr    	The fill string  所填充之字符串
 * @param      {<type>}  inputElement   The input element
 * @return     {string}  { 返回之目标字符串 }
 */
export const filledStr = (value, position, fillStr, inputElement) => {
    console.log(fillStr);

    position.forEach((item, index) => {
        if (value.length > item + index) {
            value = value.substring(0, item + index) + fillStr + value.substring(item + index);
        }
    })

    value = value.trim();
    // 解决安卓部分浏览器插入空格后,光标错位问题
    requestAnimationFrame(() => {
        inputElement.setSelectionRange(value.length, value.length);
    })
    console.info(value);
    return value;
}
/*全局配置文件*/

let baseURL;

let imgURL = '//elm.cangdu.org/img/';

if (process.env.NODE_ENV === 'development') {
	console.info('...development...')
    console.log(process);
    baseURL = '//api.cangdu.org';
} else {
	console.info('! development...')
	console.info(process);
    baseURL = '//api.cangdu.org';
}

export default { imgURL, baseURL }
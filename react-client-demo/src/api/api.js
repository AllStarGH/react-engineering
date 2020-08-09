import Server from './server';

/**
 * This class describes an api.
 *
 * 返回status为1表示成功;
 * 返回http_code为200表示成功;
 *
 * @class      Api (name)
 */
class Api extends Server {
    /**
     * Uploads an image.上传图片
     *
     * @param      {<type>}   [params={}]  The parameters
     * @return     {Promise}  { description_of_the_return_value }
     */
    async uploadImg(params = {}) {
        try {
            let result = await this.axios('POST', '//elm.cangdu.org/v1/addimg/shop', params);
            if (result && result.status === 1) {
                return result;
            } else {
                let err = {
                    tip: '上传相片失败',
                    response: result,
                    data: params,
                    url: '//elm.cangdu.org/v1/addimg/shop',
                }
                throw err;
            }
        } catch (err) {
            console.err(err);
            throw err;
        }
    }


    /**
     * Gets the records.获取用户记录数据
     *
     * @param      {<type>}   [params={}]  The parameters
     * @return     {Promise}  The records.
     */
    async getRecords(params = {}) {
        try {
            let result = await this.axios('GET', `/shopro/data/record/${params.type}`);

            if (result && (result.data instanceof Object) && result.http_code === 200) {
                return result.data;
            } else {
                let err = {
                    tip: '获取记录数据失败',
                    response: result,
                    data: params,
                    url: 'https://api.cangdu.org/shopro/data/record',
                };
                throw err;
            }

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * Gets the production.获取商品数据
     *
     * @param      {<type>}   [params={}]  The parameters
     * @return     {Promise}  The production.
     */
    async getProduction(params = {}) {
        try {
            let result = await this.axios('GET', '/shopro/data/products', params);

            if (result && (result.data instanceof Object) && result.http_code === 200) {
                return result.data.data || [];
            } else {
                let err = {
                    tip: '获取记录数据失败',
                    response: result,
                    data: params,
                    url: 'https://api.cangdu.org/shopro/data/products',
                };
                throw err;
            }

        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Gets the balance.获取佣金数据
     *
     * @param      {<type>}   [params={}]  The parameters
     * @return     {Promise}  The balance.
     */
    async getBalance(params = {}) {
        try {
            let result = await this.axios('GET', '/shopro/data/balance', params);

            if (result && (result.data instanceof Object) && result.http_code === 200) {
                return result.data;
            } else {
                let err = {
                    tip: '获取佣金数据失败',
                    response: result,
                    data: params,
                    url: 'https://api.cangdu.org/shopro/data/balance',
                };
                throw err;
            }

        } catch (e) {
            console.error(e);
            throw e;
        }
    }

}

export default new Api();
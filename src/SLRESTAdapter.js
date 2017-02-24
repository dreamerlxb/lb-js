import axios from 'axios';
import SLAdapter from './SLAdapter';
import SLRESTContract from './SLRESTContract';

export default class SLRESTAdapter extends SLAdapter {
    constructor(url, accessToken = '', allowsInvalidSSLCertificate = false) {
        super(url, allowsInvalidSSLCertificate);
        this.contract = new SLRESTContract(); // SLRESTContract类型
        this.accessToken = accessToken;
    }

    /**
     * Connects the Adapter to `url`.
     * @param {string} url  The URL to connect to.
     */
    connectToURL(url) {
        console.log('SLRESTAdapter connectToURL...');
        if (url) {
            this.axiosClient = axios.create({ // 例如：http://91tkp.com:3001/api/
                baseURL: url,
                timeout: 1000,
                headers: {
                    Accept: 'application/json',
                },
            });
            this.connected = true;
        }
    }

    /**
     * @param {String} method
     * @param {Object} parameters 主要是GET/DELETE/HEAD
     * @param {Object} bodyParameters request body,主要是PUT/POST请求（GET请求时，可以为空）
     * @returns {Promise} 返回一个promise
     */
    invokeStaticMethod(method, parameters, bodyParameters) {
        const verb = this.contract.verbForMethod(method);
        const path = this.contract.urlFor(method, parameters); // 拼接URL
        const multipart = this.contract.multipartForMethod(method);

        console.log(`SLRESTAdapter invokeStaticMethod path = ${path} verb = ${verb}`);

        const _self = this;
        const promise = new Promise((resolve, reject) => {
            _self.requestWith(path, verb, parameters, bodyParameters, multipart).then(result => resolve(result.data), error => reject(error));
        });

        return promise;
    }

    /**
     * @param {String} method
     * @param {Object} constructorParameters
     * @param {Object} parameters 主要是GET/DELETE/HEAD eg:users?access_token='dvsjdvnsdvlsdb'&filter={...}
     * @param {Object} bodyParameters request body,主要是PUT/POST请求（GET请求时，可以为空）
     * @returns {Promise} 返回一个promise
     */
    invokeInstanceMethod(method, constructorParameters, parameters, bodyParameters) {
        // Object.assign(target, ...source)方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
        Object.assign(bodyParameters, constructorParameters);

        const verb = this.contract.verbForMethod(method);
        const path = this.contract.urlFor(method, parameters);
        const multipart = this.contract.multipartForMethod(method);

        const _self = this;
        const promise = new Promise((resolve, reject) => {
            _self.requestWith(path, verb, parameters, bodyParameters, multipart).then(result => resolve(result.data), error => reject(error));
        });

        return promise;
    }

    /**
     * @param {String} path eg:`users/1234`、`users/login` ...
     * @param {String} verb GET/PUT/POST/HEAD/DELETE
     * @param {Object} parameters 这里的参数是除掉url中的参数外的params（/users/login）
     * @param {Object} bodyParameters  请求体中的参数body，PUT/POST请求时的参数
     * @param {Boolean} multipart
     *
     * @returns {Promise} 返回一个Promise
     */
    requestWith(path, verb, parameters, bodyParameters, multipart) {
        if (path.charAt(0) === '/') {
            path = path.substring(1);
        }

        if (this.accessToken !== '') {
            parameters.access_token = this.accessToken;
        }
        console.log(parameters);
        if (!multipart) {
            const upperVerb = verb.toLocaleUpperCase();
            if (upperVerb === 'GET') {
                return this.axiosClient.get(path, {
                    params: parameters,
                });
            } else if (upperVerb === 'DELETE') {
                return this.axiosClient.delete(path, {
                    params: parameters,
                });
            } else if (upperVerb === 'HEAD') {
                return this.axiosClient.head(path, {
                    params: parameters,
                });
            } else if (upperVerb === 'POST') {
                return this.axiosClient.post(path, bodyParameters, {
                    params: parameters,
                });
            } else if (upperVerb === 'PUT') {
                return this.axiosClient.put(path, bodyParameters, {
                    params: parameters,
                });
            }
            throw new Error(`Illegal method: '${upperVerb}'. Only GET, POST, PUT, DELETE supported.`);
        } else { // 说明是文件上传
            return null;
        }
    }
}

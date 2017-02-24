export class SLObject {
    constructor(repository, creationParameters = {}) {
        this.repository = repository; // SLRepository
        this.creationParameters = creationParameters; // readonly
    }

    /**
     * DELETE/POST/PUT  主要是delete/insert/update
     * @param {String} method
     * @param {Object} parameters URL参数或GET/DELETE/HEAD请求参数
     * @param {Object} bodyParameters PUT/POST请求参数
     * @returns {Promise}
     */
    invokeMethod(method, parameters, bodyParameters = {}) {
        const adapter = this.repository.adapter;
        if (adapter === undefined || adapter === null) {
            throw new Error('Repository adapter cannot be null');
        }
        const path = `${this.repository.className}.prototype.${method}`; // this.repository.className + '.prototype.' + method;

        return adapter.invokeInstanceMethod(path, this.creationParameters, parameters, bodyParameters);
    }
}

/**
 * 所有的请求都是通过该类提供的
 */
export default class SLRepository {
    constructor(className, adapter) {
        this.className = className;
        this.adapter = adapter; // SLAdapter类型
    }

    /**
     * GET/DELETE/HEAD 请求时，参数放到parameters
     * POST/PUT请求时，参数放到bodyParameters中
     * eg: name = 'find' -> model.find
     * @param {String} name 方法名
     * @param {Object} parameters GET/HEAD/DELETE 请求参数 {...} ， /api/users?xx=xx&xx1=xx1
     * @param {Object} bodyParameters request body（POST/PUT 请求参数，GET请求时，可以为空，将参数全部放在parameters）
     */
    invokeStaticMethod(name, parameters = {}, bodyParameters = {}) {
        if (this.adapter === undefined || this.adapter === null) {
            throw new Error('Repository adapter cannot be null');
        }
        const path = `${this.className}.${name}`; // this.className + '.' + name;
        return this.adapter.invokeStaticMethod(path, parameters, bodyParameters);
    }
}

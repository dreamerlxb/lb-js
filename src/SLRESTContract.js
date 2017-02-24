export class SLRESTContractItem {
    constructor(pattern, verb, multipart = false) {
        /**
         * The pattern corresponding to this route, e.g. `/widgets/:id`.
         */
        this.pattern = pattern; // string

        /**
         * The verb corresponding to this route, e.g. `GET`.
         */
        this.verb = verb; // string

        /**
         * Indication that this item is a multipart form mime type.
         */
        this.multipart = multipart;// boolean
    }
}

/**
 * A contract specifies how remote method names map to HTTP routes.
 *
 * The new route is GET /:id, instead of POST /project/getObject, so we
 * need to update our contract on the client:
 *
 */
export default class SLRESTContract {
    constructor() {
        // console.log('REST Contract constructor...');

        /**
         * A read-only representation of the internal contract. Used for
         * SLRESTContract::addItemsFromContract:.
         */
        this.dict = new Map(); // 只读属性 <String,SLRESTContractItem>
    }

    /**
     * Adds a single item to this contract. The item can be shared among different
     * contracts, managed by the sum of all contracts that contain it. Similarly,
     * each item can be used for more than one method, like so:
     *
     * @code
     * let upsert = new SLRESTContractItem('/widgets/:id','PUT');
     * contract.addItem(upsert,'widgets.create');
     * @endcode
     * @param {SLRESTContractItem} item The item to add to this contract.
     * @param {String} method The method the item should represent.
     */
    addItem(method, item) {
        this.dict.set(method, item);
    }

    /**
     * Adds all items from contract.
     * @see addItem()
     * @param {SLRESTContract} contract The contract to copy from.
     */
    addItemsFromContract(contract) {
        // for (let key of contract.dict.keys()) {
        //     let value = contract.dict.get(key);
        //     this.dict.set(key, value);
        // }
        for (const [key, value] of contract.dict) {
            this.dict.set(key, value);
        }
        // contract.dict.forEach(function(value, key, map) {
        //     this.dict.set(key, value);
        // }.bind(this));
    }

    /**
     * Resolves a specific method, replacing pattern fragments with the optional
     * `parameters` as appropriate.(通过指定的参数替换`pattern`中的占位符)
     * Also removes consumed key-value pairs from the mutable `parameters`.
     * `'users/:id'` -> `'users/1234'`  或
     * `'users.login'` -> `'users/login'`
     *
     * @param  {String} method     The method to resolve.
     * @param  {Object} parameters Pattern parameters. Can be `nil`.
     * @return {string}         The complete, resolved URL.(返回完整的URL)
     */
    urlFor(method, parameters) {
        const pattern = this.patternForMethod(method);
        if (pattern === '') {
            // Generates a fallback URL for a method whose contract has not been customized.
            return method.replace('.', '/');
        }
        return this.urlWith(pattern, parameters);
    }

    /**
     * Returns the HTTP verb for the given method string.(返回指定方法的请求类型：GET/POST...)
     *
     * @param  {String} method The method to resolve.
     * @return  {String}      The resolved verb.
     */
    verbForMethod(method) {
        const item = this.dict.get(method);
        return item === undefined ? 'POST' : item.verb;
    }

    /**
     * Returns the multipart setting for the given method string.
     *
     * @param  {String} method The method to resolve.
     * @return  {boolean}      The mutipart setting.
     */
    multipartForMethod(method) {
        const item = this.dict.get(method);

        // console.log('SLRESTContract multipartForMethod');
        // console.log(method);
        // console.log(item);

        return item === undefined ? false : item.multipart;
    }

    /**
     * Returns the custom pattern representing the given method string, or `nil` if
     * no custom pattern exists.
     * eg:`'findById'` -> `'users/:id'` 或 `'users.login'` -> `''`
     *
     * @param  {String} method The method to resolve.
     * @return  {string}     The custom pattern if one exists, `nil` otherwise.
     */
    patternForMethod(method) {
        const item = this.dict.get(method); // SLRESTContractItem
        // console.log('REST Contract patternForMethod...');
        // console.log(item);
        return item === undefined ? '' : item.pattern;
    }

    /**
     * Returns a rendered URL pattern using the parameters provided.
     * Also removes consumed key-value pairs from the mutable `parameters`.
     * For example,
     * `"/widgets/:id"` + `{"id": "57", "price": "42.00" }` begets
     * `"/widgets/57"`.
     * And `parameter` becomes `{ "price": "42.00" }`
     *
     * @param  {String} pattern    The pattern to render.
     * @param  {Object} parameters Values to render with.
     *                    This is mutable and consumed key-value pairs get removed.
     * @return  {String}          The rendered URL.
     */
    urlWith(pattern, parameters) {
        // console.log('REST Contract urlWith...');
        // console.log(parameters);
        let url = pattern;
        for (const key in parameters) {
            const value = parameters[key];
            url = url.replace(`:${key}`, `${value}`);
        }
        // console.log(url);
        return url;
    }
}

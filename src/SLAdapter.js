export default class SLAdapter {
    constructor(url, allowsInvalidSSLCertificate = false) {
        console.log('SLAdapter constructor...');
        /** YES if the SLAdapter is connected to a server, NO otherwise. */
        this.connected = false;
        /** A flag to control if invalid SSL certificates are allowed */
        this.allowsInvalidSSLCertificate = allowsInvalidSSLCertificate;

        if (url) {
            this.connectToURL(url);
        }
    }

    /**
     * Connects the Adapter to `url`.
     * @param {string} url  The URL to connect to.
     */
    connectToURL(url) {
      // console.log('Adapter connectToURL...');
    }

    /**
     * 调用静态方法
     * @param {String} method The method to invoke, e.g. `module.doSomething`.
     * @param {Object} parameters The parameters to invoke with.一般是放在url上，或者url的REST参数（GET/HEAD/DELETE）
     * @param {Object} bodyParameters bodyParameters是PUT/POST参数
     */
    invokeStaticMethod(method, parameters, bodyParameters) {}

    /**
     * 调用实例方法
     * @param {String} method The method to invoke, e.g. `module.doSomething`.
     * @param {Object} constructorParameters
     * @param {Object} parameters The parameters to invoke with.一般是放在url上，或者url的REST参数（GET/HEAD/DELETE）
     * @param {Object} bodyParameters The parameters that get JSON encoded and put intothe message body when the method is POST or PUT.
     */
    invokeInstanceMethod(method, constructorParameters, parameters, bodyParameters) {}
}

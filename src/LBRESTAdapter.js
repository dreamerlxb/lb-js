import SLRESTAdapter from './SLRESTAdapter';

export default class LBRESTAdapter extends SLRESTAdapter {

    constructor(url, accessToken = '', allowsInvalidSSLCertificate = false) {
        super(url, accessToken, allowsInvalidSSLCertificate);
    }

    /**
     * 通过该方法创建 ModelRepository，然后对 model 操作
     * @param {LBModelRepository} target
     * @param {...} args 参数
     */
    createRepository(target, ...args) {
        // if (!(target instanceof LBModelRepository)) {
        //     throw new Error('target 应该为 LBModelRepository 的子类');
        // }

        const repo = Reflect.construct(target, args); // 利用反射机制创建对象
        this._attachRepository(repo);
        return repo;
    }

    /**
     * 私有function
     * @param {LBModelRepository} repository
     */
    _attachRepository(repository) {
        this.contract.addItemsFromContract(repository.createContract());
        repository.adapter = this;
    }
}

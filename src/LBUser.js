import LBModelRepository, { LBModel } from './LBModel';
import { SLRESTContractItem } from './SLRESTContract';

export class LBUser extends LBModel {
    constructor(repository, creationParameters) {
        super(repository, creationParameters);

        this.email = ''; // string
        this.password = ''; //  string
        this.realm = ''; // string
        this.emailVerified = false;
        this.status = ''; // string
    }
}

/**
 * 与用户相关的操作
 */
export default class LBUserRepository extends LBModelRepository {
    constructor(className = 'users') {
        super(className);
    }

    /**
     * 重写父类方法，添加user的操作与其对应的URL
     */
    createContract() {
        const contract = super.createContract();
        console.log('LBUserRepository contract...');

        const item = new SLRESTContractItem(`${this.className}/login?include=user`, 'POST');
        contract.addItem(`${this.className}.login`, item);

        const item1 = new SLRESTContractItem(`${this.className}/logout`, 'POST');
        contract.addItem(`${this.className}.logout`, item1);

        return contract;
    }

    /**
     * @param {string} username
     * @param {string} password
     * @returns {Promise} 返回一个promise
     */
    loginWithEmail(email, password) {
        return this.invokeStaticMethod('login', {}, {
            email,
            password,
        });
    }

    /**
     * @param {string} username
     * @param {string} password
     * @returns {Promise} 返回一个promise
     */
    loginWithUsername(username, password) {
        return this.invokeStaticMethod('login', {}, {
            username,
            password,
        });
    }

    /**
     * @returns {Promise} 返回一个promise
     */
    logout() {
        return this.invokeStaticMethod('logout');
    }
}

import SLRepository, { SLObject } from './SLObject';
import SLRESTContract, { SLRESTContractItem } from './SLRESTContract';

export class LBModel extends SLObject {
    constructor(repository, creationParameters = {}) {
        super(repository, creationParameters);
        this.id = undefined;
    }

    /**
     * Update or create model,according to the model Id;
     */
    save() {
        if (this.id) { //   如果存在id ，那么就update
            console.log('存在 id，update');
            return this.invokeMethod('save', {
                id: this.id,
            }, this);
        }
        //  如果不存在id ，那么就create
        console.log('不存在 id，create');
        return this.invokeMethod('create', {}, this);
    }

    /**
     * Delete the model according to the model Id
     */
    destroy() {
        if (this.id) {
            return this.invokeMethod('delete', {
                id: this.id,
            });
        }
        throw new Error('删除model时，model id不能为空');
    }
}

/**
 * 创建Repository的基类（包含对model的增删改查）
 */
export default class LBModelRepository extends SLRepository {
    constructor(className, adapter = null) {
        super(className, adapter);
    }

    /**
     * 创建方法与uri之间的联系
     * eg: POST users -> users.prototype.create  //创建
     *     PUT  users/:id -> users.prototype.save // 保存
     *     DELETE users/:id -> users.prototype.delete // 删除
     */
    createContract() {
        console.log('LBModelRepository createContract...');

        if (this.className === null || this.className === undefined) {
            throw new Error(`${this.name}的className 不能为空`);
        }

        const contract = new SLRESTContract();

        const item = new SLRESTContractItem(this.className, 'POST');
        contract.addItem(`${this.className}.prototype.create`, item);

        const item1 = new SLRESTContractItem(`${this.className}/:id`, 'PUT'); //
        contract.addItem(`${this.className}.prototype.save`, item1);

        const item2 = new SLRESTContractItem(`${this.className}/:id`, 'DELETE');
        contract.addItem(`${this.className}.prototype.delete`, item2);

        const item3 = new SLRESTContractItem(`${this.className}/:id`, 'GET');
        contract.addItem(`${this.className}.findById`, item3);

        const item4 = new SLRESTContractItem(this.className, 'GET');
        contract.addItem(`${this.className}.all`, item4);

        const item5 = new SLRESTContractItem(this.className, 'GET');
        contract.addItem(`${this.className}.find`, item5);

        const item6 = new SLRESTContractItem(`${this.className}/findOne`, 'GET');
        contract.addItem(`${this.className}.findOne`, item6);

        const item7 = new SLRESTContractItem(`${this.className}/count`, 'GET');
        contract.addItem(`${this.className}.count`, item7);

        return contract;
    }

    /**
     * GET all models
     * params = { filter:{where:{},order:{},limit:{} } }
     */
    all(params = {}) {
        return this.invokeStaticMethod('all', params);
    }

    /**
     * GET one model by Id
     */
    findById(_id, filter = {}) {
        return this.invokeStaticMethod('findById', {
          ...filter,
            id: _id
        });
    }

    /**
     * GET the first model
     * params = { filter:{where:{},order:{},limit:{} } }
     * @param {Object} params filter参数
     * @returns {Promise} 返回一个promise
     */
    findOne(params = {}) {
        return this.invokeStaticMethod('findOne', params);
    }

    /**
     * Like 'all'
     * params = { filter:{where:{},order:{},limit:{} } }
     * @returns {Promise} 返回一个promise
     */
    find(params = {}) {
        return this.invokeStaticMethod('find', params);
    }

    /**
     * Delete onr model by Id
     * @returns {Promise} 返回一个promise
     */
    deleteById(_id) {
        return this.invokeStaticMethod('prototype.delete', {
            id: _id,
        });
    }

    /**
     * Update or save one model according to the model ID
     * PUT/POST请求
     * @param {Object} 一个对象
     * @returns {Promise} 返回一个promise
     */
    upsert(model) {
        if (model.id) { // 如果存在id ，那么就update
            console.log('存在 id，update');
            return this.invokeStaticMethod('prototype.save', {
                id: model.id,
            }, model);
        }
        // 如果不存在id ，那么就create
        console.log('不存在id，create');
        return this.invokeStaticMethod('prototype.create', {}, model);
    }

    /**
     * eg: params = { where: { ... } }
     * @param {Object} parmas 过滤参数 where
     * @returns {Promise} 返回一个promise
     */
    count(params = {}) {
        return this.invokeStaticMethod('count', params);
    }
}

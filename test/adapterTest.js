import LBRESTAdapter from '../src/LBRESTAdapter';
import LBModelRepository from '../src/LBModel';
import baseURL from '../src/Tools';
// const LBRESTAdapter = require('../src/LBRESTAdapter');
// const { LBModel, LBModelRepository } = require('../src/LBModel');
// const { LBUser, LBUserRepository } = require('../src/LBUser');

describe('LBRESTAdapter Test', () => {
    it('Create adapter and repository', () => {
        const adapter = new LBRESTAdapter(baseURL);
        adapter.accessToken = 'oMuwrqVKYO7SH1ka2OdfwbaEJ74T1EHK6AG1ZuGOaJBTZkCbB4AZlj6J0aOeXPQ6';
        const parksRepo = adapter.createRepository(LBModelRepository, 'parks');
        console.log(adapter);
        console.log(parksRepo);
        // parksRepo.findById(12346).then((value) => { console.log(value); }, (error) => { console.log(error); });
    });
});

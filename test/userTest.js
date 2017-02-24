import LBRESTAdapter from '../src/LBRESTAdapter';
import LBUserRepository from '../src/LBUser';
import baseURL from '../src/Tools';

describe('UserResitory Test', () => {
    it('login', () => {
        const adapter = new LBRESTAdapter(baseURL);
        const userRepo = adapter.createRepository(LBUserRepository, 'MHUser');
        userRepo.loginWithUsername('86-12345678901', '123456789').then((value) => { console.log(value); }, (error) => { console.log(error); });
    });

    it('logout', () => {
        const adapter = new LBRESTAdapter(baseURL);
        adapter.accessToken = 'rfGFT3FO52JlN53EM47pCl6f05N8quY7KXWJTJG2Ij4FJDeFlIlHZka5pZfji0h9';
        const userRepo = adapter.createRepository(LBUserRepository, 'MHUser');
        userRepo.logout().then((value) => { console.log(value); }, (error) => { console.error(error); });
    });

    it('find', () => {
        const adapter = new LBRESTAdapter(baseURL);
        adapter.accessToken = 'oMuwrqVKYO7SH1ka2OdfwbaEJ74T1EHK6AG1ZuGOaJBTZkCbB4AZlj6J0aOeXPQ6';
        const userRepo = adapter.createRepository(LBUserRepository, 'MHUser');
        userRepo.find({
            filter: {
                order: 'created DESC',
                limit: 2,
            },
        }).then((value) => { console.log(value); }, (error) => { console.log(error); });
    });
});

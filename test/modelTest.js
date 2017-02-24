import LBRESTAdapter from '../src/LBRESTAdapter';
import LBModelRepository from '../src/LBModel';
import baseURL from '../src/Tools';

describe('LBModelRepository Test', () => {
    it('findById', () => {
        const adapter = new LBRESTAdapter(baseURL);
        adapter.accessToken = 'oMuwrqVKYO7SH1ka2OdfwbaEJ74T1EHK6AG1ZuGOaJBTZkCbB4AZlj6J0aOeXPQ6';
        const parksRepo = adapter.createRepository(LBModelRepository, 'parks');
        parksRepo.findById(12346).then((value) => { console.log(value); }, (error) => { console.log(error); });
    });

    it('deleteById', () => {
        const adapter = new LBRESTAdapter(baseURL);
        adapter.accessToken = 'oMuwrqVKYO7SH1ka2OdfwbaEJ74T1EHK6AG1ZuGOaJBTZkCbB4AZlj6J0aOeXPQ6';
        const parksRepo = adapter.createRepository(LBModelRepository, 'parks');
        parksRepo.deleteById(370113).then((value) => { console.log(value); }, (error) => { console.log(error); });
    });

    it('find', () => {
        const adapter = new LBRESTAdapter(baseURL);
        adapter.accessToken = 'oMuwrqVKYO7SH1ka2OdfwbaEJ74T1EHK6AG1ZuGOaJBTZkCbB4AZlj6J0aOeXPQ6';
        const parksRepo = adapter.createRepository(LBModelRepository, 'parks');
        parksRepo.find({
            filter: {
                order: 'created DESC',
                limit:2,
            },
        }).then((value) => { console.log(value); }, (error) => { console.log(error); });
    });

    it('upsert - update', () => {
        const adapter = new LBRESTAdapter(baseURL);
        adapter.accessToken = 'oMuwrqVKYO7SH1ka2OdfwbaEJ74T1EHK6AG1ZuGOaJBTZkCbB4AZlj6J0aOeXPQ6';
        const parksRepo = adapter.createRepository(LBModelRepository, 'parks');
        parksRepo.upsert({
            address: '停车场地址-1235',
            closeTime: '23:59:59',
            description: '这是一个new的停车场',
            name: '停车场例子A-B-C',
            openTime: '08:30',
            parkType: 1,
            id: 370116,
        }).then((value) => { console.log(value); }, (error) => { console.log(error); });
    });

    it('upsert - create', () => {
        const adapter = new LBRESTAdapter(baseURL);
        adapter.accessToken = 'oMuwrqVKYO7SH1ka2OdfwbaEJ74T1EHK6AG1ZuGOaJBTZkCbB4AZlj6J0aOeXPQ6';
        const parksRepo = adapter.createRepository(LBModelRepository, 'parks');
        parksRepo.upsert({
            dayUnit: 6,
            address: '停车场地址 Test - 902',
            closeTime: '23:59',
            coordinate: {
                lat: 36.679851,
                lng: 117.137138,
            },
            created: '2016-07-29T07:50:43.000Z',
            description: 'hello world 1-2-3-4-5-6-7-8-9-0',
            freeNum: 30,
            images: [
                'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2341433676,3688504969&fm=80&w=179&h=119&img.JPEG',
                'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3419277028,3296996736&fm=80&w=179&h=119&img.JPEG',
                'http://img4.imgtn.bdimg.com/it/u=3668684895,3951614507&fm=21&gp=0.jpg',
                'http://img1.imgtn.bdimg.com/it/u=4234242820,42152061&fm=21&gp=0.jpg',
                'http://t12.baidu.com/it/u=753144771,1231170564&fm=72',
            ],
            lastUpdated: '2016-11-15T05:22:21.000Z',
            name: '停车场例子 Test -902',
            nightUnit: 8,
            openTime: '08:00',
            parkType: 1,
            totalNum: 100,
        }).then((value) => { console.log(value); }, (error) => { console.log(error); });
    });
});

// import axios from 'axios';
import LBRESTAdapter from '../src/LBRESTAdapter';
import LBModelRepository from '../src/LBModel';

const adapter = new LBRESTAdapter('http://192.168.1.167:3000/api/');
adapter.accessToken = 'p978SrVj5RrGyIm6cXcr0Xmq0TExWw3vSl1sFCyFg6hZQlUT3l2vJ4enoQWDHe70';
const repo = adapter.createRepository(LBModelRepository, 'Matches');
const promise = repo.findById(3, {filter:{include:'cmptItems'}});
promise.then((value) => { console.log(value); }, (error) => { console.log(error); });
// import baseURL from '../src/Tools';
// //
// axios.post('http://211.87.227.214:4001/api/L2hvbWUvdGVzdGZpbGV1cGxvYWQs/testfileupload/upload', {
//     url: '',
// }, {
//     headers: {
//         'Content-Type': 'multipart/form-data',
//     },
//     onUploadProgress(progressEvent) {
//         console.log('上传中...');
//         console.log(progressEvent);
//     },
// }).then((value) => { console.log(value); }, (error) => { console.log(error); });
//
// // axios.get('http://img4.imgtn.bdimg.com/it/u=3668684895,3951614507&fm=21&gp=0.jpg', {
// //     onDownloadProgress(progressEvent) {
// //         console.log('下载中...');
// //         console.log(progressEvent);
// //     },
// // }).then((value) => { console.log(value); }, (error) => { console.log(error); });
//
// /**
//  * 初始化配置信息
//  */
// const token = 'p5r2Ftf1NyTYIm6zTE5qWBkB3JjlHel7PMNIiQmWUnZJ5zjv6TESdFsZNGCUbN4X';
// const adapter = new LBRESTAdapter(baseURL, token);
// const parksRepo = adapter.createRepository(LBModelRepository, 'parks');
//
// // /**
// //  *测试 model.save();
// //  */
// // const park = new LBModel(parksRepo);
// // console.log(park);
// // park.id = 370119;
// // park.name = '这是一个测试停车场====';
// // park.save().then((value) => { console.log(value); }, (error) => { console.log(error); });
//
// // /**
// //  * 测试repo.find
// //  */
// // parksRepo.find({
// //     filter: {
// //         order: 'created ASC',
// //     },
// // }).then((value) => { console.log(value); }, (error) => { console.log(error); });
//
// // /**
// //  * 测试repo.upsert (update)
// //  */
// // parksRepo.upsert({
// //     address: '停车场地址-2345678',
// //     closeTime: '23:59:59',
// //     description: '这是一个新的停车场',
// //     name: '停车场例子A-B-C-D-E-F',
// //     openTime: '08:30',
// //     parkType: 1,
// //     id: 370116,
// // }).then((value) => { console.log(value); }, (error) => { console.log(error); });
//
// /**
//  * 测试repo.upsert (create)
//  */
// // parksRepo.upsert({
// //     dayUnit: 6,
// //     address: '停车场地址 Test - 901',
// //     closeTime: '23:59',
// //     coordinate: {
// //         lat: 36.679851,
// //         lng: 117.137138,
// //     },
// //     created: '2016-07-29T07:50:43.000Z',
// //     description: 'hello world 1-2-3-4-5-6-7-8',
// //     freeNum: 30,
// //     images: [
// //         'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2341433676,3688504969&fm=80&w=179&h=119&img.JPEG',
// //         'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3419277028,3296996736&fm=80&w=179&h=119&img.JPEG',
// //         'http://img4.imgtn.bdimg.com/it/u=3668684895,3951614507&fm=21&gp=0.jpg',
// //         'http://img1.imgtn.bdimg.com/it/u=4234242820,42152061&fm=21&gp=0.jpg',
// //         'http://t12.baidu.com/it/u=753144771,1231170564&fm=72',
// //     ],
// //     lastUpdated: '2016-11-15T05:22:21.000Z',
// //     name: '停车场例子 Test -901',
// //     nightUnit: 8,
// //     openTime: '08:00',
// //     parkType: 1,
// //     totalNum: 100,
// // }).then((value) => { console.log(value); }, (error) => { console.log(error); });
//
// // /**
// //  * 测试repo.login
// //  */
// // const userRepo = adapter.createRepository(LBUserRepository);
// // userRepo.loginWithUsername('86-12345678901', '123456789').then((value) => { console.log(value); }, (error) => { console.log(error); });
//
//
// // /**
// //  * 测试repo.logout
// //  */
// // adapter.accessToken = 'rfGFT3FO52JlN53EM47pCl6f05N8quY7KXWJTJG2Ij4FJDeFlIlHZka5pZfji0h9';
// // const userRepo = adapter.createRepository(LBUserRepository);
// // userRepo.logout().then((value) => { console.log(value); }, (error) => { console.error(error); });
//
//
// // /**
// //  * repo.deleteById
// //  */
// // adapter.accessToken = '0dejy86ElOqeu7MA0kWH8C1eo4AAPHkW25MCA3AT5YLlat8t5rmksUtzp27w4Cu0';
// // const parksRepo = adapter.createRepository(LBModelRepository, 'parks');
// // parksRepo.deleteById(370113).then((value) => {
// //     console.log(value);
// // }, (error) => {
// //     console.log(error);
// // });
//
//
// // /**
// //  * 测试 repo.findById
// //  */
// // adapter.accessToken = '0dejy86ElOqeu7MA0kWH8C1eo4AAPHkW25MCA3AT5YLlat8t5rmksUtzp27w4Cu0';
// // const parksRepo = adapter.createRepository(LBModelRepository, 'parks');
// // parksRepo.findById(12346).then((value) => { console.log(value); }, (error) => { console.log(error); });

# lb-js
使用loopback时可以使用；loopback js网络请求，使用axios做网络请求。
- 将src中的js文件导入
- 使用时如下所示

```
const adapter = new LBRESTAdapter(baseURL);
adapter.accessToken = 'oMuwrqVKYO7SH1ka2OdfwbaEJ74T1EHK6AG1ZuGOaJBTZkCbB4AZlj6J0aOeXPQ6';
const parksRepo = adapter.createRepository(LBModelRepository, 'parks');
parksRepo.findById(12346).then((value) => { console.log(value); }, (error) => { console.log(error); });
```

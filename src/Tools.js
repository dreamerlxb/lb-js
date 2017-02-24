/**
 * map -> obj
 */
export function mapToObj(map) {
    const obj = {};

    for (const [key, value] of map) {
        obj[key] = value;
    }
    return obj;
}

/**
 * obj -> map,
 * Function 除去
 */
export function objToMap(obj) {
    const map = new Map();
    for (const key in obj) {
        const value = obj[key];
        if (!(value instanceof Function)) {
            map.set(key, value);
        }
    }
    return map;
}

const baseUrl = 'http://91tkp.com:3001/api';//'http://markhere.cn:80/api/';
export default baseUrl;

// export {
//     mapToObj,
//     objToMap,
// };

// module.exports = {
//     mapToObj,
//     objToMap,
// };

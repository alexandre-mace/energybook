function stringToHex(tmp) {
    var str = '';
    for(var i = 0; i < tmp.length; i++) {
        str += tmp[i].charCodeAt(0).toString(36);
    }
    return str;
}
export default stringToHex

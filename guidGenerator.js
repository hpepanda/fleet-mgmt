/**
 * Created by ashemyakin on 5/30/2016.
 */

module.exports.generateGUID = function () {
    var d = Date.now();
    var uuid = 'xxxxxxxxxxxx4xxxyxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

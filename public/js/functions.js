
getCountsO = function(results) {
    var o = 0;
    for (var i in results) {
        var scanTimeInMilliSec = new Date(results[i].time).getTime() - 32400000;
        if (results[i].time != null && scanTimeInMilliSec >= new Date().getTime() - 300000) {
            o++;
        }
    }

    return o;
}

getCountsX = function(results) {
    var x = 0;
    for (var i in results) {
        var scanTimeInMilliSec = new Date(results[i].time).getTime() - 32400000;
        if (results[i].time == null || scanTimeInMilliSec < new Date().getTime() - 300000) {
            x++;
        }
    }

    return x;
}

module.exports = {
    getCountsO : getCountsO,
    getCountsX: getCountsX
}
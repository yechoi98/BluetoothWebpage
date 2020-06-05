
getCountsO = function(results, students) {
    var o = 0;
    if(results.length == 0 || students.length == 0) return o;
    for (var i in results) {
        var scanTimeInMilliSec = new Date(results[i].time).getTime() - 32400000;
            if (results[i].time != null && scanTimeInMilliSec >= new Date().getTime() - 300000) {
                o++;
            }
    }

    return o;
}

getCountsX = function(results, students) {
    var x = 0;
    if(results.length == 0 || students.length == 0) return students.length;
    for (var i in results) {
        var scanTimeInMilliSec = new Date(results[i].time).getTime() - 32400000;
        if (results[i].time != null && scanTimeInMilliSec <= new Date().getTime() - 300000) {
            x++;
        }
    }

    return x;
}

module.exports = {
    getCountsO : getCountsO,
    getCountsX: getCountsX
}
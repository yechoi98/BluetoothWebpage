
getCountsO = function(results, students) {
    var o = 0;
    if(results.length == 0 || students.length == 0) return o;
    for (var i in results) {
        for (var j in students) {
            if(students[j].mac == results[i].mac) {
                var scanTimeInMilliSec = new Date(results[i].time).getTime() - 32400000;
                if (results[i].time != null && scanTimeInMilliSec >= new Date().getTime() - 300000) {
                    o++;
                }
            }
        }
    }

    return o;
}

getCountsX = function(results, students) {
    if(results.length == 0 || students.length == 0) return students.length;
 
    return students.length - getCountsO(results, students);
}

module.exports = {
    getCountsO : getCountsO,
    getCountsX: getCountsX
}
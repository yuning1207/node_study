// const fs = require('fs');
// const child_process = require('child_process');

// for (let i = 0; i < 3; i++) {
//     var workerprocess = child_process.fork('supprot.js', [i]);
//     workerprocess.on('close', (code) => {
//         console.log('进程已退出，退出码为：' + code);
//     })
// }
const fs = require('fs');
const child_process = require('child_process');

for (var i = 0; i < 3; i++) {
    var worker_process = child_process.fork("support.js", [i]);

    worker_process.on('close', function(code) {
        console.log('子进程已退出，退出码 ' + code);
    });
}
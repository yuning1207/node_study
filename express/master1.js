const fs = require('fs');
const child_process = require('child_process');


for (var i = 0; i < 3; i++) {
    var workerprocess = child_process.spawn('node', ['support.js', i]);
    workerprocess.stdout.on('data', (data) => {
        console.log('stdout:' + data);
    });
    workerprocess.stderr.on('data', (data) => {
        console.log('stderr:' + data);
    });
    workerprocess.on('close', (code) => {
        console.log('进程已退出，退出码为：' + code);
    })
}
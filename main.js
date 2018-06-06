// process.on('exit', (code) => {
//     setTimeout(() => {
//         console.log('不会执行');
//     }, 0);
//     console.log('退出码为：' + code);
// })
// process.stdout.write('Hello world\n');
// process.argv.forEach((val, index, array) => {
//     console.log(index + ':' + val);
// });
// console.log(process.execPath);
// console.log(process.platform);
// console.log(process.cwd());
// console.log(process.version);
// console.log(process.memoryUsage());
// console.log('程序执行完毕');
// const util = require('util');

// function Base() {
//     this.name = 'base';
//     this.base = 1991;
//     this.sayname = function() {
//         console.log('hello ' + this.name);
//     };
// };
// Base.prototype.showname = function() {
//     console.log(this.name);
// };

// function Sub() {
//     this.name = 'sub';
// };
// util.inherits(Sub, Base);
// var people1 = new Base();
// people1.sayname();
// people1.showname();
// console.log(people1);
// var people2 = new Sub();
// people2.showname();
// console.log(people2);
// console.log(util.inspect(people1));
// console.log(util.inspect(people1, true));
// console.log(util.isArray(people1));
// console.log(util.isRegExp(people1));
// console.log(util.isDate(people1));
// console.log(util.isError(new Error()));
// const fs = require('fs');

// console.log('准备打开文件');
// //异步打开文件
// fs.open('input.txt', 'r+', (err, fd) => {
//     if (err) {
//         console.error(err);
//     }
//     console.log('文件打开成功');
// });
// //获取文件信息
// fs.stat('input.txt', (err, stats) => {
//     if (err) {
//         console.error(err);
//     }
//     console.log(stats);
//     console.log('is file? ' + stats.isFile());
//     console.log('is derictior? ' + stats.isDirectory());
// });
// //写入文件
// fs.writeFile('input.txt', '我是从main.js中向input.txt写入的数据', (err) => {
//     if (err) {
//         console.error(err);
//     }
//     console.log('写入成功');
//     console.log('分割线');
//     fs.readFile('input.txt', (err, data) => {
//         if (err) {
//             console.error(err);
//         }
//         console.log('input.txt中的数据是： ' + data);
//     })
// })
//读取文件
// const buf = new Buffer(124);
// fs.open('input.txt', 'r+', (err, fd) => {
//     if (err) {
//         console.error(err);
//     }
//     console.log('文件打开成功');
//     console.log('截取了10字节后的文件内容');
//     fs.ftruncate(fd, 10, (err) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log('文件截取成功');
//         fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
//             if (err) {
//                 console.error(err);
//             }
//             console.log(bytes + '字节被读取');
//             if (bytes > 0) {
//                 console.log(buf.slice(0, bytes).toString());
//             };
//             fs.close(fd, (err) => {
//                 if (err) {
//                     console.log(err);
//                 }
//                 console.log('文件关闭成功');
//             })
//         });
//     });
// });
// console.log('创建目录  test/');
// fs.mkdir("test/", (err) => {
//     if (err) {
//         console.error(err);
//     };
//     console.log('目录创建成功');
// });
// console.log('查看deploy目录');
// fs.readdir('deploy/', (err, files) => {
//     if (err) {
//         console.error(err);
//     };
//     files.forEach((file) => {
//         console.log(file);
//     })
// });
// console.log('准备删除目录test/');
// fs.rmdir('test', (err) => {
//     if (err) {
//         console.error(err);
//     };
//     console.log('目录test删除成功');
// })

const http = require('http');
const querystring = require('querystring');
var postHTML = '<html><head><title>菜鸟教程</title><meta charset="utf-8"></head><body><form method="post">网站名：<input name="name"></br>网址：<input name="url"><input type="submit"></form></body></html>';
// var postHTML =
//     '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
//     '<body>' +
//     '<form method="post">' +
//     '网站名： <input name="name"><br>' +
//     '网站 URL： <input name="url"><br>' +
//     '<input type="submit">' +
//     '</form>' +
//     '</body></html>';
http.createServer((req, res) => {
    var body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {

        body = querystring.parse(body);
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        if (body.name && body.url) { // 输出提交的数据
            res.write("网站名：" + body.name + '</br>');
            res.end("网站 URL：" + body.url);
        } else { // 输出表单
            res.end(postHTML);
        }
    })
}).listen(3000);
// function fn1(data, fun2) {
//     console.log('执行了fn1函数');
//     fun2(data);
//     return data + 1;
// }

// function fn2(data, fun1) {
//     console.log('执行了fn2函数');
//     return fun1(data);
// }

// console.log(fn2(2, function(data) {
//     fn1(data, function(msg) {
//         console.log(msg);
//     });
// }));
// function heavyCompute(n) {
//     var count = 0;
//     var i, j;
//     for (i = n; i > 0; i--) {
//         for (j = n; j > 0; j--) {
//             count += 1;
//         }
//     }
// }
// var t = new Date();
// setTimeout(function() {
//     console.log(new Date() - t);
// }, 1000);
// heavyCompute(50000);
// console:5729

// function a(call) {
//     call();
//     console.log('执行了a函数');
// }

// function b() {
//     console.log('执行了b函数');
// }
// a(b);

// (function next(i,len,callback){
//     if(i<len){
//         async(arr[i],function(value){
//             arr[i]=value;
//             next(i+1,len,callback);
//         });
//     }else{
//         callback();
//     }
// }(0,arr.length,function(){
//     console.log('1');
// }));
// function async(fn, callback) {
//     setTimeout(function() {
//         try {
//             callback(null, fn());
//         } catch (err) {
//             callback(err);
//         }
//     }, 1000)
// }
// async(null, function(err, data) {
//     if (err) {
//         console.log('Error:' + err.message);
//     } else {
//         console.log('成功');
//     }
// })
// process.on('uncaughtException', function(err) {
//     console.log('Error:' + err.message);
// });
// setTimeout(function(fn) {
//     fn();
// });
function async(request,callback){
    //do something
    asyncA(request,function(data){
        //do something
        asyncB(request,function(data){
            //do something
            asyncC(request,function(data){
                //do something
                callback(data);
            })
        })
    })
};
http.createServer(function(request,response){
    //使用.create方法创建了一个子域对象
    var d=domain.create();
    d.on('error',function(){
        response.writeHead(500);
        response.end();
    });
    //通过.run方法进入需要在子域中运行的代码的入口点
    d.run(function(){
        async(request,function(data){
            response.writeHead(200);
            response.end(data);
        })
    })
})
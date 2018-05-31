http.createServer(function(request,response){
    var body=[];
    console.log(request.method);
    console.log(request.headers);
    request.on('data',function(chunk){
        body.push(chunk);
    });
    request.on('end',function(){
        body=Buffer.concat(body);
        console.log(body.toString());
    });
}).listen(80);
http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text.plain'});
    request.on('data',function(chunk){
        response.write(chunk);
    });
    request.on('end',function(){
        response.end();
    });
}).listen(80);
var options={
    hostname:'www.example.com',
    port:80,
    path:'/upload',
    method:'POST',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }
};
//.request方法创建了一个客户端，并指定请求目标和请求头数据
//当客户端发送请求并接受到完整的服务端响应头时，就会调用回调函数
//在回调函数中，可以使用response对象访问响应头数据，还能把它当作一个只读数据流来访问响应体数据。
var request=http.request(options,function(response){});
//把request对象当作一个只写数据流来写入请求体数据和结束请求
request.write('hello world');
request.end();
//get便捷api
http.get('http://www.example.com/',function(response){
    var body = [];
    response.on('data', function (chunk) {
        body.push(chunk);
    });
    response.on('end', function () {
        body = Buffer.concat(body);
        console.log(body.toString());
    });
});
http.createServer(callback).listen(80,function(){
    var env=ProcessingInstruction.env,
    //通过sudo获取root权限的，运行程序的用户的UID和GID保存在环境变量SUDO_UID和SUDO_GID里边
    //通过chmod +s方式获取root权限的，运行程序的用户的UID和GID可直接通过process.getuid和process.getgid方法获取。
    //process.setuid和process.setgid方法只接受number类型的参数。
    uid=parseInt(env['SUDO_UID']||process.getuid(),10),
    gid=parseInt(env['SUDO_GID']||process.getgid(),10);
    //降权时必须先降GID再降UID，否则顺序反过来的话就没权限更改程序的GID了。
    process.setgid(gid);
    process.setuid(uid);
});
var child=child_process.spawn('node',['xxx.js']);
child.stdout.on('data',function(data){
    console.log('stdout:'+data);
});
child.stderr.on('data',function(data){
    console.log('stderr:'+data);
});
child.on('close',function(code){
    console.log('child process exited with code'+code);
});
//parent.js
var child=child_process.spawn('node',['child.js']);
//父进程通过.kill方法向子进程发送SIGTERM信号
//.kill方法本质上是用来给进程发送信号的，进程收到信号后具体要做啥，完全取决于信号的种类和进程自身的代码
child.kill('SIGTERM');
//child.js
//子进程监听process对象的SIGTERM事件相应信号。
process.on('SIGTERM',function(){
    cleanUp();
    process.exit(0);
});
//parent.js
//父进程在创建子进程时，在options.stdio字段中通过ipc开启了一条IPC通道
var child=child_process.spawn('node',['child.js'],{
    stdio:[0,1,2,'ipc']
});
child.on('message',function(msg){
    console.log(msg);
});
//通过.send方法给子进程发送消息
child.send({hello:'hello'});
//child.js
process.on('message',function(msg){
    msg.hello=msg.hello.toUpperCase();
    //并通过.send方法向父进程发送消息
    //数据在传递过程中，会先在发送端使用JSON.stringify方法序列化，再在接收端使用JSON.parse方法反序列化。
    process.send(msg);
});
function spawn(mainModule){
    var child=child_process.spawn('node',[mainModule]);
    child.on('exit',function(code){
        //工作进程非正常退出时，守护进程立即重启工作进程
        if(code!==0){
            spawn(child.js);
        }
    });
};
spawn('child.js');
function fn1(data){
    console.log('执行了fn1函数');
    return data+1;
}
function fn2(data){
    console.log('执行了fn2函数');
    return data;
}
var output=fn1(fn2(2));
const http=require('http');

const server=http.createServer((req,res)=>{
    res.end("hello from the other side");
});
server.listen(8000);
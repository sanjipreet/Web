const http=require('http');
const fs = require("fs");
const files = {
    "index.html":"../index.html"
    "":"../index.html"
    "style.css":"../index.css"
    "index.css":"../index.css"
}

const server = http.createServer((req, res)=>{
    const url = new URL(req.url, "http://google.de");
    
    if(files[url.pathname]){
        const path=files[url.pathname];
        const file=fs.readFileSync(path);
        res.end(file);
    }else{
        res.writeHead(404,{});
        res.end()
    }
})

server.listen(8080, ()=>{
    console.log("Server is active on Post 8080")
})
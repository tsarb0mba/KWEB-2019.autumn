const http = require('http');
const calc = require('./calc');
const url=require('url');
const querystring=require('querystring');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => { 
    res.statusCode = 200; 
    res.setHeader('Content-Type', 'text/plain'); 
    
    let query = querystring.parse(url.parse(req.url).query); 
    let pathname=url.parse(req.url).pathname;//catch하려고

    let num1 = parseInt(query.a);
    let num2 = parseInt(query.b);
    let op = query.operator;
    
    try{
        let result=calc[op](num1, num2);
        res.end("result");
    }
    catch{
        if(pathname!=='/')
            res.end("Page not found");
        else if(!query.a||!query.b||!query.operator)
            res.end("!");
    }
    
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
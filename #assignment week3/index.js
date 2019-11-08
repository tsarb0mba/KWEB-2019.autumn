const http = require('http');
const calc = require('./calc.js');
const url=require('url');
const querystring=require('querystring');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => { 
    res.statusCode = 200; 
    res.setHeader('Content-Type', 'text/plain'); 
    
    let query = querystring.parse(url.parse(req.url).query); 
    let pathname=url.parse(req.url).pathname;//문제가 체크

    let a = parseInt(query.a);
    let b = parseInt(query.b);
    let op = query.operator;
            res.end("Page not found");

    if(!query.a||!query.b||!query.operator)//오류체크
        res.end("Invalid Query!");
    else if(pathname!=='/')//오류체크
        res.end("Page not found");
    else{//연산
        if(op == 'add') res.end(calc.add(a,b));
        else if(op == 'sub') res.end(calc.subtract(a,b));
        else if(op == 'mult') res.end(calc.mult(a,b));
        else if(op == 'div') res.end(calc.div(a,b));
    }
    
    
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
const http = require('http');
const axios=require('axios');
const url=require('url');
const querystring=require('querystring');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => { 
    res.statusCode = 200; 
    res.setHeader('Content-Type', 'text/plain'); 
    
    let query=querystring.parse(req.url).query;
    let the_url="https://api.github.com/repos/"+query.repo;
    let pathname=url.parse(req.url).pathname;//catch하려고

    axios.get(the_url)
        .then(function(response){
            let repo=query.repo;
            let stargazers=response.data.stargazers_count;
            let openissue=reponse.data.open_issues_count;
            let result="repo:"+repo+"\n"+"stargazers_count:"+stargazers+"\n"+"onpen_issues_count:"+onpenissue;
            res.end(result);
        })
        .catch(function(error){//pathname이 틀릴때, 올바른 저장소가 아닐때, query아 올바르지 않을 경우
            if(!query.repo)
                res.end("Invalid query")
            else if(pathname!=='/')
                res.end("Page not found")
            else
                res.end("Repository not found");
        })
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
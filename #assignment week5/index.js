const express = require('express');
const bodyParser = require('body-parser'); 

const app = express();
const port = 3000;

const diaryBook=[];
function diary(id,title,isActive){
    this.id= id;
    this.title=title;
    this.isActive=isActive;
}
let msg404 = 'Response  |404<br>';
let msg200="<br>"+"Response  |200"+"<br>";
let id=0;


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send("Request    |GET/"+msg200+"Welcom to my diary\n"));
app.get('/diaries',(req,res)=>{
    if(diaryBook.length===0)
        res.send("Request   |GET/"+msg200+"No diary written!");
    else
            res.end("Request    |GET/"+msg200+Object.keys(diaryBook).map(k => `#${k}: ${diaryBook[k].title} (${diaryBook[k].isActive})`).join('\n'));
});
app.get('/diary/:title',(req,res)=>{
    //res.end(req.params.title);
    diaryBook[id]=new diary(id++,req.params.title,true);
    res.send('Request    |POST /diary| title='+req.params.title+msg200+"Added Diary #"+id+": "+req.params.title+" "+"("+diaryBook[id-1].isActive+")");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('GET /'));
app.listen(port, () => console.log(`Week 5 practice server is working...`));
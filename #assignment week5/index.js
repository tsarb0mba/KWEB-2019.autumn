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
            res.send("Request    |GET/"+msg200+Object.keys(diaryBook).map(k => `#${k}: ${diaryBook[k].title} (${diaryBook[k].isActive})`).join('\n'));
});
app.get('/diary', (req, res) => {
    const query = req.query;
    res.redirect(`/diary/${Object.values(query)[0]}`);
});
app.get('/diary/:id',(req,res)=>{
    //res.end(req.params.title);
    if(!diaryBook[req.params.id]){
        res.send("Request   |GET /diarg/${req.params.id}"+msg404+"Diary #${req.params.id} dose not exist!");
    }
    else{
        if(diaryBook[req.params.id].isActive===flase)
            res.send('Request    |GET /diary/${req.params.id}'+msg200+"Diary #${req.params.id} is already been deleted");
        else 
            res.send('Request    |GET /diary| id=${req.params.id}'+msg200+"${req.params.id}: ${diaryBook[req.params.id].title} (${diaryBook[req.params.id].isActive})");
    }
});

app.post('/diary',(req,res)=>{
    diaryBook.push(id=id, title=req.body.title,isActive=true);
    res.send("Request   | POST /diary | title=${req.body.title}"+msg200+"Added Diary #${diaryBook[id]}: ${req.body.title} (${diaryBook[id].isActive}) ");
    id++;
});
app.put('/diary',(req,res)=>{});
app.delete('/diary',(req,res)=>{});


app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('GET /'));
app.listen(port, () => console.log(`Week 5 practice server is working...`));
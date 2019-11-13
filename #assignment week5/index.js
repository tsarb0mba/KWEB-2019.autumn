const express = require('express');
const bodyParser = require('body-parser'); 

const app = express();
const port = 3000;

const diaryBook=[];


let msg404 = '<br>Response  |404<br>';
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
    if(!diaryBook[req.params.id]){
        res.send("Request   |GET /diary/${req.params.id}"+msg404+"Diary #${req.params.id} dose not exist!");
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
 
app.put('/diary',(req,res)=>{
    if(!diaryBook[req.body.id])
        res.send("Request   | PUT /diary | id=${res.body.id} title={res.body.title}"+msg404+"Diary does not exist!");
    else if(diaryBook[req.body.id].isActive[false])
        res.send("Request   | PUT /diary | id=${res.body.id} title={res.body.title}"+msg200+"Diary #${req.body.id} has already been deleted");
    else{
        diaryBook[req.body.id].title=req.body.title;
        res.send("Request   | PUT /diary | id=${res.body.id} title={res.body.title}"+msg200+"Changed Diary #${req.body.id}: ${req.body.title} (true)");
    }
});
app.delete('/diary',(req,res)=>{
    if(!diaryBook[req.body.id])
        res.send("Request   | DELECT /diary | id=${res.body.id}"+msg404+"Diary does not exist!");
    else if(diaryBook[req.body.id].isActive[false])
        res.send("Request   | DELECT /diary | id=${res.body.id}"+msg200+"Diary #${req.body.id} has already been deleted");
    else{
        diaryBook[req.body.id].title='';
        diaryBook[req.body.id].isActive=false;
        res.send("Request   | DELECT /diary | id=${res.body.id}"+msg200+"Deleted diary #${req.body.id}: (${diaryBook[req.body.id].isActive}");
    }
});



app.listen(port, () => console.log(`Week 5 practice server is working...`));
const { response } = require('express');
const express = require('express');
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const courses = [
    {id:1,name:'cour1'},
    {id:2,name:'cour2'},
    {id:3,name:'cour3'},
];

app.get('/',function(req,res){
    res.send('Hello World !!!!');
});
app.get('/api/courses',function(req,res){

    res.send([1,2,3]);
});

app.post('/api/courses',function(req,res){
    const course  = {
        id: course.length + 1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
});



app.listen(port,function(){
    console.log(`listening on port ${port}....`);
})
// app.post();
// app.put();
// app.delete();
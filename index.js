const fs = require('fs');

const Promise = require('bluebird');
const pdf = Promise.promisifyAll(require('html-pdf'));
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
app.use(express.json());
app.use(bodyParser.text({ type: 'text/html' }))
var phantomjs = require('phantomjs-prebuilt');



const port = process.env.PORT || 3000;

const courses = [
    { id: 1, name: 'cour1' },
    { id: 2, name: 'cour2' },
    { id: 3, name: 'cour3' },
];

app.get('/', function (req, res) {
    res.send('Hello World !!!!');
});
app.get('/api/courses', function (req, res) {

    res.send([1, 2, 3]);
});

app.post('/api/courses', function (req, res) {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
app.post('/api/htmlbody', async function (req, res) {
    let htmlBody = req.body.htmlbody;
    const file_name = req.body.name || 'unknown';
    const options = { phantomPath: './node_modules/phantomjs-prebuilt/lib/phantomjs',format:'A4',header: {  "height": "5mm"},footer: { "height": "5mm"}, border:{top:'10px',bottom:'10px',left:'20px',right:'20px'}};
    console.log(htmlBody);
    if(!htmlBody){
        htmlBody = req.body;
    }

    pdf.create(htmlBody,options).toBuffer(function(err, buffer){
        res.type('application/pdf');
        res.end(buffer, 'binary');
    });


    // received the html // use html to create pdf  // dowenload pdf 
    // pdf.createAsync(htmlBody, { format: 'A4', filename: 'something.pdf' }).then(() => {
    //     res.download(`${__dirname}/something.pdf`, `${file_name}.pdf`, function (err) {
    //         if (err) {
    //             // Handle error, but keep in mind the response may be partially-sent
    //             // so check res.headersSent
    //             console.log(err);
    //         } else {
    //             // decrement a download credit, etc.
    //         }
    //     })
    // })
});





app.listen(port, function () {
    console.log(`listening on port ${port}....`);
})
// app.post();
// app.put();
// app.delete();
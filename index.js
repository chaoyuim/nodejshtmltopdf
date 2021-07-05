const fs = require('fs');
const options = { format: 'A4' };
const Promise = require('bluebird');
const pdf = Promise.promisifyAll(require('html-pdf'));

const express = require('express');
const app = express();
app.use(express.json());




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
    const htmlBody = req.body.htmlbody;
    const file_name = req.body.name || 'unknown';
    console.log(htmlBody);

    // received the html
    // use html to create pdf 
    // dowenload pdf 

    pdf.createAsync(htmlBody, { format: 'A4', filename: 'something.pdf' }).then(() => {

        res.download(`${__dirname}/something.pdf`, `${file_name}.pdf`, function (err) {
            if (err) {
                // Handle error, but keep in mind the response may be partially-sent
                // so check res.headersSent
                console.log(err);
            } else {
                // decrement a download credit, etc.
            }
        })
    })

    // await pdf.create(htmlBody, options).toFile('./temp.pdf', function (err, res) {
    //     if (err) {
    //         res.send(err);
    //         return console.log(err)
    //     };
    //     console.log(res);
    // });

});





app.listen(port, function () {
    console.log(`listening on port ${port}....`);
})
// app.post();
// app.put();
// app.delete();
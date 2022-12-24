var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

var file_ops = require(path.join(__dirname, '/src/file_ops.js'));
var tesseract_ops = require(path.join(__dirname, '/src/tesseract_ops.js'));

const app = express();
const port = process.env.PORT || 8080;


// app.use(bodyParser.json());
/* app.use(bodyParser.urlencoded({
    extended: true
})); 
*/


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/static/html/index.html"));
});

app.get('/base.css', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/css/base.css"));
});

app.get('/base.js', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/js/base.js"))
});



app.post('/', function (req, res) {

    // console.log(req);

    file_ops.upload(req, res, function (err) {
        console.log(req.file.path);
        console.log("Tesseract: " + req.file.path);
        tesseract_ops.convertToText(req.file.path).then((text) => {
            console.log(text);
            file_ops.delFile(req.file.path);
            res.setHeader('Content-type', "application/octet-stream");
            res.setHeader('Content-disposition', 'attachment; filename=' + req.file.filename + ".txt");
            return res.send(new Buffer(text));
            // return res.send(text);
        });


    });
});
app.listen(port);
console.log("HTTP Server listening on port " + port);


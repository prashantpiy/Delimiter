const express = require('express')
const multer = require("multer")
var cors = require('cors');
const app = express();
app.use(cors());
upload_middleware = multer({dest: './tmp'}),
    form_element_name = 'file';


app.post('/get-file',upload_middleware.single(form_element_name), (req, res) => {
    var fs = require("fs");

    var data = fs.readFileSync(`${req.file.path}`, 'utf8');

    res.status(200)
        .send(data);});


app.listen(4000, () => {
    console.log('App listening on port 4000!')
});

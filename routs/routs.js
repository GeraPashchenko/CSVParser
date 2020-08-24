const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})
const fs = require('fs');
const {UserModel} = require('../mongooseSchema/userSchema');
const {parseSave} = require('../functionModules/parseCSV&SaveToDB');
const {jsonToCSV} = require('../functionModules/jsonToCSV');

module.exports.app = (app) => {

    app.get('/', (req, res) => {
        res.render('index.html');
    });

    app.post('/upload', upload.single('users'), async (req, res) => {
        let csvFileString = req.file.buffer.toString('utf8');
        let usersArr = csvFileString.split('\n');
        parseSave(usersArr, UserModel);
        res.redirect('/');
    });

    app.get('/getUsers', (req, res) => {
        UserModel.find({}, (err, doc) => {
            if (err) return console.log(err);
            res.send(doc);
        });
    });

    app.get('/getFile', (req, res) => {

        UserModel.find({}, (err, usersObjs) => {
            if (err) return console.log(err);
            let csvData = jsonToCSV(usersObjs);
            let fileName = `${new Date().getTime()}.csv`;

            fs.writeFileSync(__dirname + '/' + fileName, csvData);

            res.download(__dirname + '/' + fileName, ()=>{
                fs.unlink(__dirname + '/' + fileName, (err) => {
                    if (err) throw err;
                });
            });
        });
    });

}
const express = require('express')
const multer = require('multer');
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const app = express();



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))

const saveDirectory = './public/upload'
const directory = 'public/upload'

const storage = multer.diskStorage({
    // create folder with name current date and time
    destination: (req, file, cb) => {
        const filePath = `${saveDirectory}/${Date.now()}`
        fs.mkdirSync(filePath, { recursive: true })
        return cb(null, filePath)
    },
    
    filename: (req,file,cb)=>{
        return cb(null, `${file.originalname}`)
    }
})

const upload = multer({
    storage:storage,
    limits: { fileSize: 10 * 1024 * 1024 }, //10MB
})

app.post('/upload_file',upload.single('my_file'),(req,res)=>{
        console.log(req.body.my_file)
        res.json({
            "status": "ok",
            "file_path": `${directory}/${Date.now()}/`
        })
})

app.get('/download_file',(req,res)=>{
    const path = req.query.file_path 
    
    //verify if file exists or no
    if(fs.existsSync(path)){
        res.download(path)
    }
    else{
        res.sendStatus(404)
    }
})

app.listen(PORT,function() {
    console.log(`Listening on port ${PORT}`);
})


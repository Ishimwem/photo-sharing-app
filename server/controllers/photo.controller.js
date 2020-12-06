const mongoose = require('mongoose');
const multer  = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');


const connection = mongoose.createConnection('mongodb://localhost:27017/photo-sharing', {
    useNewUrlParser: true,
    useUnifiedTopology: true });

connection.on("error", () => {
    console.log("[-] Error occurred from the database");
});
      
let gfs, gridFSBucket;
      
connection.once("open", () => {
    gridFSBucket = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: "file_uploads"
    });
    // Initialize stream
    gfs = Grid(connection.db, mongoose.mongo);;
    gfs.collection("file_uploads");
    console.log("[!] The database connection opened successfully in GridFS service");
});
      

function getPhoto(req, res) {
    gfs.files.findOne({filename: req.params.name}, (err, file) =>{
        if(!file || file.length === 0) {
            return res.status(404).json({
           err: 'No file exist'
            });
        }
        else{
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        }
    });

}

function getAllPhotos(req, res) {
    gfs.files.find().toArray((err, files) =>{
      if(!files || files.length === 0) {
          return res.status(404).json({
            err: "No file exist"
          });
      }
      return res.json(files);
    });
}


// const createGridFSReadStream = id => {
// return gridFSBucket.openDownloadStream(mongoose.Types.ObjectId(id));
// };


const storage = new GridFsStorage({
    url: 'mongodb://localhost:27017/photo-sharing',
    file: (req, file) => {
        return new Promise(resolve => {
        const fileInfo = {
            filename: file.originalname,
            bucketName: "file_uploads"
        };
        resolve(fileInfo);
        });
    }
});

storage.on("connection", () => {
    console.log("[!] Successfully accessed the GridFS database");
});

storage.on("connectionFailed", err => {
    console.log(err.message);
});

const upload = multer({ storage });

uploadFile = upload.single('photo');
// function uploadFile(req, res) {
//     res.send('Getting into uploadPhoto');

// }

function uploadPhoto(req, res) {
    uploadFile(req, res, (err) => {
      if(err){
          return res.status(400).send(err);
      }
      //res.status(200).send("File has been uploaded")
      res.status(200).send({
          file: req.file,
          message: "File has been uploaded"
      })
    });
};
module.exports = { uploadPhoto, getPhoto, getAllPhotos };


//module.exports = mongoose;
//module.exports.getGridFSFiles = getGridFSFiles;
//module.exports.createGridFSReadStream = createGridFSReadStream;



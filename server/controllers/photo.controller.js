const mongoose = require('mongoose');
const util = require("util");
const multer  = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');

let gfs, gridFSBucket;

const getConnection = async () => { 
    try {
        await mongoose.connect('mongodb://localhost:27017/photo-sharing', { useNewUrlParser: true });
        console.log('Connection to MongoDB successful');
    } catch (error) {
        console.log('Error in MongoDb connection: ' + error);
    }
 };

 getConnection();

mongoose.connection.on("error", () => {
    console.log("Error occurred from the database");
});
      
mongoose.connection.once("open", () => {
    gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "photos"
    });
    // Initialize stream
    gfs = Grid(mongoose.connection.db, mongoose.mongo);;
    gfs.collection("photos");
    console.log("Initialized file stream to GridFS");
});

//Configure storage: to be used for uploading pictures
const storage = new GridFsStorage({
    url: 'mongodb://localhost:27017/photo-sharing',
    file: (req, file) => {
        return new Promise(resolve => {
            const fileInfo = {
                filename: file.originalname,
                bucketName: "photos"
            };
            resolve(fileInfo);
        });
    }
});

storage.on("connection", () => {
    console.log("Connected to GridFS storage");
});

storage.on("connectionFailed", error => {
    console.log("Connection to GrifFS strorage failed: " + error.message);
});

      
function retrievePhotoFromDb(id) {
    return new Promise((resolve, reject) => {
        gfs.files.findOne({_id: mongoose.Types.ObjectId(id)}, (error, file) =>{
            if (error){
                reject(error);
            }
            if(!file || file.length === 0) {
                resolve(null)
            } else {
                resolve(file);     
            }
        });
    });
};

//create next for function that handles error
async function getPhoto(req, res){
    try{
        file = await retrievePhotoFromDb(req.params.id);
        if (!file){
            return res.status(404).json({
                error: 'Photo does not exist'
            });
        }

        //might need some promise or its own function that returns a promise and use await/async
        const readstream = gridFSBucket.openDownloadStream(mongoose.Types.ObjectId(file._id));
        readstream.pipe(res);

    } catch {
        console.log('Error in retrieving the photo: ' + error);
        res.status(404).json({
            error: "Error in getting photo"
        });

    }
}

function retrievePhotosFromDb(){
    return new Promise((resolve, reject) => {
        gfs.files.find().toArray((error, files) =>{
            if (error){
                reject(error);
            }
            if(!files || files.length === 0) {
                resolve(null)
            } else {
                resolve(files);     
            }
        });
    });
};

async function getAllPhotos(req, res) {
    try{
        files = await retrievePhotosFromDb();
        if (!files){
            res.status(404).json({
                error: 'No available photos'
            });
        }
        res.status(200).json(files);

    } catch {
        console.log('Error in retrieving photos: ' + error);
        res.status(404).json({
            error: "Error getting photos"
        });

    }
}


function deletePhoto(req, res) {
    try{
        //maybe promisify this too???
        gridFSBucket.delete(mongoose.Types.ObjectId(req.params.id));
        res.status(200).json({
            message: "Photo successfully deleted"
        });

    } catch (error){
        //maybe use next(error) to pass them to express
        console.log('Error in deleting photo: ' + error);
        res.status(400).json({
            error: "Error deleting photo"
        });
    }
    
}

async function uploadPhoto(req, res) {
    try {
        const upload = util.promisify(multer({ storage }).single('photo'));
        await upload(req, res);
        res.status(200).json({
            file: req.file,
            message: "Photo has been uploaded"
        });

    } catch {
        console.log('Error uploading photo: ' + error);
        res.status(400).json({
            error: "Error uploading photo"
        });
    }
    


}

module.exports = { uploadPhoto, getPhoto, getAllPhotos, deletePhoto };




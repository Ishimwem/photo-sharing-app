//will contain all the backend routing
const express = require('express');
const router = express.Router();
const photoController = require("../controllers/photo.controller");


router.get('/photos', (req, res, next) => {
    //res.send("Hello World");
    photoController.getPhotos(req, res);
});

router.post('/photos', (req, res) => {
    photoController.uploadPhoto(req, res);
});

router.get('/photos/:id', (req, res) => {
    photoController.getPhoto(req, res);
});

router.delete('/photos/:id', (req, res) => {
    photoController.deletePhoto(req, res);
});

module.exports = router;
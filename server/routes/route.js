//will contain all the backend routing
const express = require('express');
const router = express.Router();
const photoController = require("../controllers/photo.controller");


router.get('/', (req, res, next) => {
    //res.send("Hello World");
    photoController.getAllPhotos(req, res);
});

router.post('/photo', (req, res) => {
    photoController.uploadPhoto(req, res);
});

router.get('/photo/:name', (req, res) => {
    photoController.getPhoto(req, res);
});

module.exports = router;
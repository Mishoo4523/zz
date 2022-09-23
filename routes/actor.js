const express = require("express");
const{createActor, updateActor, removeActor, searchActor, getLatesActor, getSingleActor }= require("../controllers/actor");
const { isAuth, isAdmin } = require("../middlewares/auth");
const {uploadImage} = require ("../middlewares/multer");
const { actorInfoValidator , validate } = require("../middlewares/validator");
const router = express.Router();


router.post(
    '/create',
    isAuth,
    isAdmin,
    uploadImage.single("avatar") ,
    actorInfoValidator,
    validate,
    createActor
    );

    router.post(
        '/update/:actorId',
        uploadImage.single('avatar') ,
        actorInfoValidator,
        validate,
        updateActor
        );

    router.delete('/:actorId',isAuth , isAdmin, removeActor);
    router.get('/search',isAuth, isAdmin, searchActor);
    router.get("/latest-uploads",isAuth,isAdmin,   getLatesActor);
    router.get("/single/:id",getSingleActor);

module.exports=router;

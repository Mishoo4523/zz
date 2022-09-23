
const {check, validationResult} = require("express-validator");
//const { errorMonitor } = require("nodemailer/lib/xoauth2");
const {isValiObjectId}=require("mongoose");
const genres = require("../utils/genres");

exports.userValidtor = [
check("name").trim().not().isEmpty().withMessage('Name is missing'),
check('email').normalizeEmail().isEmail().withMessage("Email is invalid!"),
check('password')
.trim()
.not()
.isEmpty()
.withMessage("Password is missing!")
.isLength({min:8, max:20})
.withMessage('Password must be 8 Characters at least!')
,
] ; 


exports.actorInfoValidator = [
    check("name").trim().not().isEmpty().withMessage("Name is missing!"),
    check("about").trim().not().isEmpty().withMessage("about  is required field!"),
    check("gender").trim().not().isEmpty().withMessage("Gender is required field!"),
] ;

exports.validateMovie = [
    check("title").trim().not().isEmpty().withMessage("Movie title is missing!"),
    check("storyLine").trim().not().isEmpty().withMessage("storyLine is Important!"),
    check("language").trim().not().isEmpty().withMessage("Language  is missing!"),
    check("releseDate").isDate().withMessage("Name is missing!"),
    check("status").trim().not().isEmpty().withMessage("Name is missing!"),
    check("releseDate").isIn(["public","private"]).withMessage("Relese date  is missing!"),
    check("type").trim().not().isEmpty().withMessage("Movie Type is missing!"),
    check("genres").isArray().withMessage("Genres must be array of strings!").custom((value) => {
        for (let g of value ) {
            if(!genres.includes(g)) throw Error ('Invalid genres!')
        }

        return true ;
    }),

    check("tags").isArray({min:1}).withMessage("tags must be an array of srings!")
    .custom((tags) => {
                for (let tag of tags ) {
                    if(typeof tag !=='string') throw Error ('tags must be an array of srings!')
        }
        return true ;
    }),

    check("cast").isArray().withMessage("Cast must be an array of objects").custom((value) => {
        for (let c of cast ) {
            if(!isValiObjectId(c.actor)) throw Error ('Invalid cast id inside cast!')
            if(!c.roleAs?.trim) throw Error ('Role as is missing iside cast!')
            if(typeof c.leadActor !=='boolean') throw Error('Only accepted boolean value inside leadActor inside cast!!')
        }
        return true ;
    }),
    check('trailer').isObject().withMessage("trailerInfo must be an object with url and public_id").custom(({url,public_id}) => {
            try{
                const result = new URL(url);
                if(!result.protocol.includes('http')) throw Error ('Trailer url is invalid!');
                const arr = url.split('/');
                const publicId = arr[arr.length - 1 ].split('.')[0];

                if(public_id !==publicId) throw Error('Trailer public_id is invalid!');

                return true ; 

             } catch (error){
                throw Error ('Trailer url is invalid!')

            }
        }),

        // check('poster').custom((_,[req])=> {
        //    if(!req.file) throw Error("Poster file is missing!"); 
        //    return true 
        // }),

    

];

exports.validate = (req,res,next) => {
    const error = validationResult(req).array();
    if(error.length){
       return  res.json({error: error[0].msg});
    }

    next();
};
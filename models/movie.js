const mongoose = require('mongoose');
const genres = require('../utils/genres');
const Movie = require ('../models/movie');

const movieSchema = mongoose.Schema({
title : { 
    type: String,
    trim: true,
    required: true,
},
storyLine:{
    type:String,
    trim:true,
    required:true,
},
director:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Actor',

},
releseDate : {
    type: Date,
    ref:'Actor',
},
status : {
    type: "string",
    required:true,
    enum: ['public','private']
},
type : {
    type: 'string',
    required:true,
},
genres : {
    type: ['string'],
    required:true,
    enum: genres,
},
tags : {
    type: [],
    required:true,
},
cast : [
    {
        actor: {type:mongoose.Schema.Types.ObjectId,ref:'Actor'},
        roleAs:String,
        leadActor:Boolean,
    }
    ],
    //cast = [{actor: ObjectId('12345'), roleAs:'Ethen',leadActor: true}]

writers : [
        {type:mongoose.Schema.Types.ObjectId,ref:'Actor'},
         
        ],

poster : {
       type:'object',
       url:{type:'string',required:true,},
       public_id: {type:'string',required:true},
       responsive:[URL],
       required:true,
     },
 trailer : {
        type:'object',
        url:{type:'string',required:true,},
        public_id: {type:'string',required:true},
        required:true,
      },

reviews : [{type:mongoose.Schema.Types.ObjectId,ref:'Review'}],
language : {
    type:'string',
    required:true
}

},{timestamps:true}

);

module.exports=mongoose.model("Movie",movieSchema);
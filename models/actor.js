
const mongoose=require('mongoose');

const actorSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        requires:true 
    }, 
    about :{
        type: String,
        trim: true,
        requires:true,
        
    }, 
    gender : {
        type: String,
        trim: true,
        requires:true ,
    },
    avatar : {
        type:"object",
        url: String,
        public_id:String ,
    }
}, 
{timestamps:true } 
);

actorSchema.index({name:"text"});

module.exports=mongoose.model("Actor", actorSchema);
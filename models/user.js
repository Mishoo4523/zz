
const mongoose=require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        requires:true 
    }, 
    email :{
        type: String,
        trim: true,
        requires:true,
        unique : true 
    }, 
    password : {
        type: String,
        requires:true 
    },
    // isVerified:{
    //    type:Boolean,
     //   required:true,
    //    default:false,
  //  },
    role:{
        type: String ,
        required:true,
        default: 'user',
        enum: [ 'admin','user']

    }

});


userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password =await bcrypt.hash(this.password,10);
        
    }
    next();
});



module.exports=mongoose.model("User", userSchema);

const cloudinary = require('../cloud');
exports.uploadImagetoCloud = async (file)=> {
    const {secure_url:url,public_id}= await cloudinary.uploader.upload (
        file , 
        {gravity: "face", height:500 , width:500, crop: "thumb"}
    );

    return {url,public_id};
};

exports.formatActor= actor => {
    const {name,gender,about,_id,avatar}=actor; 
   return  {
        id:_id,
        name,
        about,
        gender,
        avatar:avatar?.url
      
}
}
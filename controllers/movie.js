const {sendError} = require("../utils/helper");
const cloudinary = require("../cloud");


exports.uploadTrailer = async (req,res)=> {
    const {file}=req;
    if (!file) return sendError(res, "Video file is missing!");

    const {secure_url:url,public_id} = await cloudinary.uploader.upload(file.path, 
        {
            recource_type: "video",
        }
    );
    res.status(201).json({url,public_id});

};

exports.creatMovie = async (req,res)=> { 
    const {file ,body}= req;

    const {
        title,
        storyLine,
        director,
        releseDate,
        status,
        type,
        genres,
        tags,
        cast,
        writers,
        trailer,
        language,
    } = body ;

    const newMovie = new Movie({
        title,
        storyLine,
        releseDate,
        status,
        type,
        genres,
        tags,
        cast,
        trailer,
        language,

    })
    if(director) {
        if(!isValidObjectId(director)) return sendError(res, 'Invalid director id !')
        newMovie.director = director
    }
    if(writers){
        for(let writerId of writers){
            if(!isValidObjectId(writersiterId)) return sendError(res, 'Invalid writer id !');
        }
    
newMovie.writers=writers 

 }

    // uploading poster
    const {secure_url:url, public_id}= await cloudinary.uploader.upload(file.path, {
       transformation: {
        width : 1280 , 
        height : 1280 ,
       },
       responsive_breakpoints:{
        create_derived:true ,
        max_width:640,
        max_images:3
       },
    });

        const finalPoster = {url, public_id,responsive: []}

        const {breakpoints} = responsive_breakpoints[0]
        if(breakpoints.length){
            for(let imgObj of breakpoints) {
                const {secure_url}=imgObj
                finalPoster.responsive.push(secure_url)
            }
        }

        newMovie.poster = finalPoster ;
        await newMovie.save()

       res.status(201).json({ 
        id: newMovie.id,
        title,
       });
    
    };


exports.updateMovieWithoutPoster= async (req,res)=>{
    const {movieId} = req.params;

    if(!isValidObjectId(movieId)) return sendError(res, 'Invalid Movie Id!')

    const movie = await Movie.findById(movieId);
    if(!movie) return sendError(res, 'Movie not found!', 404)
 
    const {
        title,
        storyLine,
        director,
        releseDate,
        status,
        type,
        genres,
        tags,
        cast,
        writers,
        trailer,
        language,
    } = req.body ;

    movie.title=title
    movie.storyLine=storyLine 
    movie.tags=tags
    movie.relesDate=releseDate
    movie.status=status
    movie.type=type
    movie.genres=genres
    movie.cast=cast
    movie.trailer=trailer
    movie.language=language


        
    if(director) {
        if(!isValidObjectId(director)) return sendError(res, 'Invalid director id !')
        movie.director = director
    }
    if(writers){
        for(let writerId of writers){
            if(!isValidObjectId(writersiterId)) return sendError(res, 'Invalid writer id !');
        }
    
    movie.writers=writers 

 }
 await  movie.save()
 res.json({message: 'Movie is updated!', movie });
}
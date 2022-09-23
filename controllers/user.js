const user = require('../models/user');
//const EmailVeraficationToken = require("../models/emailVeraficationToken");


exports.create = async (req,res)=>{

    const {name,email,password}=req.body;

    const oldUser = await user.findOne({email});

    if(oldUser) return res.status(401).json({error:'this email is already in use !'});

    const  newUser= new user({name,email,password});
    await newUser.save();

  // generate 6 digit otp for mail 
  //let otp =
  
  // store otp inside out db
  //const newEmailVeraficationToken = new EmailVeraficationToken

  // send that otp to our user 

    res.status(201).json({ user : newUser});
};

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Email/Password mismatch!");

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "Email/Password mismatch!");

  const { _id, name,role,isVerified } = user;

  const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);

  res.json({ user: { id: _id, name, email,role, token: jwtToken , isVerified } 
  });

};



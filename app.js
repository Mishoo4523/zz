const express = require("express");
//require("express-async-errors");
// const morgan= require("morgan");
// const {errorHandler} = require("./middlewares/error");
//require("dotenv").config();
require('./db');
const userRuoter = require('./routes/user')
const actorRuoter = require('./routes/actor');
const movieRouter = require('./routes/movie');


const app = express();
app.use(express.json())
//app.use(morgan("dev"));;
app.use( "/api/user", userRuoter );
app.use( "/api/actor", actorRuoter );
app.use( "/api/movie", movieRouter );



// middleware example
app.post(
    "/sign-in",
    (req, res, next) => {
      const { email, password } = req.body;
      if (!email || !password)
        return res.json({ error: "email/password missing!" });
      next();
    },
    (req, res) => {
      res.send("<h1>Hello I am about page</h1>");
    }
  );

  
app.listen(8000 , ()=> {
    console.log("the port is listening on port 8000");
    
});
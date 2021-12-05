const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');

//Router  variable
const PostRouter = require('./routes/post.routes');
const AuthRouter = require('./routes/auth.routes');


//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//Database connection 
mongoose 
 .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));


//Route Middleware
app.use('/post',PostRouter);
app.use('/login',AuthRouter);


app.listen(process.env.PORT, "0.0.0.0", function() {
  console.log("Listening on Port 4000");
  });


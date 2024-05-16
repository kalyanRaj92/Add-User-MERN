const express = require('express');
const app = express();

const dotEnv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const route = require('./routes/userRoute');

// MiddleWares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

dotEnv.config();

const port = process.env.PORT || 3006;
const URL =  process.env.MONGO_URI;

mongoose.connect(URL)
.then(()=>{
    console.log("DB connected successfully!...");
    
    app.listen(port, () => {
        console.log(`Server Running at http://localhost:${port}`);
      });

})
.catch((err)=> console.log('Error connecting to MongoDB:', err))


app.use('/api', route);
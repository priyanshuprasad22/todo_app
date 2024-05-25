const express= require('express');
const dotenv = require('dotenv');
const router = require('./router/job.js');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());

dotenv.config();


app.use('/api/v1/todo',router);

const PORT= process.env.PORT || 4000 ;

app.listen(PORT, ()=>{
    console.log(`The Application is listening at port ${PORT}`);
})
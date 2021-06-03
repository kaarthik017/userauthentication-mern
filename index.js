const express = require("express")
const app = express();
const cors = require('cors')
const routeUrls = require('./userauth')
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 4000;

app.use(express.json())

app.use(cors())

app.use('/',routeUrls)

if(process.env.NODE_ENV === "production"){
    app.use(express.static("frontend/build"));
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}

app.listen(port,()=>{console.log("Server is started and running on "+port)})


const path= require('path');
const express=require('express');
const port = process.env.port || 3000;

const publicPath = path.join(__dirname,'/../public');
var app = express();

app.use(express.static(publicPath));

app.listen(port,()=>{
    console.log(`server in ${port} is up`);
})
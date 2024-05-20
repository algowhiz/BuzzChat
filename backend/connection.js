const mongoose = require('mongoose');

const connectingDB = async () =>{
    try {
        const MONGO_URL=`mongodb://localhost:27017`;
        await mongoose.connect(MONGO_URL,{useNewUrlParser:true});
        console.log("db connected");
    } catch (error) {
        console.log("err",error.message);
    }
}

module.exports={connectingDB};
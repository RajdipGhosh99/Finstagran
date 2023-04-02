const mongoose = require('mongoose');

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t6johnu.mongodb.net/test`;


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB connection is successfull.");
}).catch((error)=>{
    console.log("Database connection failed, Error: "+error.message);
});

module.exports = mongoose;
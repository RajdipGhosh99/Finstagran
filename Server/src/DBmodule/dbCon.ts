import mongoose, { ConnectOptions } from 'mongoose';

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t6johnu.mongodb.net/${process.env.DB_NAME}`;

let config: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(dbUrl, config).then(() => {
    console.log("DB connection is successfull.");
}).catch((error) => {
    console.log("Database connection failed, Error: " + error.message);
});

export default mongoose;
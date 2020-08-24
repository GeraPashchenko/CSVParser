module.exports.connect = (mongoose, process)=>{
    mongoose.connect(process.env.MONGODB_URL, {
        "auth": { "authSource": "admin" },
        "user": process.env.MONGODB_USER,
        "pass": process.env.MONGODB_PASSWORD,
        useUnifiedTopology: true,
        useNewUrlParser: true
    },(err, callback)=>{
        if (err) {
            console.log(err)
            process.exit(0);
        }
        console.log("Connected to MongoDB");
    });
}
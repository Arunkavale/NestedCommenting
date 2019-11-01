var mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
// mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true , useFindAndModify: false , useUnifiedTopology: true }).then(()=>console.log(`Mongodb connected to ${process.env.MONGODB_URI}`));


module.exports = function() {
  mongoose.connect(process.env.MONGODB_URI ,{useNewUrlParser: true , useFindAndModify: false , useUnifiedTopology: true })
    .then(() => console.log(`Mongodb connected to ${process.env.MONGODB_URI}`)).catch((e)=>console.log(e));
}

// module.exports = {mongoose};
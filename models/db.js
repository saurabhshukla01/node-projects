const mongoose = require('mongoose');
const Url = 'mongodb://localhost:27017/EmployeeDB';

mongoose.connect(Url,{ useNewUrlParser:true, useUnifiedTopology: true}, (err) => {
    if(!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});
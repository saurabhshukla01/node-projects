const mongoose =  require('mongoose');
var employeeSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: 'This field is required'
    },
    email:{
        type: String
    },
    mobile:{
        type: String,
        required: 'This field is required'
    },
    city:{
        type: String,
        required: 'This field is required'
    }
});

employeeSchema.path('email').validate((val) =>{
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(val);
}, 'Invalid email');
    

var Employee = mongoose.model('employee', employeeSchema);
module.exports = Employee;
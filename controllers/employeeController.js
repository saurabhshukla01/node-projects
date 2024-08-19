const express = require('express');
const mongoose = require('mongoose');
// const Employee = mongoose.model('Employee');
var Employee = require('../models/employee.model');
var router = express.Router();

router.get('/', (req, res) => {
    
    res.render('employee/addOrEdit',{
        viewTitle: "Insert Employee"
    });
});

// submit form request
router.post('/', (req, res) => {
    if(req.body._id)
    updateEmployeeData(req, res);
    else
    submitEmployeeData(req, res);
});

// submit user method
function submitEmployeeData(req, res){
 
    var employee = new Employee();
    employee.fullName = req.body.fullName; 
    employee.email    = req.body.email;
    employee.mobile   = req.body.mobile;
    employee.city     = req.body.city;
    employee.save((err, result) => {
        if(!err) 
            res.redirect('employee/list');
        else 
            if(err.name == "validationError"){
                handleValidationError(err, req.body);
                res.render('employee/addOrEdit',{
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }else{
                res.send(err);
            }
        
    });

}
// update employee data
function updateEmployeeData(req,res){
    Employee.findByIdAndUpdate({_id: req.body._id},
                                req.body,
                                {name:true},(err, doc) => {
        if(!err){
            res.redirect('employee/list');
        }else{
            if(err.name == "validationError"){
                handleValidationError(err, req.body);
                res.render('employee/addOrEdit',{
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }else{
                res.send(err);
            }
        }

    });
}
//validation for form request
function handleValidationError(err, body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'mobile':
                body['mobileError'] = err.errors[field].message;
                break;
            case 'city':
                body['cityError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
 //list url
router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if(!err){
            res.render('employee/employeeList', {
                list: docs.lean
            });        
        }else{
            console.log('Error is found to retrieving employee list :' + err);
        }
    });
});

//edit
router.get('/edit/:id', (req, res) => {
    
    Employee.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.render('employee/addOrEdit',{
                viewTitle: "Update Employee",
                employee: doc
            });
        }else{
            res.send(err);
        }
    });
});
// delete
router.get('/delete/:id', (req, res) => {
    
    Employee.findByIdAndRemove (req.params.id, (err, doc) => {
        if(!err) {
            res.redirect('employee/list');
        }else{
            res.send(err);
        }
    });
});

module.exports = router;
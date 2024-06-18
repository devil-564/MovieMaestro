const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SEC_KEY = "MOVIE_TICKET_MANAGEMENT_WEBAPPLICATION_111223";
const Customer = require('../models/customer');
const middleware = require('../middleware')
// const fetchuser = require("../fetchuser");

// Route 1 : This route is for the signUp of customer 

router.post('/createcustomer', [

    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 6 }),

], async (req, res) => {
    let success = false; 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ success: success, errors: errors.array() })
    }

    try {
        let isCustomer = await Customer.findOne({ email: req.body.email });
        if (isCustomer) {
            res.status(200).json("Already a customer exist")
        }

        var salt = await bcrypt.genSaltSync(10);
        let secPassword = await bcrypt.hashSync(req.body.password, salt);

        isCustomer = await Customer.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        })

        var data = {
            isCustomer: {
                id: isCustomer.id
            }
        }

        console.log(data) 

        var authtoken = jwt.sign(data, JWT_SEC_KEY);
        success = true; 
        return res.json({ success, authtoken })


    } catch (error) {
        console.log(errors.message);
        return res.status(500).send("Internal error occured")
    }
})


// Route 2 :- For Login
router.post('/logincustomer', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 6 }),
], async (req, res) => {
    let success = false;
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(400).json({ success: success, error: error.array() })
        }

        const { email, password } = req.body;
        const isCustomer = await Customer.findOne({ email: email });
        if (!isCustomer) {return res.status(200).json({ success: success, error: "Please enter the correct details" }) };
        const comparePassword = await bcrypt.compare(password, isCustomer.password);
        if (!comparePassword) {
            return res.status(200).json({ error: "Please enter the correct details" })
        }
 

        var data = {
            isCustomer: {
                id: isCustomer.id
            }
        }
        console.log(data);
 
        var authtoken = jwt.sign(data, JWT_SEC_KEY);
        success = true;
        return res.status(200).json({ success, authtoken })



    } catch (error) { 
        console.log(error.message);
        return res.json({ error: "Internal error occured" })
    }

})


// Route 3 
router.get('/getuserdetails', middleware, async (req, res) => {
    try {
        const user = await Customer.findOne({_id : req.ticket.id})
        res.json(user)
        // res.status(200).send(user);
    } catch (error) {
        console.log(error); 
        res.status(500).send('Internal server error');
    }
});


module.exports = router; 
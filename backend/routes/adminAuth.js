const express = require("express")
const { body, validationResult } = require("express-validator")
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SEC_KEY = "MOVIE_TICKET_MANAGEMENT_ADMIN_PANEL_112494";
const Admin = require('../models/admin');
const middleware = require('../middleware_admin')

// Route 1 : This route is for the signUp of customer 

router.post('/createadmin', [

    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 6 }),
    body('registration_no', "Enter your global registration no").isLength({ min: 8 })

], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: success, errors: errors.array() })
    }

    try {
        let isAdmin = await Admin.findOne({ email: req.body.email, registration_no: req.body.registration_no });
        if (isAdmin) {
            return res.status(200).json("Already a customer exist")
        }

        var salt = await bcrypt.genSaltSync(10);
        let secPassword = await bcrypt.hashSync(req.body.password, salt);

        isAdmin = await Admin.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
            registration_no: req.body.registration_no
        })

        var data = {
            isAdmin: {
                id: isAdmin.id
            }
        }

        var authtoken = jwt.sign(data, JWT_SEC_KEY);
        success = true;
        return res.json({ success, authtoken })

    } catch (error) {
        console.log(errors.message);
        return res.status(500).send("Internal error occured")
    }
})

// Route 2 :- For Login
router.post('/loginadmin', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 6 }),
    body('registration_no', "Enter your global registration no").isLength({min : 8})
], async (req, res) => {
    let success = false;
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(400).json({ success: success, error: error.array() })
        }

        const { email, password, registration_no} = req.body;
        const isAdmin = await Admin.findOne({ email: email, registration_no : registration_no});
        if (!isAdmin) { return res.status(200).json({ success: success, error: "Please enter the correct details" }) };
        const comparePassword = await bcrypt.compare(password, isAdmin.password);

        if (!comparePassword) {
            return res.status(200).json({ error: "Please enter the correct details" })
        }


        var data = {
            isAdmin: {
                id: isAdmin.id
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
router.get('/getadmindetails', middleware, async (req, res) => {
    try {
        const isAdmin = await Admin.findOne({ _id: req.admin.id })
        return res.status(200).json(isAdmin)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});



module.exports = router
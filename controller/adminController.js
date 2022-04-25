
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const session = require('express-session');
const conn = require('../dbConnection').promise();
require('dotenv').config();

exports.adduser = async(req, res, next) => {
    connection.getConnection(function(err) {
        if (err) {
            return res.send("Error occured");
        }
    });
    if (req.body.email === undefined || req.body.Fname === undefined || req.body.access_id === undefined || req.body.restraname === undefined || req.body.Lname === undefined || req.body.phone_num === undefined) {
        return res.json({ message: "fields are empty" });
    }
    try {
        const [row] = await conn.execute(
            "SELECT `email` FROM `KG_user` WHERE `email`=?", [req.body.email]
        );
        const [phoneNumber] = await conn.execute(
            "SELECT `phone_num` FROM `KG_user` WHERE `phone_num`=?", [req.body.phone_num]
        );
        if (row.length > 0) {
            return res.json({
                message: "The E-mail already in use",
            });
        }
        if (phoneNumber.length > 0) {
            return res.json({
                message: "The Phone number is already used",
            });
        } else {
            const email = req.body.email;
            const password = generatePassword();
            await mailerPasswordGenerator(email, password);

            const hashPass = await bcrypt.hash(password, 12);

            await conn.execute('INSERT INTO `KG_user`(`email`,`access_id`,`restraname`,`Fname`,`Lname`,`phone_num`,`password`) VALUES(?,?,?,?,?,?,?)', [
                req.body.email,
                req.body.access_id,
                req.body.restraname,
                req.body.Fname,
                req.body.Lname,
                req.body.phone_num,
                hashPass
            ]);

            try {
                console.log(password);
                res.json({
                    message: "New user added",
                    password: password
                });
            } catch (err) {
                res.json({ message: "New user Registration Error" + err });
                return;
            }

        }
    } catch (err) {
        return res.json({
            message: "Registration Error :" + err,
        });
    }
}


//username is Email for login
exports.login = async(req, res, next) => {
    connection.getConnection(function(err) {
        if (err) {
            return res.send("Error occured");
        }
    });
    if (!req.body.username || !req.body.password) {
        return res.json({ message: "Fields are empty" });
    }
    
    const [row] = await conn.execute(
        "select * from users where username=? ", [req.body.username]
    );
    if (row.length === 0) {
        return res.json({
            message: "Invalid email address : user not found",
        });
    }
  
        const userDetails = {
            userid: row[0].id,
            email: row[0].username,
            password: row[0].password
        }
          console.log(userDetails);
        if (req.body.password !== userDetails.password) {
                return res.json({
                    message: "Incorrect password"
                });
            }else{
                const theToken = jwt.sign({ id: row[0].id, email: row[0].username}, process.env.SECRETCODE, { expiresIn: '1h' });
                return res.json({
                    message: "Login succesful",
                    token: theToken,
                    admin: true,
                    userDetail: userDetails
                });
            }    
}

exports.isAuth = async(req, res, next) => {
    const _token = req.params.token;
    try {
        if (_token === undefined) {
            return res.json({ message: "login again" });
        } else {
            const payload = jwt.verify(_token, process.env.SECRETCODE);
            const [row] = await conn.execute(
                "SELECT * FROM `KG_user` WHERE `userid`=?", [payload.id]
            );
            if (row.length > 0) {
                return res.json({ message: "welcome back" });
            } else {
                res.json({ message: "user not found.." });
            }
        }
    } catch (err) {
        return res.json({ message: "login again : " + err });
    }
}

exports.register = async(req, res, next) => {
    connection.getConnection(function(err) {
        if (err) {
            return res.send("Error occured");
        }
    });
    if (req.body.email === undefined || req.body.username === undefined || req.body.password === undefined) {
        return res.json({ message: "fields are empty" });
    }
    try {
        const [row] = await conn.execute(
            "SELECT `email` FROM `KG_user` WHERE `email`=?", [req.body.email]
        );
        const [phoneNumber] = await conn.execute(
            "SELECT `phone_num` FROM `KG_user` WHERE `phone_num`=?", [req.body.phone_num]
        );
        if (row.length > 0) {
            return res.json({
                message: "The E-mail already in use",
            });
        } else if (phoneNumber.length > 0) {
            return res.json({
                message: "The Phone number is already used",
            });
        } else {

            const hashPass = await bcrypt.hash(req.body.password, 12);

            const [rows] = await conn.execute('INSERT INTO `KG_user`(`username`,`email`,`password`) VALUES(?,?,?)', [
                req.body.username,
                req.body.email,
                req.body.password    
            ]);

            console.log(rows);
            try {
                res.json({
                    message: "Registration successful",
                });
            } catch (err) {
                console.log("email error  :" + err);
                res.json({ message: "Registration Error" + err });
                return;
            }
        }
    } catch (err) {
        return res.json({
            message: "Registration Error :" + err,
        });
    }
}

exports.logout = async(req, res, next) => {
    const _token = req.body.token;
    if (_token === undefined) {
        return res.json({ message: "token issue" });
    }
    try {
        jwt.destroy(_token);
        //console.log("destroyed");
        req.session.destory();
    } catch (err) {
        res.json({ message: "logout error : " + err });
    }
}

const nodemailer = require('nodemailer');
const connection = require('../dbConnection');
const mailerPasswordGenerator = async(email, otp) => {
    try {
        //const token = jwt.sign({ email: email }, 'the-super-strong-secrect', { expiresIn: '1h' });


        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAILPASSWORD,
            }
        });

        var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "One time password for login ",
            html: `<h1>one time password</h1>
            <h2>Hello </h2>
            <p>Please visit the login page and use this change your password using this one time password : </p>
             Your One time Password is : ${otp}
             To visit the login page directly : 
             <a href="${process.env.LOGIN_PAGE}"> Click here </a> 
             
            </div>`,
        };
        try {
            await transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    throw error;
                }
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
};
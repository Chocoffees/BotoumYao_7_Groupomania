// Allow users to access to app

// Import bcrypt: hash password > securely store user password
const bcrypt = require('bcrypt');
// Secure API access (->informations<-) -> authentication by token
const jwt = require('jsonwebtoken');
require('dotenv').config()
// Import models created 
const models = require('../models');
// Email format required
const emailRegex = /^[a-zA-Z-_\.]+@[a-zA-Z\.]+[\.]+[a-z]*$/ //accept "-", space, no digit and special characters
// Authenticate user logged with jwt > allow access to edit his data, access ressources
//const jwthandle = require('../middlewares/jwt.handler')


// ---------- Register new user in database: use signup function ----------
exports.signup = (req, res) => {

    // Define params (= table users)
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const service = req.body.service;
    const avatar = req.body.avatar;
    const admin = req.body.admin;

    // Check required fields to valid signup
    if (email === null || username === null) {
        return res.status(400).json({
            error: 'Empty input field'
        });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: 'Email format invalid'
        });
    }

    // + make sure that username entered is not already used by another user (= unique)
    if (password !== null && req.body.username !== models.User.findOne({
        where: { username: username }
    })) {
        bcrypt.hash(req.body.password, 10)  // call of the bcrypt hash function
            // create and register user in database (return res success/failure)
            .then(hash => {
                const newUser = models.User.create({
                    email: email,
                    password: hash,
                    username: username,
                    service: service,
                    avatar: avatar,
                    admin: admin
                })
                    .catch(error => {
                        console.log(error)
                        res.status(409).json({ error: 'Username already used' })
                    })
                    .then(() => res.status(201).json({
                        message: 'User created with success!',
                        username, email,
                    }))
                    .catch(error => {
                        console.log(error)
                        res.status(400).json({ error: 'Creation failed' })
                    })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: 'Server error' })
            })
            .catch(error => {
                console.log(error)
                res.status(400).json({ error: 'Empty input field' })
            })
    }

}


// ---------- Connect user to app: use login function ----------
exports.login = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    // Search user in database: use findOne() method
    models.User.findOne({
        where: { email: email }
    })
        .then(user => {
            if (!user) {  // if can not find user
                return res.status(401).json({ error: 'User not found in database' });
            }
            // Compare password in database with the one entered by user > use compare() method
            bcrypt.compare(password, user.password)
                .then(valid => {
                    if (!valid) { // invalid password entered
                        return res.status(401).json({ error: 'Password invalid' });
                    }
                    res.status(200).json({ // return JSON obj which will contain 1 user.id
                        'id': user.id,
                        // Allow user connection with encrypted token 
                        token: jwt.sign( // encode token: use sign()
                            { id: user.id }, // object to serialize
                            process.env.RANDOM_TOKEN_SECRET, // long random string (get secret key from env variable)
                            { expiresIn: '1h' } // configuration > apply access token expiration delay (user can reconnect after "")
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


// ---------- Access to One user data: use getOneUser function ----------
exports.getOneUser = (req, res, next) => {

    const id = req.params.id;

    models.User.findByPk(id)
        .then(user => {
            console.log(user);
            res.status(200).json({ user })
        })
        .catch(error => res.status(400).json({ error }));
};
// --------------------- > something wrong: another id/user retrieved? use findOne({ where: {id:id} })? > resolved
// --------------------- > findByPk(id) not working > resolved


// ---------- Update user data: use updateOneUser function ----------
exports.updateOneUser = (req, res, next) => {

    const id = req.params.id;
    const username = req.body.username;
    const avatar = req.body.avatar;
    const service = req.body.service;

    models.User.findByPk(id)
        .then(user => {
            console.log(user);
            if (!user) {  // if can not find user
                return res.status(401).json({ error: 'User not found in database' });
            }
            user.update({
                username: username,
                avatar: avatar,
                service: service,
            })
                .then(user => res.status(200).json({ user }))
                .catch(error => res.status(400).json({ error: 'Username is already in use, it must be unique' }));
        })
        .catch(error => res.status(500).json({ error }));
};
// --------------------- > something wrong to check with token: implement user logged authenticated (getOneUser to deleteUser)


// ---------- Remove user: use deleteUser function calling 'destroy' ----------
exports.deleteUser = (req, res, next) => {

    const id = req.params.id;

    models.User.findOne({ where: { id: req.params.id } })
        .then(user => {
            if (!user) {  // if can not find user
                return res.status(401).json({ error: 'Deletion not possible, user not found in database' });
            }
            models.User.destroy({ where: { id: req.params.id } })
            return res.status(200).json({ message: 'User removed from database' })
        })
        .catch(error => res.status(500).json({ error }));
}
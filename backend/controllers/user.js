// Allow users to access to app

// Import bcrypt: hash password > securely store user password
const bcrypt = require('bcrypt');
// Secure API access (->informations<-) -> authentication by token
const jwt = require('jsonwebtoken');
require('dotenv').config()
// Import models created 
const models = require('../models');
const User = models.User;
// Email format required
const emailRegex = /^[a-zA-Z-_\.]+@[a-zA-Z\.]+[\.]+[a-z]*$/ //accept "-", space, no digit and special characters
// Authenticate user logged with jwt > allow access to edit his data, access ressources
const jwthandle = require('../middlewares/jwt.handler')
// Import fs module > interact with file system
const fs = require('fs');
const { Op } = require("sequelize");


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
                    .then(() => res.status(201).json({
                        message: 'User created with success!',
                        username, email,
                    }))
                    .catch(error => {
                        console.log(error)
                        res.status(409).json({ error: 'Username already used' })
                    })
                    /*.then(() => res.status(201).json({
                        message: 'User created with success!',
                        username, email,
                    }))*/
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

};


// ---------- Connect user to app: use login function ----------
exports.login = (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    // Search user in database: use findOne() method
    User.findOne({
        where: { username: username }
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
                        'token': jwthandle.generateToken(user), // token generated to authenticate user created
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


// ---------- Access to One user data: use getOneUser function ----------
exports.getOneUser = (req, res, next) => {
    // Authorize user with jwt
    const headers = req.headers['authorization'];
    const userId = jwthandle.getUserId(headers);

    User.findByPk(userId)
        .then(user => {
            console.log(user);
            res.status(200).json({ user })
        })
        .catch(error => res.status(400).json({ error }));
};
// --------------------- > findByPk(id) not working > resolved and now working with correct arguments > can get userId


// ---------- Update user data: use updateOneUser function ----------
exports.updateOneUser = (req, res, next) => {
    // Authorize user with jwt > edit account
    const headers = req.headers['authorization'];
    const userId = jwthandle.getUserId(headers);

    const id = req.params.id;
    const username = req.body.username;
    const avatar = req.body.avatar;
    const service = req.body.service;

    User.findByPk(id)
        .then(user => {
            console.log('update', user);
            if (!user) {  // if can not find user
                return res.status(401).json({ error: 'User not found in database' });
            }
            // Check required field to valid update action
            if (username === null) {
                return res.status(400).json({
                    error: 'Username missing'
                });
            }
            // Handle empty field
            if (service === null) {
                return res.status(200).json({
                    message: 'Nom du service facultatif'
                });
            }
            user.update({
                username: username,
                avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                service: service,
            })
                .then(() => res.status(200).json({ user }))
                .catch(error => {
                    console.log(error)
                    res.status(400).json({ error: 'Update user data failed' })
                })
                .catch(error => {
                    console.log(error.response)
                    res.status(500).json({ error: 'Server error' })
                })

        })
        .catch(error => {
            console.log(error.response)
            res.status(500).json({ error: 'Server error' })
        })
};
// --------------------- > something wrong to check with token: implement user logged authenticated (getOneUser to deleteUser) > done


// ---------- Remove user: use deleteUser function calling 'destroy' ----------
exports.deleteUser = (req, res, next) => {
    // Authorize user with jwt > delete account
    const headers = req.headers['authorization'];
    const userId = jwthandle.getUserId(headers);
    const id = req.params.id;

    /*** in this final version: admin role reviewed ***/

    // SELECT `id`, `email`, `password`, `username`, `service`, `avatar`, `admin`, `createdAt`, `updatedAt` FROM `Users` AS `User` WHERE (`User`.`id` = xxx OR `User`.`admin` = 1);
    models.User.findAll({
        where: {
            [Op.or]: [
                { id: userId },
                { admin: 1 }
            ]
        }
    })
        .then(user => {
            console.log(user);
            if (!user) {  // if can not find user
                return res.status(401).json({ error: 'Deletion not possible, user not found in database' });
            }
            else if (user || user.admin == true) {
                models.User.findOne({ where: { id: id } })
                    .then(user => {
                        console.log('Member to remove:', user);
                        if (!user) {  // if can not find user
                            return res.status(401).json({ error: 'Deletion not possible' });
                        }
                        models.User.destroy({ where: { id: id } })
                        models.Post.destroy({ where: { userId: id } })
                        models.Comment.destroy({ where: { userId: id } })
                        models.Like.destroy({ where: { userId: id } })

                        res.status(200).json({ message: 'User removed from database' })
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(400).json({ error: 'Deletion failed' })
                    })
                    .catch(error => {
                        console.log(error.response)
                        res.status(500).json({ error: 'Server error' })
                    })
            }
        })
        .catch(error => {
            console.log(error.response)
            res.status(500).json({ error: 'Server error' })
        })
};


// ---------- Access to All users (> admin): use getAllUsers function ----------
exports.getAllUsers = (req, res, next) => {
    // Authorize user with jwt
    const headers = req.headers['authorization'];
    const userId = jwthandle.getUserId(headers);

    User.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        attributes: ['id', 'email', 'username', 'service', 'avatar', 'admin', 'createdAt']
    })
        .then(users => {
            console.log(users);
            res.status(200).json({ users })
        })
        .catch(error => res.status(400).json({ error }));
}